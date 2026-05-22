"use strict";

const { validateTrainingBriefInput } = require("./training-brief-validate");

const HANDOFF_META = {
  source: "training_brief",
  trainingBriefVersion: "v1",
  requiresCoachReview: true,
  evidenceIncluded: true,
  recommendedNextStep: "review_in_session_builder",
};

const LIMITS = {
  themeMax: 60,
  coachNotesMax: 1000,
};

function compactText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, max) {
  const compacted = compactText(value);
  return compacted.length > max ? compacted.slice(0, max).trim() : compacted;
}

function truncateNote(value, max) {
  const trimmed = String(value || "").trim();
  return trimmed.length > max ? trimmed.slice(0, max).trim() : trimmed;
}

function buildTheme(validated) {
  return truncate(validated.nextGameObjective || validated.evidenceSummary, LIMITS.themeMax);
}

function buildCoachNotes(validated) {
  const lines = [`Evidence: ${validated.evidenceSummary}`];

  if (validated.nextGameObjective) {
    lines.push(`Objective: ${validated.nextGameObjective}`);
  }
  if (validated.coachNotes) {
    lines.push(`Coach notes: ${validated.coachNotes}`);
  }
  if (validated.playerCount !== undefined) {
    lines.push(`Players: ${validated.playerCount}`);
  }
  if (validated.context?.teamLevel) {
    lines.push(`Team level: ${validated.context.teamLevel}`);
  }
  if (validated.context?.space) {
    lines.push(`Space: ${validated.context.space}`);
  }
  if (validated.context?.methodologyTags?.length) {
    lines.push(`Methodology: ${validated.context.methodologyTags.join(", ")}`);
  }

  return truncateNote(lines.join("\n"), LIMITS.coachNotesMax);
}

function buildSessionBuilderHandoffFromTrainingBrief(input) {
  const validated = validateTrainingBriefInput(input);
  const contextIncluded = Boolean(validated.context);

  return {
    sport: validated.sport,
    ageBand: validated.ageBand,
    durationMin: validated.durationMinutes,
    theme: buildTheme(validated),
    sessionMode: "full_session",
    coachNotes: buildCoachNotes(validated),
    equipment: validated.availableEquipment,
    handoffMeta: {
      ...HANDOFF_META,
      contextIncluded,
    },
  };
}

module.exports = {
  buildSessionBuilderHandoffFromTrainingBrief,
  LIMITS,
};
