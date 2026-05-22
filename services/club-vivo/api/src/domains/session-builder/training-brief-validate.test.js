"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { validateTrainingBriefInput } = require("./training-brief-validate");

function makeValidBrief(overrides = {}) {
  return {
    sport: "soccer",
    ageBand: "u14",
    evidenceSummary: "Opponents played through our midfield line too easily.",
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

test("validateTrainingBriefInput accepts minimal valid soccer input and normalizes fields", () => {
  const result = validateTrainingBriefInput(
    makeValidBrief({
      sport: " Soccer ",
      ageBand: "U14",
      evidenceSummary: "  Need better compactness between lines.  ",
    })
  );

  assert.deepEqual(result, {
    sport: "soccer",
    ageBand: "u14",
    durationMinutes: 60,
    evidenceSummary: "Need better compactness between lines.",
    availableEquipment: [],
  });
});

test("validateTrainingBriefInput defaults durationMinutes and availableEquipment", () => {
  const result = validateTrainingBriefInput(makeValidBrief());

  assert.equal(result.durationMinutes, 60);
  assert.deepEqual(result.availableEquipment, []);
});

test("validateTrainingBriefInput accepts full valid input", () => {
  const result = validateTrainingBriefInput(
    makeValidBrief({
      ageBand: "under twelve",
      durationMinutes: 75,
      playerCount: 18,
      coachNotes: "  Keep it simple.  ",
      nextGameObjective: "  Protect central zones.  ",
      availableEquipment: [" balls ", "", "cones"],
      context: {
        teamLevel: "  travel  ",
        space: "  half field  ",
        methodologyTags: [" compactness ", "", "pressing"],
      },
    })
  );

  assert.deepEqual(result, {
    sport: "soccer",
    ageBand: "u12",
    durationMinutes: 75,
    evidenceSummary: "Opponents played through our midfield line too easily.",
    availableEquipment: ["balls", "cones"],
    playerCount: 18,
    coachNotes: "Keep it simple.",
    nextGameObjective: "Protect central zones.",
    context: {
      teamLevel: "travel",
      space: "half field",
      methodologyTags: ["compactness", "pressing"],
    },
  });
});

test("validateTrainingBriefInput rejects tenant identity fields as unknown_fields", () => {
  assertValidationError(
    () =>
      validateTrainingBriefInput(
        makeValidBrief({
          tenantId: "tenant-1",
          tenant_id: "tenant-1",
          "x-tenant-id": "tenant-1",
        })
      ),
    "unknown_fields",
    { unknown: ["tenantId", "tenant_id", "x-tenant-id"] }
  );
});

test("validateTrainingBriefInput rejects unknown top-level fields", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ unexpected: true })),
    "unknown_fields",
    { unknown: ["unexpected"] }
  );
});

test("validateTrainingBriefInput rejects unknown context fields", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ context: { surface: "turf" } })),
    "unknown_fields",
    { unknown: ["context.surface"] }
  );
});

test("validateTrainingBriefInput rejects unsupported sport with stable reason", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ sport: "basketball" })),
    "invalid_field",
    { reason: "unsupported_sport", field: "sport", value: "basketball" }
  );
});

test("validateTrainingBriefInput rejects unsupported ageBand with stable reason", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ ageBand: "u9" })),
    "invalid_field",
    { reason: "unsupported_age_band", field: "ageBand", value: "u9" }
  );
});

test("validateTrainingBriefInput rejects missing required evidenceSummary", () => {
  const body = makeValidBrief();
  delete body.evidenceSummary;

  assertValidationError(() => validateTrainingBriefInput(body), "missing_fields", {
    missing: ["evidenceSummary"],
  });
});

test("validateTrainingBriefInput rejects empty evidenceSummary", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ evidenceSummary: "   " })),
    "invalid_field",
    { field: "evidenceSummary" }
  );
});

test("validateTrainingBriefInput rejects durationMinutes outside 15-120", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ durationMinutes: 14 })),
    "invalid_field",
    { field: "durationMinutes", min: 15 }
  );
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ durationMinutes: 121 })),
    "invalid_field",
    { field: "durationMinutes", max: 120 }
  );
});

test("validateTrainingBriefInput rejects playerCount outside 1-40", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ playerCount: 0 })),
    "invalid_field",
    { field: "playerCount", min: 1 }
  );
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ playerCount: 41 })),
    "invalid_field",
    { field: "playerCount", max: 40 }
  );
});

test("validateTrainingBriefInput rejects availableEquipment when it is not an array", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ availableEquipment: "cones" })),
    "invalid_field",
    { field: "availableEquipment" }
  );
});

test("validateTrainingBriefInput rejects availableEquipment non-string items", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ availableEquipment: ["cones", 3] })),
    "invalid_field",
    { field: "availableEquipment", index: 1 }
  );
});

test("validateTrainingBriefInput rejects methodologyTags when it is not an array", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ context: { methodologyTags: "pressing" } })),
    "invalid_field",
    { field: "methodologyTags" }
  );
});

test("validateTrainingBriefInput rejects methodologyTags non-string items", () => {
  assertValidationError(
    () => validateTrainingBriefInput(makeValidBrief({ context: { methodologyTags: ["pressing", false] } })),
    "invalid_field",
    { field: "methodologyTags", index: 1 }
  );
});

test("validateTrainingBriefInput trims optional strings and omits empty optional strings", () => {
  const result = validateTrainingBriefInput(
    makeValidBrief({
      coachNotes: "   ",
      nextGameObjective: "  Win first contacts.  ",
      context: {
        teamLevel: "",
        space: "  small grid  ",
        methodologyTags: ["", " transition "],
      },
    })
  );

  assert.equal(result.coachNotes, undefined);
  assert.equal(result.nextGameObjective, "Win first contacts.");
  assert.deepEqual(result.context, {
    space: "small grid",
    methodologyTags: ["transition"],
  });
});
