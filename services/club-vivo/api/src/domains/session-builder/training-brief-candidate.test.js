"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { buildTrainingBriefCandidate } = require("./training-brief-candidate");
const { buildSessionBuilderHandoffFromTrainingBrief } = require("./training-brief-handoff");

const FORBIDDEN_IDENTITY_KEYS = [
  "tenantId",
  "tenant_id",
  "x-tenant-id",
  "userId",
  "auth",
  "claims",
  "entitlements",
];
const FORBIDDEN_GENERATION_KEYS = ["sessionPack", "validatedPack", "activities", "packId"];

function makeValidBrief(overrides = {}) {
  return {
    sport: "soccer",
    ageBand: "u14",
    evidenceSummary: "Opponents played through midfield too easily.",
    ...overrides,
  };
}

function assertValidationError(fn, code, details = {}) {
  assert.throws(fn, (err) => {
    assert.equal(err.code, code);
    for (const [key, value] of Object.entries(details)) {
      assert.deepEqual(err.details[key], value);
    }
    return true;
  });
}

function collectKeys(value, keys = []) {
  if (!value || typeof value !== "object") {
    return keys;
  }

  for (const [key, child] of Object.entries(value)) {
    keys.push(key);
    collectKeys(child, keys);
  }

  return keys;
}

test("buildTrainingBriefCandidate builds a draft candidate from minimal valid raw input", () => {
  const candidate = buildTrainingBriefCandidate(makeValidBrief());

  assert.equal(candidate.candidateType, "training_brief_candidate");
  assert.equal(candidate.version, "v1");
  assert.equal(candidate.status, "draft");
  assert.equal(candidate.source, "match_to_match_prescription");
  assert.equal(candidate.requiresCoachReview, true);
});

test("buildTrainingBriefCandidate includes normalized validatedInput", () => {
  const candidate = buildTrainingBriefCandidate(
    makeValidBrief({
      sport: " Soccer ",
      ageBand: "U14",
      evidenceSummary: "  Opponents played through midfield too easily.  ",
    })
  );

  assert.deepEqual(candidate.validatedInput, {
    sport: "soccer",
    ageBand: "u14",
    durationMinutes: 60,
    evidenceSummary: "Opponents played through midfield too easily.",
    availableEquipment: [],
  });
});

test("buildTrainingBriefCandidate includes sessionBuilderHandoff from mapper", () => {
  const input = makeValidBrief({
    durationMinutes: 75,
    availableEquipment: ["balls", "cones"],
    nextGameObjective: "Protect central spaces.",
  });
  const candidate = buildTrainingBriefCandidate(input);

  assert.deepEqual(candidate.sessionBuilderHandoff, buildSessionBuilderHandoffFromTrainingBrief(input));
});

test("buildTrainingBriefCandidate uses nextGameObjective as recommendedFocus when present", () => {
  const candidate = buildTrainingBriefCandidate(
    makeValidBrief({ nextGameObjective: " Protect central spaces before playing forward. " })
  );

  assert.equal(candidate.recommendedFocus, "Protect central spaces before playing forward.");
});

test("buildTrainingBriefCandidate falls back to handoff theme when nextGameObjective is absent", () => {
  const candidate = buildTrainingBriefCandidate(
    makeValidBrief({ evidenceSummary: " Wide overloads repeatedly pulled us apart. " })
  );

  assert.equal(candidate.recommendedFocus, candidate.sessionBuilderHandoff.theme);
});

test("buildTrainingBriefCandidate creates one activity recommendation", () => {
  const candidate = buildTrainingBriefCandidate(makeValidBrief());

  assert.equal(candidate.activityRecommendations.length, 1);
  assert.equal(candidate.activityRecommendations[0].reviewRequired, true);
});

test("buildTrainingBriefCandidate caps recommendation duration at 30 minutes", () => {
  const candidate = buildTrainingBriefCandidate(makeValidBrief({ durationMinutes: 90 }));

  assert.equal(candidate.activityRecommendations[0].durationMinutes, 30);
});

test("buildTrainingBriefCandidate keeps recommendation duration at least 15 minutes", () => {
  const candidate = buildTrainingBriefCandidate(makeValidBrief({ durationMinutes: 15 }));

  assert.equal(candidate.activityRecommendations[0].durationMinutes, 15);
});

test("buildTrainingBriefCandidate includes required DiagramSequence diagram requirement", () => {
  const candidate = buildTrainingBriefCandidate(makeValidBrief());

  assert.deepEqual(candidate.activityRecommendations[0].diagramRequirement, {
    required: true,
    reason: "main_activity_recommendation",
    preferredContract: "DiagramSequence",
  });
});

test("buildTrainingBriefCandidate includes candidateMeta persistence and handoff readiness", () => {
  const candidate = buildTrainingBriefCandidate(makeValidBrief());

  assert.deepEqual(candidate.candidateMeta, {
    createdBy: "system",
    persistence: "not_persisted",
    nextStep: "review_in_session_builder",
    handoffReady: true,
  });
});

test("buildTrainingBriefCandidate rejects invalid Training Brief input through validator", () => {
  assertValidationError(
    () => buildTrainingBriefCandidate(makeValidBrief({ sport: "basketball" })),
    "invalid_field",
    { reason: "unsupported_sport", field: "sport", value: "basketball" }
  );
});

test("buildTrainingBriefCandidate rejects tenant identity fields through validator", () => {
  assertValidationError(
    () => buildTrainingBriefCandidate(makeValidBrief({ tenantId: "tenant-1" })),
    "unknown_fields",
    { unknown: ["tenantId"] }
  );
});

test("buildTrainingBriefCandidate does not include tenant or auth-derived fields anywhere", () => {
  const candidate = buildTrainingBriefCandidate(makeValidBrief());
  const keys = collectKeys(candidate);

  for (const forbidden of FORBIDDEN_IDENTITY_KEYS) {
    assert.equal(keys.includes(forbidden), false, `${forbidden} should not be present`);
  }
});

test("buildTrainingBriefCandidate does not include generated pack or persistence record keys", () => {
  const candidate = buildTrainingBriefCandidate(makeValidBrief());
  const keys = collectKeys(candidate);

  for (const forbidden of FORBIDDEN_GENERATION_KEYS) {
    assert.equal(keys.includes(forbidden), false, `${forbidden} should not be present`);
  }
  assert.equal(Object.hasOwn(candidate, "persistence"), false);
  assert.equal(Object.hasOwn(candidate, "pk"), false);
  assert.equal(Object.hasOwn(candidate, "sk"), false);
  assert.equal(Object.hasOwn(candidate, "id"), false);
});

test("buildTrainingBriefCandidate does not mutate input", () => {
  const input = makeValidBrief({
    sport: " Soccer ",
    ageBand: "U14",
    availableEquipment: [" balls ", ""],
    context: {
      teamLevel: " travel ",
      methodologyTags: [" pressing ", ""],
    },
  });
  const before = JSON.parse(JSON.stringify(input));

  buildTrainingBriefCandidate(input);

  assert.deepEqual(input, before);
});
