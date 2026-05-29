"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  processSessionPackRequest,
  processSessionImageAnalysisRequest,
  normalizeSessionPackInput,
  generateSessionPack,
  generateCoachLiteDraft,
  validateCoachLiteDraft,
  validateGeneratedPack,
  persistSession,
  exportPersistedSession,
  processTrainingBriefSessionPackRequest,
  buildCleanSessionPackInputFromTrainingBriefHandoff,
  buildTrainingBriefDraftPreview,
} = require("./session-builder-pipeline");

function stripPackIdentity(pack) {
  return {
    ...pack,
    packId: undefined,
    createdAt: undefined,
  };
}

function hasKeyDeep(value, key) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return value.some((item) => hasKeyDeep(item, key));
  }

  return Object.prototype.hasOwnProperty.call(value, key) ||
    Object.values(value).some((item) => hasKeyDeep(item, key));
}

function findRepoRoot(startDir) {
  let currentDir = startDir;

  while (true) {
    if (
      fs.existsSync(path.join(currentDir, "apps", "club-vivo")) &&
      fs.existsSync(path.join(currentDir, "services", "club-vivo", "api"))
    ) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error(`Unable to locate repository root from ${startDir}`);
    }

    currentDir = parentDir;
  }
}

function readRepoFile(...parts) {
  return fs.readFileSync(path.join(findRepoRoot(__dirname), ...parts), "utf8");
}

const blockedFrontendFixturePattern = new RegExp(
  [
    "18x16 yard",
    "24x20 yard",
    "36x28 yard",
    ["central attacker or serv", "er"].join("")
  ].join("|")
);
const blockedReactionCaptionPattern = new RegExp(
  [
    ["coach\\/serv", "er trigger"].join(""),
    ["nearby serv", "er"].join("")
  ].join("|")
);

test("normalizeSessionPackInput returns canonical request shape", () => {
  const normalizedInput = normalizeSessionPackInput({
    sport: "soccer",
    sportPackId: "fut-soccer",
    ageBand: "U14",
    durationMin: 60,
    theme: "Finishing",
    sessionsCount: 2,
    equipment: ["Cones", "Goals"],
  });

  assert.deepEqual(normalizedInput, {
    sport: "soccer",
    sportPackId: "fut-soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "Finishing",
    sessionsCount: 2,
    equipment: ["cones", "goals"],
  });
});

test("processSessionPackRequest keeps sportPackId in normalized input while preserving the public pack shape", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    sportPackId: "fut-soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  });

  assert.equal(result.normalizedInput.sportPackId, "fut-soccer");
  assert.equal(result.generationContext.sportPackId, "fut-soccer");
  assert.equal(result.resolvedGenerationContext.sportPackId, "fut-soccer");
  assert.equal(Object.hasOwn(result.validatedPack, "sportPackId"), false);
  assert.equal(result.validatedPack.sport, "soccer");
});

test("generateSessionPack produces deterministic pack content from canonical input", () => {
  const normalizedInput = {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 2,
    equipment: ["cones", "balls"],
  };

  const packA = generateSessionPack(normalizedInput);
  const packB = generateSessionPack(normalizedInput);

  assert.notEqual(packA.packId, packB.packId);
  assert.deepEqual(
    { ...packA, packId: undefined, createdAt: undefined },
    { ...packB, packId: undefined, createdAt: undefined }
  );
});

test("validateGeneratedPack enforces exact generated duration invariants", () => {
  const validatedPack = validateGeneratedPack({
    packId: "pack-1",
    createdAt: "2026-04-01T00:00:00.000Z",
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    sessions: [
      {
        sport: "soccer",
        ageBand: "u14",
        durationMin: 60,
        objectiveTags: ["pressing"],
        activities: [
          { name: "Warm-up", minutes: 10, description: "Prep" },
          { name: "Game", minutes: 50, description: "Play" },
        ],
      },
    ],
  });

  assert.equal(validatedPack.sessions.length, 1);
  assert.equal(validatedPack.sessions[0].durationMin, 60);
});

test("processSessionPackRequest returns explicit pipeline stages", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 2,
    equipment: ["cones", "balls"],
  });

  assert.deepEqual(result.normalizedInput.equipment, ["cones", "balls"]);
  assert.deepEqual(result.generationContext.equipment, ["cones", "balls"]);
  assert.equal(result.generationContext.durationMin, 60);
  assert.equal(result.generationContext.sources.durationMinSource, "request");
  assert.equal(result.generationContext.methodologyScope, null);
  assert.equal(result.generationContext.teamContextUsed, false);
  assert.deepEqual(result.resolvedGenerationContext.equipment, ["cones", "balls"]);
  assert.equal(result.resolvedGenerationContext.durationMin, 60);
  assert.equal(result.resolvedGenerationContext.sources.durationMinSource, "request");
  assert.equal(result.resolvedGenerationContext.resolvedProgramType, null);
  assert.equal(result.resolvedGenerationContext.resolvedMethodologyScope, null);
  assert.deepEqual(result.methodologyInfluence, {
    styleBias: "default",
    methodologyApplied: false,
    guidanceSnippets: [],
  });
  assert.ok(result.generatedPack.packId);
  assert.ok(result.validatedPack.packId);
  assert.equal(result.coachLiteDraft.specVersion, "session-pack.v2");
  assert.equal(result.validatedCoachLiteDraft.specVersion, "session-pack.v2");
  assert.deepEqual(result.validatedPack.sessions[0].equipment, ["cones", "balls"]);
  assert.equal(Object.hasOwn(result.validatedPack, "generationContext"), false);
  assert.equal(Object.hasOwn(result.validatedPack, "resolvedGenerationContext"), false);
});

test("processSessionPackRequest uses confirmed setup profile only after confirmation and keeps pack shape unchanged", async () => {
  const confirmedProfile = {
    mode: "setup_to_drill",
    schemaVersion: 1,
    analysisId: "analysis-123",
    status: "confirmed",
    sourceImageId: "image-123",
    sourceImageMimeType: "image/png",
    summary: "Cone box with two end lines.",
    layoutType: "box",
    spaceSize: "small",
    playerOrganization: "two-lines",
    visibleEquipment: ["cones", "mini-goals"],
    focusTags: ["passing", "support"],
    constraints: ["tight-space"],
    assumptions: [],
    analysisConfidence: "medium",
  };

  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    confirmedProfile,
  });

  assert.deepEqual(result.normalizedInput.confirmedProfile, confirmedProfile);
  assert.deepEqual(result.generationContext.confirmedProfile, confirmedProfile);
  assert.deepEqual(result.resolvedGenerationContext.confirmedProfile, confirmedProfile);
  assert.equal(result.validatedPack.sessions[0].activities[0].name, "Passing Support");
  assert.match(result.validatedPack.sessions[0].activities[0].description, /Layout: box\./);
  assert.deepEqual(result.validatedPack.sessions[0].equipment, ["cones", "mini-goals"]);
  assert.equal(Object.hasOwn(result.validatedPack, "confirmedProfile"), false);
});

test("processSessionPackRequest keeps existing single-argument usage and default pack output unchanged", async () => {
  const rawInput = {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  };

  const resultWithoutOptions = await processSessionPackRequest(rawInput);
  const resultWithEmptyOptions = await processSessionPackRequest(rawInput, {});

  assert.deepEqual(
    stripPackIdentity(resultWithoutOptions.validatedPack),
    stripPackIdentity(resultWithEmptyOptions.validatedPack)
  );
  assert.equal(resultWithoutOptions.generationContext.durationMin, 60);
  assert.equal(resultWithoutOptions.resolvedGenerationContext.durationMin, 60);
  assert.equal(resultWithoutOptions.resolvedGenerationContext.resolvedProgramType, null);
});

test("programType team context can bias generated sessions while keeping request-owned fields authoritative", async () => {
  const rawInput = {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  };

  const baseResult = await processSessionPackRequest(rawInput);
  const resolvedResult = await processSessionPackRequest(rawInput, {
    teamContext: {
      programType: "travel",
      ageBand: "u15",
      playerCount: 16,
    },
  });

  assert.equal(resolvedResult.generationContext.teamContextUsed, false);
  assert.equal(resolvedResult.resolvedGenerationContext.teamContextUsed, true);
  assert.equal(resolvedResult.resolvedGenerationContext.resolvedProgramType, "travel");
  assert.equal(resolvedResult.resolvedGenerationContext.resolvedPlayerCount, 16);
  assert.equal(resolvedResult.resolvedGenerationContext.teamAgeBand, "u15");
  assert.equal(resolvedResult.resolvedGenerationContext.teamAgeBandConsistentWithRequest, false);
  assert.equal(resolvedResult.generationContext.durationMin, 60);
  assert.equal(resolvedResult.resolvedGenerationContext.durationMin, 60);
  assert.deepEqual(resolvedResult.methodologyInfluence, {
    styleBias: "travel",
    methodologyApplied: false,
    guidanceSnippets: ["travel-tempo", "travel-competitive-repetition"],
  });
  assert.notDeepEqual(
    stripPackIdentity(baseResult.validatedPack),
    stripPackIdentity(resolvedResult.validatedPack)
  );
  assert.match(
    resolvedResult.validatedPack.sessions[0].activities[0].description,
    /Set a clear field with gates, target spaces, restart balls, and one visible first action\./
  );
  for (const fragment of [
    ["introduce", "the theme"].join(" "),
    ["movement", "direction"].join(" "),
    ["scoring", "idea"].join(" "),
    ["group can", "grow into"].join(" "),
    [".", "Coach"].join(" "),
    ["Attacking", ":"].join("")
  ]) {
    assert.equal(
      resolvedResult.validatedPack.sessions[0].activities.map((activity) => activity.description).join(" ").includes(fragment),
      false
    );
  }
  assert.equal(resolvedResult.validatedPack.durationMin, rawInput.durationMin);
  assert.equal(resolvedResult.validatedPack.theme, rawInput.theme);
  assert.deepEqual(resolvedResult.validatedPack.equipment, rawInput.equipment);
});

test("team ageBand helper treats Mixed age as a u7-u10 youth context without changing request-owned pack fields", async () => {
  const rawInput = {
    sport: "soccer",
    ageBand: "u8",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  };

  const resolvedResult = await processSessionPackRequest(rawInput, {
    teamContext: {
      ageBand: "Mixed age",
      playerCount: 12,
    },
  });

  assert.equal(resolvedResult.resolvedGenerationContext.teamContextUsed, true);
  assert.equal(resolvedResult.resolvedGenerationContext.teamAgeBand, "mixed_age");
  assert.equal(resolvedResult.resolvedGenerationContext.teamAgeBandConsistentWithRequest, true);
  assert.equal(resolvedResult.resolvedGenerationContext.ageBand, rawInput.ageBand);
  assert.equal(resolvedResult.validatedPack.ageBand, rawInput.ageBand);
  assert.equal(resolvedResult.validatedPack.durationMin, rawInput.durationMin);
  assert.equal(resolvedResult.validatedPack.theme, rawInput.theme);
});

test("optional internal methodologyRecords influence only resolvedGenerationContext", async () => {
  const rawInput = {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  };

  const baseResult = await processSessionPackRequest(rawInput);
  const resolvedResult = await processSessionPackRequest(rawInput, {
    teamContext: {
      programType: "travel",
    },
    methodologyRecords: {
      shared: {
        scope: "shared",
        title: "Shared principles",
        content: "Shared methodology guidance.",
        status: "published",
      },
      travel: {
        scope: "travel",
        title: "Travel principles",
        content: "Travel methodology guidance.",
        status: "published",
      },
    },
  });

  assert.equal(resolvedResult.generationContext.methodologyScope, null);
  assert.equal(resolvedResult.resolvedGenerationContext.resolvedMethodologyScope, "travel");
  assert.deepEqual(resolvedResult.methodologyInfluence, {
    styleBias: "travel",
    methodologyApplied: true,
    guidanceSnippets: ["travel-tempo", "travel-competitive-repetition"],
  });
  assert.deepEqual(resolvedResult.resolvedGenerationContext.appliedMethodologyScopes, [
    "shared",
    "travel",
  ]);
  assert.match(resolvedResult.resolvedGenerationContext.methodologyGuidance, /Shared principles/);
  assert.match(resolvedResult.resolvedGenerationContext.methodologyGuidance, /Travel principles/);
  assert.equal(resolvedResult.generationContext.durationMin, 60);
  assert.equal(resolvedResult.resolvedGenerationContext.durationMin, 60);
  assert.equal(resolvedResult.validatedPack.durationMin, rawInput.durationMin);
  assert.equal(resolvedResult.validatedPack.theme, rawInput.theme);
  assert.deepEqual(resolvedResult.validatedPack.equipment, rawInput.equipment);
  assert.notDeepEqual(
    stripPackIdentity(baseResult.validatedPack),
    stripPackIdentity(resolvedResult.validatedPack)
  );
  assert.match(
    resolvedResult.validatedPack.sessions[0].activities[0].description,
    /Set a clear field with gates, target spaces, restart balls, and one visible first action\./
  );
  for (const fragment of [
    ["introduce", "the theme"].join(" "),
    ["movement", "direction"].join(" "),
    ["scoring", "idea"].join(" "),
    ["group can", "grow into"].join(" "),
    [".", "Coach"].join(" "),
    ["Attacking", ":"].join("")
  ]) {
    assert.equal(
      resolvedResult.validatedPack.sessions[0].activities.map((activity) => activity.description).join(" ").includes(fragment),
      false
    );
  }
  assert.equal(Object.hasOwn(resolvedResult.validatedPack, "resolvedMethodologyScope"), false);
  assert.equal(Object.hasOwn(resolvedResult.validatedPack, "methodologyInfluence"), false);
});

test("processSessionPackRequest carries compact builder notes and environment into generated session detail without changing the public shape", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing | notes:first pass after regain | env:turf",
    sessionsCount: 1,
  });

  assert.match(result.validatedPack.sessions[0].activities[0].description, /Space note: use turf/i);
  assert.match(
    result.validatedPack.sessions[0].activities[1].description,
    /Note: first pass after regain\./i
  );
  assert.equal(result.validatedPack.theme, "pressing | notes:first pass after regain | env:turf");
  assert.equal(Object.hasOwn(result.validatedPack, "promptSignals"), false);
});

test("processSessionPackRequest carries explicit coach notes without exposing request-only fields", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing | notes:short",
    sessionMode: "full_session",
    coachNotes: "press as a unit after turnovers, then find the first forward pass",
    sessionsCount: 1,
  });

  assert.equal(result.normalizedInput.sessionMode, "full_session");
  assert.equal(
    result.normalizedInput.coachNotes,
    "press as a unit after turnovers, then find the first forward pass"
  );
  assert.match(
    result.validatedPack.sessions[0].activities[1].description,
    /press as a unit after turnovers, then find the first forward pass/
  );
  assert.equal(Object.hasOwn(result.validatedPack, "sessionMode"), false);
  assert.equal(Object.hasOwn(result.validatedPack, "coachNotes"), false);
});

test("buildCleanSessionPackInputFromTrainingBriefHandoff strips internal metadata", () => {
  const result = buildCleanSessionPackInputFromTrainingBriefHandoff({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "Protect central spaces",
    sessionMode: "full_session",
    coachNotes: "Evidence: exposed centrally",
    equipment: ["balls", "cones"],
    handoffMeta: { source: "training_brief" },
    candidateMeta: { persistence: "not_persisted" },
    validatedInput: { sport: "soccer" },
    activityRecommendations: [],
  });

  assert.deepEqual(result, {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "Protect central spaces",
    sessionMode: "full_session",
    coachNotes: "Evidence: exposed centrally",
    sessionsCount: 1,
    equipment: ["balls", "cones"],
  });
});

test("buildTrainingBriefDraftPreview returns sanitized coach-review fields", () => {
  const result = buildTrainingBriefDraftPreview({
    requestType: "training-brief-draft",
    sport: "soccer",
    ageBand: "u14",
    durationMinutes: 60,
    playerCount: 12,
    evidenceSummary: "The team loses central compactness after turnovers.",
    nextGameObjective: "Improve defensive transition and protect central space.",
    availableEquipment: ["balls", "cones", "bibs"],
  });

  assert.deepEqual(Object.keys(result), [
    "candidateType",
    "version",
    "status",
    "requiresCoachReview",
    "recommendedFocus",
    "rationale",
    "activityDirection",
    "sessionBuilderHandoff",
  ]);
  assert.equal(result.candidateType, "training_brief_candidate");
  assert.equal(result.status, "draft");
  assert.equal(result.requiresCoachReview, true);
  assert.deepEqual(result.sessionBuilderHandoff, {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "Improve defensive transition and protect central space.",
    sessionMode: "full_session",
    coachNotes:
      "Evidence: The team loses central compactness after turnovers.\nObjective: Improve defensive transition and protect central space.\nPlayers: 12",
    equipment: ["balls", "cones", "bibs"],
  });

  for (const forbiddenKey of [
    "handoffMeta",
    "candidateMeta",
    "validatedInput",
    "activityRecommendations",
    "generatedPack",
    "validatedPack",
    "persistedSession",
    "route",
    "tenantId",
    "userId",
  ]) {
    assert.equal(hasKeyDeep(result, forbiddenKey), false, `${forbiddenKey} should not be exposed`);
  }
});

test("processTrainingBriefSessionPackRequest builds candidate and deterministic session pack", async () => {
  const result = await processTrainingBriefSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMinutes: 60,
    playerCount: 12,
    evidenceSummary: "The team loses central compactness after turnovers.",
    nextGameObjective: "Improve defensive transition and protect central space.",
    availableEquipment: ["balls", "cones", "bibs"],
    context: {
      teamLevel: "grassroots",
      space: "half field",
      methodologyTags: ["transition", "compactness"],
    },
  });

  assert.equal(result.trainingBriefCandidate.candidateType, "training_brief_candidate");
  assert.equal(result.trainingBriefCandidate.source, "training_brief_session_builder_intake");
  assert.equal(result.trainingBriefCandidate.requiresCoachReview, true);
  assert.equal(result.sessionBuilderHandoff.handoffMeta.requiresCoachReview, true);
  assert.equal(result.sessionPackResult.validatedPack.sport, "soccer");
  assert.equal(result.sessionPackResult.validatedPack.ageBand, "u14");
  assert.equal(result.sessionPackResult.validatedPack.durationMin, 60);
  assert.equal(result.sessionPackResult.validatedPack.sessions.length, 1);
  assert.equal(result.sessionPackResult.validatedCoachLiteDraft.specVersion, "session-pack.v2");
});

test("processTrainingBriefSessionPackRequest passes only clean Session Builder fields into pack normalization", async () => {
  const result = await processTrainingBriefSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    evidenceSummary: "Wide overloads repeatedly pulled the team apart.",
    nextGameObjective: "Defend wide areas with better cover.",
    availableEquipment: ["balls", "cones"],
  });

  assert.deepEqual(Object.keys(result.sessionPackResult.normalizedInput).sort(), [
    "ageBand",
    "coachNotes",
    "durationMin",
    "equipment",
    "sessionMode",
    "sessionsCount",
    "sport",
    "theme",
  ]);
  assert.equal(Object.hasOwn(result.sessionPackResult.normalizedInput, "handoffMeta"), false);
  assert.equal(Object.hasOwn(result.sessionPackResult.normalizedInput, "candidateMeta"), false);
  assert.equal(Object.hasOwn(result.sessionPackResult.normalizedInput, "validatedInput"), false);
  assert.equal(Object.hasOwn(result.sessionPackResult.normalizedInput, "activityRecommendations"), false);
});

test("processTrainingBriefSessionPackRequest routes defensive transition handoff into compact recovery activities", async () => {
  const result = await processTrainingBriefSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMinutes: 60,
    playerCount: 14,
    evidenceSummary:
      "The team loses compactness after possession loss and allows central counterattacks.",
    nextGameObjective:
      "Improve defensive transition after losing possession and recover compact central shape.",
    coachNotes: "Use cones and bibs. Keep the recovery compact after turnovers.",
    availableEquipment: ["balls", "cones", "bibs"],
  });

  const [session] = result.sessionPackResult.validatedPack.sessions;
  const names = session.activities.map((activity) => activity.name);
  const text = session.activities.map((activity) => `${activity.name} ${activity.description}`).join(" ");

  assert.equal(result.sessionPackResult.normalizedInput.theme, "Improve defensive transition after losing possession and rec");
  assert.deepEqual(names, [
    "Dynamic warmup + ball mastery",
    "Compact Recovery Transition Game",
    "Recover And Protect Central Spaces",
    "Compact Recovery Final Game",
  ]);
  assert.match(text, /after losing possession|react on loss|nearest player presses/i);
  assert.match(text, /protect central space|central lane|compact recovery/i);
  assert.match(text, /cones|bibs/i);
  assert.doesNotMatch(text, /wide player or support run before the bonus point counts/i);
  assert.equal(hasKeyDeep(result.sessionPackResult.validatedPack, "tenantId"), false);
});

test("processTrainingBriefSessionPackRequest adapts finishing objectives to gates when goals are unavailable", async () => {
  const result = await processTrainingBriefSessionPackRequest({
    sport: "soccer",
    ageBand: "u12",
    durationMinutes: 60,
    evidenceSummary: "The group created chances but had no goals available at training.",
    nextGameObjective: "Improve finishing through attacking gates when no goals are available.",
    coachNotes: "Use gate scoring and quick rebounds.",
    availableEquipment: ["balls", "cones", "bibs"],
  });

  const [session] = result.sessionPackResult.validatedPack.sessions;
  const text = session.activities.map((activity) => `${activity.name} ${activity.description}`).join(" ");

  assert.deepEqual(session.equipment, ["balls", "cones", "bibs"]);
  assert.match(text, /cone gates/i);
  assert.match(text, /finishing lane|first-time finishes|rebounds?/i);
  assert.doesNotMatch(text, /full-size goals?|pugg goals|mini goals/i);
});

test("processTrainingBriefSessionPackRequest routes build-out under pressure handoff into soccer-specific activity language", async () => {
  const result = await processTrainingBriefSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMinutes: 60,
    evidenceSummary: "The back line struggled to build out when pressed.",
    nextGameObjective: "Build out under pressure with better support angles.",
    coachNotes: "Use a goalkeeper or coach and midfield target gates.",
    availableEquipment: ["balls", "cones", "pinnies"],
  });

  const [session] = result.sessionPackResult.validatedPack.sessions;
  const [, activity2, activity3, activity4] = session.activities;
  const text = session.activities.map((activity) => `${activity.name} ${activity.description}`).join(" ");

  assert.equal(activity2.name, "Build-Out Support Angles");
  assert.equal(activity3.name, "Build-Out Under Pressure Game");
  assert.equal(activity4.name, "Build-Out Pressure Final Game");
  assert.match(text, /goalkeeper or coach|support angles|midfield target|first pressing line/i);
  assert.match(text, /playing away from pressure|calm first pass/i);
});

test("processTrainingBriefSessionPackRequest does not persist or require public route state", async () => {
  const result = await processTrainingBriefSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    evidenceSummary: "The team was slow to press after losing possession.",
    availableEquipment: ["balls", "cones"],
  });

  assert.equal(result.trainingBriefCandidate.candidateMeta.persistence, "not_persisted");
  assert.equal(Object.hasOwn(result, "persistedSession"), false);
  assert.equal(Object.hasOwn(result, "route"), false);
  assert.equal(Object.hasOwn(result.sessionPackResult, "persistedSession"), false);
  assert.equal(Object.hasOwn(result.sessionPackResult.validatedPack, "trainingBriefCandidate"), false);
});

test("lookup path loads teamContext and published methodology records when tenant inputs and repositories are supplied", async () => {
  const tenantCtx = {
    tenantId: "tenant-123",
    userId: "user-123",
  };
  const rawInput = {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  };
  const calls = [];

  const result = await processSessionPackRequest(rawInput, {
    tenantCtx,
    teamId: "team-123",
    teamRepository: {
      getTeamById: async (...args) => {
        calls.push({ type: "team", args });
        return {
          team: {
            teamId: "team-123",
            ageBand: "U14",
            playerCount: 14,
          },
        };
      },
    },
    methodologyRepository: {
      getMethodologyByScope: async (...args) => {
        calls.push({ type: "methodology", args });
        const scope = args[1];

        if (scope === "shared") {
          return {
            methodology: {
              scope: "shared",
              title: "Shared principles",
              content: "Shared methodology guidance.",
              status: "published",
            },
          };
        }

        if (scope === "travel") {
          return {
            methodology: {
              scope: "travel",
              title: "Travel draft",
              content: "Should not apply.",
              status: "draft",
            },
          };
        }

        return null;
      },
    },
  });

  assert.deepEqual(result.resolvedGenerationContext.teamContextUsed, true);
  assert.equal(result.resolvedGenerationContext.resolvedProgramType, null);
  assert.equal(result.resolvedGenerationContext.resolvedPlayerCount, 14);
  assert.equal(result.resolvedGenerationContext.teamAgeBand, "u14");
  assert.equal(result.resolvedGenerationContext.teamAgeBandConsistentWithRequest, true);
  assert.equal(result.resolvedGenerationContext.resolvedMethodologyScope, "shared");
  assert.deepEqual(result.resolvedGenerationContext.appliedMethodologyScopes, ["shared"]);
  assert.match(result.resolvedGenerationContext.methodologyGuidance, /Shared principles/);
  assert.equal(result.generationContext.durationMin, 60);
  assert.equal(result.resolvedGenerationContext.durationMin, 60);
  assert.equal(Object.hasOwn(result.validatedPack, "resolvedGenerationContext"), false);
  assert.deepEqual(calls, [
    { type: "team", args: [tenantCtx, "team-123"] },
    { type: "methodology", args: [tenantCtx, "shared"] },
    { type: "methodology", args: [tenantCtx, "travel"] },
    { type: "methodology", args: [tenantCtx, "ost"] },
  ]);
});

test("lookup path can resolve missing team programType and published travel methodology without leaking public fields", async () => {
  const rawInput = {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  };

  const result = await processSessionPackRequest(rawInput, {
    tenantCtx: {
      tenantId: "tenant-123",
      userId: "user-123",
    },
    teamId: "team-789",
    teamRepository: {
      getTeamById: async () => ({
        team: {
          teamId: "team-789",
          programType: "travel",
          ageBand: "U15",
          playerCount: 18,
        },
      }),
    },
    methodologyRepository: {
      getMethodologyByScope: async (_tenantCtx, scope) => {
        if (scope === "shared") {
          return {
            methodology: {
              scope: "shared",
              title: "Shared principles",
              content: "Shared methodology guidance.",
              status: "published",
            },
          };
        }

        if (scope === "travel") {
          return {
            methodology: {
              scope: "travel",
              title: "Travel principles",
              content: "Travel methodology guidance.",
              status: "published",
            },
          };
        }

        return null;
      },
    },
  });

  assert.equal(result.generationContext.teamContextUsed, false);
  assert.equal(result.resolvedGenerationContext.teamContextUsed, true);
  assert.equal(result.resolvedGenerationContext.resolvedProgramType, "travel");
  assert.equal(result.resolvedGenerationContext.resolvedPlayerCount, 18);
  assert.equal(result.resolvedGenerationContext.teamAgeBand, "u15");
  assert.equal(result.resolvedGenerationContext.teamAgeBandConsistentWithRequest, false);
  assert.equal(result.resolvedGenerationContext.sources.durationMinSource, "request");
  assert.deepEqual(result.methodologyInfluence, {
    styleBias: "travel",
    methodologyApplied: true,
    guidanceSnippets: ["travel-tempo", "travel-competitive-repetition"],
  });
  assert.deepEqual(result.resolvedGenerationContext.appliedMethodologyScopes, [
    "shared",
    "travel",
  ]);
  assert.equal(result.validatedPack.durationMin, rawInput.durationMin);
  assert.equal(result.validatedPack.theme, rawInput.theme);
  assert.deepEqual(result.validatedPack.equipment, rawInput.equipment);
  assert.match(
    result.validatedPack.sessions[0].activities[0].description,
    /Set a clear field with gates, target spaces, restart balls, and one visible first action\./
  );
  for (const fragment of [
    ["introduce", "the theme"].join(" "),
    ["movement", "direction"].join(" "),
    ["scoring", "idea"].join(" "),
    ["group can", "grow into"].join(" "),
    [".", "Coach"].join(" "),
    ["Attacking", ":"].join("")
  ]) {
    assert.equal(
      result.validatedPack.sessions[0].activities.map((activity) => activity.description).join(" ").includes(fragment),
      false
    );
  }
  assert.equal(Object.hasOwn(result.validatedPack, "resolvedProgramType"), false);
  assert.equal(Object.hasOwn(result.validatedPack, "appliedMethodologyScopes"), false);
  assert.equal(Object.hasOwn(result.validatedPack, "methodologyInfluence"), false);
});

test("ost methodology context applies only an internal ost style bias while preserving request-owned fields", async () => {
  const rawInput = {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  };

  const baseResult = await processSessionPackRequest(rawInput);
  const resolvedResult = await processSessionPackRequest(rawInput, {
    teamContext: {
      programType: "ost",
    },
    methodologyRecords: {
      shared: {
        scope: "shared",
        title: "Shared principles",
        content: "Shared methodology guidance.",
        status: "published",
      },
      ost: {
        scope: "ost",
        title: "OST principles",
        content: "OST methodology guidance.",
        status: "published",
      },
    },
  });

  assert.equal(resolvedResult.resolvedGenerationContext.resolvedMethodologyScope, "ost");
  assert.deepEqual(resolvedResult.methodologyInfluence, {
    styleBias: "ost",
    methodologyApplied: true,
    guidanceSnippets: ["ost-clear-directions", "ost-guided-repetition"],
  });
  assert.equal(resolvedResult.validatedPack.durationMin, rawInput.durationMin);
  assert.equal(resolvedResult.validatedPack.theme, rawInput.theme);
  assert.deepEqual(resolvedResult.validatedPack.equipment, rawInput.equipment);
  assert.notDeepEqual(
    stripPackIdentity(baseResult.validatedPack),
    stripPackIdentity(resolvedResult.validatedPack)
  );
  assert.match(
    resolvedResult.validatedPack.sessions[0].activities[0].description,
    /Keep the setup simple, explain one rule at a time, and let the players learn through play\./
  );
  assert.equal(Object.hasOwn(resolvedResult.validatedPack, "methodologyInfluence"), false);
});

test("quick-marked themes keep the public pack shape while making the generated session more playful", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u12",
    durationMin: 60,
    theme: "quick | finishing | notes:small teams",
    sessionsCount: 1,
  });

  assert.match(
    result.validatedPack.sessions[0].activities[0].description,
    /Setup:|Run:|Cues:/
  );
  assert.match(
    result.validatedPack.sessions[0].activities[1].description,
    /Setup:|Run:|Cues:/
  );
  assert.equal(result.validatedPack.theme, "quick | finishing | notes:small teams");
  assert.equal(Object.hasOwn(result.validatedPack, "sessionMode"), false);
});

test("quick one-drill requests under 25 minutes validate as one activity", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 25,
    theme: "quick | format:one_drill | 1v1 dribbling | 10 players",
    sessionMode: "drill",
    sessionsCount: 1,
    equipment: ["cones", "pinnies"],
  });

  const [session] = result.validatedPack.sessions;

  assert.equal(result.validatedPack.durationMin, 25);
  assert.equal(session.durationMin, 25);
  assert.equal(session.activities.length, 1);
  assert.equal(
    session.activities.reduce((sum, activity) => sum + activity.minutes, 0),
    25
  );
  assert.deepEqual(session.activities.map((activity) => activity.minutes), [25]);
  assert.equal(Object.hasOwn(result.validatedPack, "sessionMode"), false);
  assert.equal(Object.hasOwn(result.validatedPack, "activityFormat"), false);
});

test("quick requests without explicit duration keep the caller's default 60-minute duration", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "quick | 1v1 dribbling creativity | 10 players",
    sessionsCount: 1,
    equipment: ["cones", "pinnies"],
  });

  const [session] = result.validatedPack.sessions;

  assert.equal(result.validatedPack.durationMin, 60);
  assert.equal(session.durationMin, 60);
  assert.equal(
    session.activities.reduce((sum, activity) => sum + activity.minutes, 0),
    60
  );
});

test("quick session-mode requests create a four-activity full session", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "quick | possession session | 14 players",
    sessionMode: "full_session",
    coachNotes: "I need a full training session with a final game.",
    sessionsCount: 1,
  });

  const [session] = result.validatedPack.sessions;

  assert.equal(session.activities.length, 4);
  assert.deepEqual(session.activities.map((activity) => activity.minutes), [12, 18, 18, 12]);
  assert.match(session.activities.at(-1).name, /Final Game|Tournament|Competitive|Gate Battle/i);
  assert.equal(/Water break/i.test(session.activities.at(-1).name), false);
});

test("attacking-overload pipeline returns the polished four-activity story", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u10",
    durationMin: 60,
    theme: "attacking overloads",
    sessionMode: "full_session",
    coachNotes: "attacking overloads",
    sessionsCount: 1,
    equipment: ["Essentials / Builder choice"],
  });

  const activities = result.validatedPack.sessions[0].activities;
  const names = activities.map((activity) => activity.name);
  const allText = activities.map((activity) => `${activity.name} ${activity.description}`).join(" ");

  assert.deepEqual(names, [
    "Overload Gates Activation",
    "Wide Overload Decision Game",
    "Overload Recovery Counter Game",
    "Overload Gate Battle Final Game",
  ]);
  assert.match(activities[2].description, /recovering defender|second decision|counter gate/i);
  assert.match(activities[3].description, /Format:|Teams:|Scoring:|Constraint:|Win condition:|Focus:/i);
  assert.match(activities[3].description, /first team to three goals/i);
  assert.doesNotMatch(allText, /No description provided|Ball mastery arrival game|Overload To Free Player Game|Small-Sided Competitive Final Game/i);
});

test("attacking-overload diagram legend code uses team-color line language", () => {
  const diagramPlaceholder = readRepoFile("apps", "club-vivo", "components", "coach", "DiagramPlaceholder.tsx");
  const activityOutput = readRepoFile("apps", "club-vivo", "components", "coach", "ActivityOutput.tsx");
  const sessionNewFlow = readRepoFile("apps", "club-vivo", "app", "(protected)", "sessions", "new", "session-new-flow.tsx");
  const sessionBuilderApi = readRepoFile("apps", "club-vivo", "lib", "session-builder-api.ts");
  const staticText = `${diagramPlaceholder}\n${sessionNewFlow}\n${sessionBuilderApi}`;

  assert.match(sessionNewFlow, /Blue player = coached team/);
  assert.match(sessionNewFlow, /Red player = opponent \/ defender/);
  assert.match(sessionNewFlow, /Line color follows the acting player/);
  assert.match(sessionNewFlow, /Solid line = pass \/ shot \/ ball action/);
  assert.match(sessionNewFlow, /Yellow circle = cone \/ equipment/);
  assert.match(diagramPlaceholder, /Cone gate = scoring gate/);
  assert.match(diagramPlaceholder, /Wide channel = free-player lane/);
  assert.match(diagramPlaceholder, /Recovery line = defender release line/);
  assert.match(diagramPlaceholder, /Blue dotted line = attacker dribbles to gate/);
  assert.match(diagramPlaceholder, /Blue solid line = pass to free player/);
  assert.match(diagramPlaceholder, /Red dashed line = recovery defender releases/);
  assert.match(sessionBuilderApi, /16 x 15 meter grid \(18 x 16 yards\)/);
  assert.match(sessionBuilderApi, /24 x 20 meter field \(26 x 22 yards\)/);
  assert.match(sessionBuilderApi, /36 x 28 meter field \(39 x 31 yards\)/);
  assert.match(sessionBuilderApi, /Start the ball with a central attacker or coach pass/);
  assert.doesNotMatch(sessionBuilderApi, blockedFrontendFixturePattern);
  assert.match(sessionBuilderApi, /Format: small-sided gate battle/);
  assert.match(sessionBuilderApi, /Win condition: first team to three goals/);
  assert.match(activityOutput, /buildFallbackSections/);
  assert.match(activityOutput, /First team to three goals/);
  assert.doesNotMatch(sessionNewFlow, /Cone gate|Target gate|Wide channel|Counter gate|Recovery line/);
  assert.doesNotMatch(sessionNewFlow, /Blue line = coached team action|Red line = opponent \/ defender action|Gray line = neutral \/ free-player action/);
  assert.doesNotMatch(staticText, /Solid green|Dotted green|#0f766e|markerBaseId}-green|Movement without the ball|Team coached|Cones or equipment/);
});

test("diagram placeholder field renderer does not render token text inside the SVG field", () => {
  const diagramPlaceholder = readRepoFile("apps", "club-vivo", "components", "coach", "DiagramPlaceholder.tsx");

  assert.doesNotMatch(diagramPlaceholder, /<text\b/);
  assert.doesNotMatch(diagramPlaceholder, /DirectLabel|ArrowLabel/);
  assert.doesNotMatch(diagramPlaceholder, /token\.label\s*\?/);
  assert.match(diagramPlaceholder, /if \(token\.type === "label"\) {\s*return null;\s*}/);
  assert.match(diagramPlaceholder, /reaction_chase_progression/);
  assert.match(diagramPlaceholder, /activityIndex === totalActivities - 1/);
});

test("generated session At a Glance includes coach note and session story fallback", () => {
  const sessionNewFlow = readRepoFile("apps", "club-vivo", "app", "(protected)", "sessions", "new", "session-new-flow.tsx");
  const savedSessionPage = readRepoFile("apps", "club-vivo", "app", "(protected)", "sessions", "[sessionId]", "page.tsx");

  assert.match(sessionNewFlow, /Coach note \/ activity idea/);
  assert.match(sessionNewFlow, /Session story/);
  assert.match(sessionNewFlow, /Introduce gates and first-touch scoring/);
  assert.match(sessionNewFlow, /Add chase pressure/);
  assert.match(sessionNewFlow, /Add support and a second decision/);
  assert.match(sessionNewFlow, /Finish with an escape-gates mini tournament/);
  assert.match(sessionNewFlow, /coachNote=\{generateState\.values\.constraints\}/);
  assert.match(savedSessionPage, /Session story/);
  assert.match(savedSessionPage, /Introduce gates and first-touch scoring/);
});

test("diagram mini legends stay local and line styles are distinct", () => {
  const diagramPlaceholder = readRepoFile("apps", "club-vivo", "components", "coach", "DiagramPlaceholder.tsx");
  const sessionNewFlow = readRepoFile("apps", "club-vivo", "app", "(protected)", "sessions", "new", "session-new-flow.tsx");
  const savedSessionPage = readRepoFile("apps", "club-vivo", "app", "(protected)", "sessions", "[sessionId]", "page.tsx");

  assert.match(diagramPlaceholder, /function panelUsesLegendKey/);
  assert.match(diagramPlaceholder, /key === "neutralPlayer" \|\| key === "freePlayer"/);
  assert.match(diagramPlaceholder, /token\.type === "player" && token\.role === "neutral"/);
  assert.match(diagramPlaceholder, /!\(key === "zone" && visibleKeys\.includes\("activityArea"\)\)/);
  assert.match(diagramPlaceholder, /legend: \["coneGate", "activityArea"\]/);
  assert.match(diagramPlaceholder, /strokeDasharray=\{dash\}/);
  assert.match(diagramPlaceholder, /action === "carry" \? "1 4"/);
  assert.match(diagramPlaceholder, /action === "pressure" \|\| action === "run" \? "6 4"/);
  assert.match(sessionNewFlow, /LineLegendSymbol dash="1 4"/);
  assert.match(sessionNewFlow, /LineLegendSymbol dash="6 4"/);
  assert.match(savedSessionPage, /LineLegendSymbol dash="1 4"/);
  assert.match(savedSessionPage, /LineLegendSymbol dash="6 4"/);
});

test("reaction chase progression and final card stay coach-readable", () => {
  const diagramPlaceholder = readRepoFile("apps", "club-vivo", "components", "coach", "DiagramPlaceholder.tsx");

  assert.match(diagramPlaceholder, /nearby coach/);
  assert.match(diagramPlaceholder, /support and a second defender/);
  assert.match(diagramPlaceholder, /attacks any open scoring gate/);
  assert.doesNotMatch(diagramPlaceholder, blockedReactionCaptionPattern);
  assert.match(diagramPlaceholder, /FinalGameGridVisual/);
  assert.match(diagramPlaceholder, /Format/);
  assert.match(diagramPlaceholder, /Goals/);
  assert.match(diagramPlaceholder, /Game length/);
  assert.match(diagramPlaceholder, /Bonus/);
  assert.match(diagramPlaceholder, /Winner rule/);
  assert.match(diagramPlaceholder, /4v4 or 5v5/);
  assert.match(diagramPlaceholder, /5-minute games or first team to two goals/);
  assert.match(diagramPlaceholder, /goal counts double/i);
});

test("quick drill-mode requests create one main activity", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 23,
    theme: "quick | passing drill | 10 players",
    sessionMode: "drill",
    coachNotes: "Give me a quick drill with repetition.",
    sessionsCount: 1,
  });

  const [session] = result.validatedPack.sessions;

  assert.equal(session.activities.length, 1);
  assert.deepEqual(session.activities.map((activity) => activity.minutes), [23]);
  assert.match(session.activities[0].description, /grid|gates|channels|target players/i);
});

test("quick activity-mode requests create one 20-minute activity", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 20,
    theme: "quick | first touch under pressure | 12 players",
    sessionMode: "quick_activity",
    coachNotes: "First touch under pressure, no full session needed.",
    sessionsCount: 1,
  });

  const [session] = result.validatedPack.sessions;

  assert.equal(session.durationMin, 20);
  assert.equal(session.activities.length, 1);
  assert.equal(session.activities[0].minutes, 20);
  assert.equal(Object.hasOwn(result.validatedPack, "sessionMode"), false);
});

test("quick activity prompt with under 12 age wording creates one U12 activity", async () => {
  const result = await processSessionPackRequest({
    sport: "soccer",
    ageBand: "under 12",
    durationMin: 20,
    theme: "quick | format:quick_activity | duck duck goose",
    sessionMode: "quick_activity",
    coachNotes: "Give me a drill similar to duck duck goose for players under 12.",
    sessionsCount: 1,
  });

  const [session] = result.validatedPack.sessions;
  const description = session.activities[0].description;

  assert.equal(result.validatedPack.ageBand, "u12");
  assert.equal(session.ageBand, "u12");
  assert.equal(session.activities.length, 1);
  assert.equal(session.activities[0].minutes, 20);
  assert.match(description, /Setup:/);
  assert.match(description, /How to start:/);
  assert.match(description, /How to run it:/);
  assert.match(description, /Coaching cues:/);
  assert.match(description, /What to watch for:/);
  assert.match(description, /Progression:/);
  assert.match(description, /Regression:/);
  assert.doesNotMatch(description, /duck, duck, goose|duck duck goose/i);
  assert.match(description, /trigger|reaction|first touch|escape gate/i);
});

test("processSessionImageAnalysisRequest stores one tenant-scoped image and returns a draft profile", async () => {
  const storageCalls = [];
  const analysisCalls = [];

  const result = await processSessionImageAnalysisRequest({
    rawInput: {
      requestType: "image-analysis",
      mode: "environment_profile",
      sourceImage: {
        filename: "field.jpg",
        mimeType: "image/jpeg",
        bytesBase64: Buffer.from("fake-image").toString("base64"),
      },
    },
    tenantCtx: { tenantId: "tenant_authoritative" },
    imageStorage: {
      putSourceImage: async (args) => {
        storageCalls.push(args);
        return { key: "tenant/tenant_authoritative/session-builder/image-intake/v1/environment_profile/analysis/source/image.jpg" };
      },
    },
    imageAnalysis: {
      analyzeImage: async (args) => {
        analysisCalls.push(args);
        return {
          text: JSON.stringify({
            summary: "Small turf space with one goal.",
            surfaceType: "turf",
            spaceSize: "small",
            boundaryType: "small-grid",
            visibleEquipment: ["cones", "goal"],
            constraints: ["limited-width"],
            safetyNotes: [],
            assumptions: [],
            analysisConfidence: "medium",
          }),
          usage: { inputTokens: 1, outputTokens: 1 },
          metrics: {},
          stopReason: "end_turn",
        };
      },
    },
  });

  assert.equal(storageCalls[0].tenantId, "tenant_authoritative");
  assert.equal(storageCalls[0].mode, "environment_profile");
  assert.equal(analysisCalls[0].mode, "environment_profile");
  assert.equal(result.profile.status, "draft");
  assert.equal(result.profile.mode, "environment_profile");
  assert.equal(result.storageKey.includes("tenant/tenant_authoritative/"), true);
});

test("generateCoachLiteDraft derives an internal Coach Lite draft without changing pack shape", () => {
  const generatedPack = generateSessionPack({
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    equipment: ["cones", "balls"],
  });

  const draft = generateCoachLiteDraft(generatedPack);

  assert.equal(draft.specVersion, "session-pack.v2");
  assert.equal(draft.sport, "soccer");
  assert.equal(draft.sessionPackId, generatedPack.packId);
  assert.equal(generatedPack.packId !== undefined, true);
  assert.equal(Object.hasOwn(generatedPack, "sessionPackId"), false);
});

test("validateCoachLiteDraft accepts the derived internal draft", () => {
  const generatedPack = generateSessionPack({
    sport: "soccer",
    ageBand: "u12",
    durationMin: 50,
    theme: "passing shape",
    sessionsCount: 1,
  });

  const draft = generateCoachLiteDraft(generatedPack);
  const validatedDraft = validateCoachLiteDraft(draft);

  assert.equal(validatedDraft.specVersion, "session-pack.v2");
  assert.equal(validatedDraft.durationMinutes, 50);
});

test("persistSession returns explicit persist stage output", async () => {
  const normalizedInput = {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    objectiveTags: ["pressing"],
    activities: [{ name: "Warm-up", minutes: 60, description: "Prep" }],
  };

  const result = await persistSession({
    tenantCtx: { tenantId: "tenant_authoritative", userId: "user-123" },
    normalizedInput,
    sessionRepository: {
      createSession: async (tenantCtx, sessionInput) => ({
        session: {
          sessionId: "session-123",
          createdAt: "2026-04-01T00:00:00.000Z",
          createdBy: tenantCtx.userId,
          ...sessionInput,
        },
      }),
    },
  });

  assert.deepEqual(result.normalizedInput, normalizedInput);
  assert.equal(result.persistedSession.sessionId, "session-123");
});

test("exportPersistedSession returns explicit export stage output", async () => {
  const calls = [];
  const persistedSession = {
    sessionId: "session-123",
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    objectiveTags: ["pressing"],
    activities: [{ name: "Warm-up", minutes: 60, description: "Prep" }],
  };

  const result = await exportPersistedSession({
    tenantCtx: { tenantId: "tenant_authoritative" },
    persistedSession,
    createSessionPdfBufferFn: ({ tenantId, session }) => {
      calls.push({ tenantId, session });
      return Buffer.from("%PDF-1.4\nfake\n", "utf8");
    },
    sessionPdfStorage: {
      putSessionPdf: async (args) => {
        calls.push({ putArgs: args });
      },
      presignSessionPdfGet: async (args) => {
        calls.push({ presignArgs: args });
        return {
          url: "https://example.com/presigned.pdf",
          expiresInSeconds: 300,
        };
      },
    },
  });

  assert.equal(result.persistedSession.sessionId, "session-123");
  assert.deepEqual(result.exportResult, {
    url: "https://example.com/presigned.pdf",
    expiresInSeconds: 300,
  });
  assert.deepEqual(calls, [
    { tenantId: "tenant_authoritative", session: persistedSession },
    {
      putArgs: {
        tenantId: "tenant_authoritative",
        sessionId: "session-123",
        pdfBuffer: Buffer.from("%PDF-1.4\nfake\n", "utf8"),
      },
    },
    {
      presignArgs: {
        tenantId: "tenant_authoritative",
        sessionId: "session-123",
      },
    },
  ]);
});
