"use strict";

const { validationError } = require("../../platform/validation/validate");
const { normalizeAgeBand } = require("./session-validate");

const ALLOWED_FIELDS = [
  "sport",
  "ageBand",
  "durationMinutes",
  "playerCount",
  "evidenceSummary",
  "coachNotes",
  "nextGameObjective",
  "availableEquipment",
  "context",
];
const ALLOWED_CONTEXT_FIELDS = ["teamLevel", "space", "methodologyTags"];
const TENANT_LIKE_FIELDS = ["tenant_id", "tenantId", "x-tenant-id"];
const SUPPORTED_AGE_BANDS = ["u8", "u10", "u12", "u14", "u16", "u18", "adult"];

const LIMITS = {
  evidenceSummaryMax: 1200,
  coachNotesMax: 800,
  nextGameObjectiveMax: 500,
  durationMinutesMin: 15,
  durationMinutesMax: 120,
  playerCountMin: 1,
  playerCountMax: 40,
  availableEquipmentMaxItems: 20,
  availableEquipmentItemMax: 60,
  teamLevelMax: 80,
  spaceMax: 120,
  methodologyTagsMaxItems: 10,
  methodologyTagMax: 60,
};

function requireObject(value, field) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw validationError("invalid_field", `${field} must be an object`, { field });
  }

  return value;
}

function rejectUnknownFields(body, allowed, { prefix } = {}) {
  const unknown = Object.keys(body || {})
    .filter((key) => TENANT_LIKE_FIELDS.includes(key) || !allowed.includes(key))
    .map((key) => (prefix ? `${prefix}.${key}` : key));

  if (unknown.length) {
    throw validationError("unknown_fields", "Unknown fields are not allowed", {
      unknown,
    });
  }
}

function requirePresentFields(body, fields) {
  const missing = fields.filter((field) => body?.[field] === undefined || body?.[field] === null);

  if (missing.length) {
    throw validationError("missing_fields", `Missing required fields: ${missing.join(", ")}`, {
      missing,
    });
  }
}

function requireTrimmedString(body, field, { max }) {
  const value = body?.[field];

  if (typeof value !== "string" || !value.trim()) {
    throw validationError("invalid_field", `${field} must be a non-empty string`, { field });
  }

  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw validationError("invalid_field", `${field} is too long`, { field, max });
  }

  return trimmed;
}

function optionalTrimmedString(body, field, { max }) {
  const value = body?.[field];

  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw validationError("invalid_field", `${field} must be a string`, { field });
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.length > max) {
    throw validationError("invalid_field", `${field} is too long`, { field, max });
  }

  return trimmed;
}

function optionalInt(body, field, { min, max, fallback } = {}) {
  const value = body?.[field];

  if (value === undefined || value === null) {
    return fallback;
  }

  if (!Number.isInteger(value)) {
    throw validationError("invalid_field", `${field} must be an integer`, { field });
  }
  if (min !== undefined && value < min) {
    throw validationError("invalid_field", `${field} is too small`, { field, min });
  }
  if (max !== undefined && value > max) {
    throw validationError("invalid_field", `${field} is too large`, { field, max });
  }

  return value;
}

function validateSport(body) {
  const raw = requireTrimmedString(body, "sport", { max: 40 });
  const sport = raw.toLowerCase();

  if (sport !== "soccer") {
    throw validationError("invalid_field", "sport is not supported", {
      reason: "unsupported_sport",
      field: "sport",
      value: raw,
    });
  }

  return sport;
}

function validateAgeBand(body) {
  const raw = requireTrimmedString(body, "ageBand", { max: 40 });
  const ageBand = normalizeAgeBand(raw);

  if (!SUPPORTED_AGE_BANDS.includes(ageBand)) {
    throw validationError("invalid_field", "ageBand is not supported", {
      reason: "unsupported_age_band",
      field: "ageBand",
      value: raw,
    });
  }

  return ageBand;
}

function optionalStringArray(body, field, { maxItems, itemMax }) {
  const value = body?.[field];

  if (value === undefined || value === null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw validationError("invalid_field", `${field} must be an array`, { field });
  }
  if (value.length > maxItems) {
    throw validationError("invalid_field", `${field} has too many items`, { field, maxItems });
  }

  const result = [];
  for (let index = 0; index < value.length; index++) {
    const item = value[index];
    if (typeof item !== "string") {
      throw validationError("invalid_field", `${field}[${index}] must be a string`, {
        field,
        index,
      });
    }

    const trimmed = item.trim();
    if (!trimmed) {
      continue;
    }
    if (trimmed.length > itemMax) {
      throw validationError("invalid_field", `${field}[${index}] is too long`, {
        field,
        index,
        itemMax,
      });
    }

    result.push(trimmed);
  }

  return result;
}

function validateContext(raw) {
  if (raw === undefined || raw === null) {
    return undefined;
  }

  const context = requireObject(raw, "context");
  rejectUnknownFields(context, ALLOWED_CONTEXT_FIELDS, { prefix: "context" });

  const teamLevel = optionalTrimmedString(context, "teamLevel", { max: LIMITS.teamLevelMax });
  const space = optionalTrimmedString(context, "space", { max: LIMITS.spaceMax });
  const methodologyTags = optionalStringArray(context, "methodologyTags", {
    maxItems: LIMITS.methodologyTagsMaxItems,
    itemMax: LIMITS.methodologyTagMax,
  });

  const result = {
    ...(teamLevel !== undefined ? { teamLevel } : {}),
    ...(space !== undefined ? { space } : {}),
    ...(methodologyTags.length ? { methodologyTags } : {}),
  };

  return Object.keys(result).length ? result : undefined;
}

function validateTrainingBriefInput(body) {
  const safeBody = requireObject(body, "body");
  rejectUnknownFields(safeBody, ALLOWED_FIELDS);
  requirePresentFields(safeBody, ["sport", "ageBand", "evidenceSummary"]);

  const coachNotes = optionalTrimmedString(safeBody, "coachNotes", { max: LIMITS.coachNotesMax });
  const nextGameObjective = optionalTrimmedString(safeBody, "nextGameObjective", {
    max: LIMITS.nextGameObjectiveMax,
  });
  const context = validateContext(safeBody.context);

  return {
    sport: validateSport(safeBody),
    ageBand: validateAgeBand(safeBody),
    durationMinutes: optionalInt(safeBody, "durationMinutes", {
      min: LIMITS.durationMinutesMin,
      max: LIMITS.durationMinutesMax,
      fallback: 60,
    }),
    evidenceSummary: requireTrimmedString(safeBody, "evidenceSummary", {
      max: LIMITS.evidenceSummaryMax,
    }),
    availableEquipment: optionalStringArray(safeBody, "availableEquipment", {
      maxItems: LIMITS.availableEquipmentMaxItems,
      itemMax: LIMITS.availableEquipmentItemMax,
    }),
    ...(safeBody.playerCount !== undefined
      ? {
          playerCount: optionalInt(safeBody, "playerCount", {
            min: LIMITS.playerCountMin,
            max: LIMITS.playerCountMax,
          }),
        }
      : {}),
    ...(coachNotes !== undefined ? { coachNotes } : {}),
    ...(nextGameObjective !== undefined ? { nextGameObjective } : {}),
    ...(context !== undefined ? { context } : {}),
  };
}

module.exports = {
  validateTrainingBriefInput,
  LIMITS,
  SUPPORTED_AGE_BANDS,
};
