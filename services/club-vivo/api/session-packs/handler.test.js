"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { createSessionPacksInner } = require("./handler");

function makeLogger(events) {
  return {
    info: (eventType, message, extra = {}) =>
      events.push({ level: "INFO", eventType, message, ...extra }),
    warn: (eventType, message, extra = {}) =>
      events.push({ level: "WARN", eventType, message, ...extra }),
    error: (eventType, message, err, extra = {}) =>
      events.push({
        level: "ERROR",
        eventType,
        message,
        error: { name: err?.name, message: err?.message },
        ...extra,
      }),
  };
}

function makeTenantCtx() {
  return {
    tenantId: "tenant_authoritative",
    userId: "user-123",
    role: "coach",
    tier: "free",
  };
}

function makeEvent(body) {
  return {
    rawPath: "/session-packs",
    path: "/session-packs",
    requestContext: {
      http: {
        method: "POST",
      },
    },
    body: JSON.stringify(body),
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

test("POST /session-packs returns validatedPack from the internal pipeline and keeps public response shape", async () => {
  process.env.TENANT_ENTITLEMENTS_TABLE = "entitlements-table";

  const loggerEvents = [];
  const expectedPack = {
    packId: "pack-123",
    createdAt: "2026-04-01T00:00:00.000Z",
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    sessions: [],
  };

  const inner = createSessionPacksInner({
    processSessionPackFn: (body) => ({
      normalizedInput: body,
      generatedPack: { ...expectedPack, packId: "generated-only" },
      validatedPack: expectedPack,
    }),
  });

  const response = await inner({
    event: makeEvent({
      sport: "soccer",
      ageBand: "u14",
      durationMin: 60,
      theme: "pressing",
    }),
    tenantCtx: makeTenantCtx(),
    logger: makeLogger(loggerEvents),
  });

  assert.equal(response.statusCode, 201);
  assert.deepEqual(JSON.parse(response.body), { pack: expectedPack });
  assert.equal(loggerEvents[0].eventType, "pack_generated_success");
});

test("POST /session-packs returns sanitized training brief draft preview", async () => {
  process.env.TENANT_ENTITLEMENTS_TABLE = "entitlements-table";

  const loggerEvents = [];
  let sessionPackGenerationCalled = false;
  const inner = createSessionPacksInner({
    processSessionPackFn: () => {
      sessionPackGenerationCalled = true;
      throw new Error("session pack generation should not run");
    },
  });

  const response = await inner({
    event: makeEvent({
      requestType: "training-brief-draft",
      sport: "soccer",
      ageBand: "u14",
      durationMinutes: 60,
      playerCount: 12,
      evidenceSummary:
        "We lost compactness after turnovers and allowed central counterattacks.",
      coachNotes: "Half field, limited setup time, balls, cones, and bibs.",
      nextGameObjective: "Recover compact shape after losing the ball",
      availableEquipment: ["balls", "cones", "bibs"],
    }),
    tenantCtx: makeTenantCtx(),
    logger: makeLogger(loggerEvents),
  });

  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.equal(sessionPackGenerationCalled, false);
  assert.deepEqual(Object.keys(body), ["trainingBriefDraft"]);
  assert.deepEqual(body.trainingBriefDraft, {
    candidateType: "training_brief_candidate",
    version: "v1",
    status: "draft",
    requiresCoachReview: true,
    recommendedFocus: "Recover compact shape after losing the ball",
    rationale:
      "Based on the match evidence, We lost compactness after turnovers and allowed central counterattacks. The next session should help the coach review and train: Recover compact shape after losing the ball.",
    activityDirection: "Recover compact shape after losing the ball",
    sessionBuilderHandoff: {
      sport: "soccer",
      ageBand: "u14",
      durationMin: 60,
      theme: "Recover compact shape after losing the ball",
      sessionMode: "full_session",
      coachNotes:
        "Evidence: We lost compactness after turnovers and allowed central counterattacks.\nObjective: Recover compact shape after losing the ball\nCoach notes: Half field, limited setup time, balls, cones, and bibs.\nPlayers: 12",
      equipment: ["balls", "cones", "bibs"],
    },
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
    "role",
    "tier",
  ]) {
    assert.equal(hasKeyDeep(body, forbiddenKey), false, `${forbiddenKey} should not be exposed`);
  }
  assert.equal(loggerEvents[0].eventType, "training_brief_draft_preview_success");
});

test("POST /session-packs maps invalid training brief draft input to platform bad request", async () => {
  process.env.TENANT_ENTITLEMENTS_TABLE = "entitlements-table";

  const inner = createSessionPacksInner();

  await assert.rejects(
    () =>
      inner({
        event: makeEvent({
          requestType: "training-brief-draft",
          sport: "soccer",
          ageBand: "u14",
        }),
        tenantCtx: makeTenantCtx(),
        logger: makeLogger([]),
      }),
    (err) => {
      assert.equal(err.code, "platform.bad_request");
      assert.equal(err.httpStatus, 400);
      assert.deepEqual(err.details, {
        missing: ["evidenceSummary"],
      });
      return true;
    }
  );
});

test("POST /session-packs rejects tenant-like fields in training brief draft input", async () => {
  process.env.TENANT_ENTITLEMENTS_TABLE = "entitlements-table";

  const inner = createSessionPacksInner();

  await assert.rejects(
    () =>
      inner({
        event: makeEvent({
          requestType: "training-brief-draft",
          sport: "soccer",
          ageBand: "u14",
          evidenceSummary: "We need to recover faster after losing the ball.",
          tenantId: "client-supplied-tenant",
        }),
        tenantCtx: makeTenantCtx(),
        logger: makeLogger([]),
      }),
    (err) => {
      assert.equal(err.code, "platform.bad_request");
      assert.equal(err.httpStatus, 400);
      assert.deepEqual(err.details, {
        unknown: ["tenantId"],
      });
      return true;
    }
  );
});

test("POST /session-packs accepts fut-soccer sportPackId while keeping the public response shape unchanged", async () => {
  process.env.TENANT_ENTITLEMENTS_TABLE = "entitlements-table";

  const expectedPack = {
    packId: "pack-123",
    createdAt: "2026-04-01T00:00:00.000Z",
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    sessions: [],
  };

  const inner = createSessionPacksInner({
    processSessionPackFn: (body) => {
      assert.equal(body.sport, "soccer");
      assert.equal(body.sportPackId, "fut-soccer");

      return {
        normalizedInput: body,
        generatedPack: expectedPack,
        validatedPack: expectedPack,
      };
    },
  });

  const response = await inner({
    event: makeEvent({
      sport: "soccer",
      sportPackId: "fut-soccer",
      ageBand: "u14",
      durationMin: 60,
      theme: "pressing",
    }),
    tenantCtx: makeTenantCtx(),
    logger: makeLogger([]),
  });

  assert.equal(response.statusCode, 201);
  assert.deepEqual(JSON.parse(response.body), { pack: expectedPack });
});

test("POST /session-packs maps pipeline validation errors to platform bad request", async () => {
  process.env.TENANT_ENTITLEMENTS_TABLE = "entitlements-table";

  const inner = createSessionPacksInner({
    processSessionPackFn: () => {
      const err = new Error("bad input");
      err.statusCode = 400;
      err.details = { reason: "unsupported_age_band", field: "ageBand", value: "u7" };
      throw err;
    },
  });

  await assert.rejects(
    () =>
      inner({
        event: makeEvent({
          sport: "soccer",
          ageBand: "u7",
          durationMin: 60,
          theme: "pressing",
        }),
        tenantCtx: makeTenantCtx(),
        logger: makeLogger([]),
      }),
    (err) => {
      assert.equal(err.code, "platform.bad_request");
      assert.equal(err.httpStatus, 400);
      assert.deepEqual(err.details, {
        reason: "unsupported_age_band",
        field: "ageBand",
        value: "u7",
      });
      return true;
    }
  );
});

test("POST /session-packs returns analysis response for image-analysis requests inside the shared route", async () => {
  process.env.TENANT_ENTITLEMENTS_TABLE = "entitlements-table";
  process.env.SESSION_IMAGE_BUCKET_NAME = "session-image-bucket";
  process.env.SESSION_IMAGE_ANALYSIS_MODEL_ID = "amazon.nova-lite-v1:0";

  const loggerEvents = [];
  const inner = createSessionPacksInner({
    processSessionImageAnalysisFn: async () => ({
      analysisId: "analysis-123",
      profile: {
        mode: "environment_profile",
        schemaVersion: 1,
        analysisId: "analysis-123",
        status: "draft",
        sourceImageId: "image-123",
        sourceImageMimeType: "image/jpeg",
        summary: "Small turf space with one goal.",
        surfaceType: "turf",
        spaceSize: "small",
        boundaryType: "small-grid",
        visibleEquipment: ["cones", "goal"],
        constraints: [],
        safetyNotes: [],
        assumptions: [],
        analysisConfidence: "medium",
      },
      stopReason: "end_turn",
    }),
  });

  const response = await inner({
    event: makeEvent({
      requestType: "image-analysis",
      mode: "environment_profile",
      sourceImage: {
        mimeType: "image/jpeg",
        bytesBase64: "ZmFrZQ==",
      },
    }),
    tenantCtx: makeTenantCtx(),
    logger: makeLogger(loggerEvents),
  });

  assert.equal(response.statusCode, 201);
  assert.deepEqual(JSON.parse(response.body), {
    analysis: {
      analysisId: "analysis-123",
      profile: {
        mode: "environment_profile",
        schemaVersion: 1,
        analysisId: "analysis-123",
        status: "draft",
        sourceImageId: "image-123",
        sourceImageMimeType: "image/jpeg",
        summary: "Small turf space with one goal.",
        surfaceType: "turf",
        spaceSize: "small",
        boundaryType: "small-grid",
        visibleEquipment: ["cones", "goal"],
        constraints: [],
        safetyNotes: [],
        assumptions: [],
        analysisConfidence: "medium",
      },
    },
  });
  assert.equal(loggerEvents[0].eventType, "session_image_analysis_success");
});

test("POST /session-packs logs confirmed image profile use while keeping the public response shape unchanged", async () => {
  process.env.TENANT_ENTITLEMENTS_TABLE = "entitlements-table";

  const loggerEvents = [];
  const expectedPack = {
    packId: "pack-123",
    createdAt: "2026-04-01T00:00:00.000Z",
    sport: "soccer",
    ageBand: "u14",
    durationMin: 60,
    theme: "pressing",
    sessionsCount: 1,
    sessions: [],
  };

  const inner = createSessionPacksInner({
    processSessionPackFn: () => ({
      normalizedInput: {
        confirmedProfile: {
          mode: "setup_to_drill",
          analysisId: "analysis-123",
          status: "confirmed",
        },
      },
      generatedPack: expectedPack,
      validatedPack: expectedPack,
    }),
  });

  const response = await inner({
    event: makeEvent({
      sport: "soccer",
      ageBand: "u14",
      durationMin: 60,
      theme: "pressing",
    }),
    tenantCtx: makeTenantCtx(),
    logger: makeLogger(loggerEvents),
  });

  assert.equal(response.statusCode, 201);
  assert.deepEqual(JSON.parse(response.body), { pack: expectedPack });
  assert.deepEqual(
    loggerEvents.map((event) => event.eventType),
    ["session_image_profile_confirmed", "pack_generated_success"]
  );
});
