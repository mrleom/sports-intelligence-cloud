"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { buildSessionBuilderHandoffFromTrainingBrief } = require("./training-brief-handoff");

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

test("buildSessionBuilderHandoffFromTrainingBrief maps minimal valid input into full_session handoff", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(
    makeValidBrief({
      sport: " Soccer ",
      ageBand: "U14",
      evidenceSummary: "  Opponents played through midfield too easily.  ",
    })
  );

  assert.deepEqual(result, {
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "Opponents played through midfield too easily.",
    sessionMode: "full_session",
    coachNotes: "Evidence: Opponents played through midfield too easily.",
    equipment: [],
    handoffMeta: {
      source: "training_brief",
      trainingBriefVersion: "v1",
      requiresCoachReview: true,
      evidenceIncluded: true,
      contextIncluded: false,
      recommendedNextStep: "review_in_session_builder",
    },
  });
});

test("buildSessionBuilderHandoffFromTrainingBrief maps durationMinutes to durationMin", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(makeValidBrief({ durationMinutes: 75 }));

  assert.equal(result.durationMin, 75);
});

test("buildSessionBuilderHandoffFromTrainingBrief maps availableEquipment to equipment", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(
    makeValidBrief({ availableEquipment: [" balls ", "", "cones"] })
  );

  assert.deepEqual(result.equipment, ["balls", "cones"]);
});

test("buildSessionBuilderHandoffFromTrainingBrief includes internal handoff metadata", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(makeValidBrief());

  assert.deepEqual(result.handoffMeta, {
    source: "training_brief",
    trainingBriefVersion: "v1",
    requiresCoachReview: true,
    evidenceIncluded: true,
    contextIncluded: false,
    recommendedNextStep: "review_in_session_builder",
  });
});

test("buildSessionBuilderHandoffFromTrainingBrief uses nextGameObjective as preferred theme", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(
    makeValidBrief({ nextGameObjective: " Protect central spaces before playing forward. " })
  );

  assert.equal(result.theme, "Protect central spaces before playing forward.");
});

test("buildSessionBuilderHandoffFromTrainingBrief falls back to evidenceSummary for theme", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(
    makeValidBrief({ evidenceSummary: " Wide overloads repeatedly pulled us apart. " })
  );

  assert.equal(result.theme, "Wide overloads repeatedly pulled us apart.");
});

test("buildSessionBuilderHandoffFromTrainingBrief truncates theme to 60 characters", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(
    makeValidBrief({
      nextGameObjective:
        "Improve defensive compactness across midfield when the opponent switches play quickly.",
    })
  );

  assert.equal(result.theme.length, 60);
  assert.equal(result.theme, "Improve defensive compactness across midfield when the oppon");
});

test("buildSessionBuilderHandoffFromTrainingBrief combines useful planning notes", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(
    makeValidBrief({
      evidenceSummary: "The team lost runners after the first defensive action.",
      nextGameObjective: "Track runners after pressure.",
      coachNotes: "Keep the activity simple.",
      playerCount: 16,
      context: {
        teamLevel: "travel",
        space: "half field",
        methodologyTags: ["pressing", "compactness"],
      },
    })
  );

  assert.equal(
    result.coachNotes,
    [
      "Evidence: The team lost runners after the first defensive action.",
      "Objective: Track runners after pressure.",
      "Coach notes: Keep the activity simple.",
      "Players: 16",
      "Team level: travel",
      "Space: half field",
      "Methodology: pressing, compactness",
    ].join("\n")
  );
});

test("buildSessionBuilderHandoffFromTrainingBrief sets contextIncluded false when context is absent", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(makeValidBrief());

  assert.equal(result.handoffMeta.contextIncluded, false);
});

test("buildSessionBuilderHandoffFromTrainingBrief sets contextIncluded true when context is present", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(
    makeValidBrief({ context: { space: "small grid" } })
  );

  assert.equal(result.handoffMeta.contextIncluded, true);
});

test("buildSessionBuilderHandoffFromTrainingBrief rejects invalid Training Brief input through validator", () => {
  assertValidationError(
    () => buildSessionBuilderHandoffFromTrainingBrief(makeValidBrief({ sport: "basketball" })),
    "invalid_field",
    { reason: "unsupported_sport", field: "sport", value: "basketball" }
  );
});

test("buildSessionBuilderHandoffFromTrainingBrief rejects tenant identity fields through validator", () => {
  assertValidationError(
    () => buildSessionBuilderHandoffFromTrainingBrief(makeValidBrief({ tenantId: "tenant-1" })),
    "unknown_fields",
    { unknown: ["tenantId"] }
  );
});

test("buildSessionBuilderHandoffFromTrainingBrief never returns tenant or auth-derived fields", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(makeValidBrief());

  assert.equal(Object.hasOwn(result, "tenantId"), false);
  assert.equal(Object.hasOwn(result, "tenant_id"), false);
  assert.equal(Object.hasOwn(result, "x-tenant-id"), false);
  assert.equal(Object.hasOwn(result, "userId"), false);
  assert.equal(Object.hasOwn(result.handoffMeta, "tenantId"), false);
  assert.equal(Object.hasOwn(result.handoffMeta, "userId"), false);
});

test("buildSessionBuilderHandoffFromTrainingBrief does not call session-pack generation", () => {
  const result = buildSessionBuilderHandoffFromTrainingBrief(makeValidBrief());

  assert.equal(Object.hasOwn(result, "sessionPack"), false);
  assert.equal(Object.hasOwn(result, "validatedPack"), false);
  assert.equal(Object.hasOwn(result, "activities"), false);
  assert.equal(Object.hasOwn(result, "packId"), false);
});
