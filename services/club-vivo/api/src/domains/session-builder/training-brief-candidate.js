"use strict";

const { validateTrainingBriefInput } = require("./training-brief-validate");
const { buildSessionBuilderHandoffFromTrainingBrief } = require("./training-brief-handoff");

const LIMITS = {
  recommendedFocusMax: 120,
  rationaleMax: 500,
  recommendationTitleMax: 80,
  recommendationObjectiveMax: 160,
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

function buildRecommendedFocus(validatedInput, sessionBuilderHandoff) {
  return truncate(validatedInput.nextGameObjective || sessionBuilderHandoff.theme, LIMITS.recommendedFocusMax);
}

function buildRationale(validatedInput) {
  const base = `Based on the match evidence, ${validatedInput.evidenceSummary}`;
  const withObjective = validatedInput.nextGameObjective
    ? `${base} The next session should help the coach review and train: ${validatedInput.nextGameObjective}.`
    : `${base} The next session should help the coach review and train the highest-priority issue.`;

  return truncate(withObjective, LIMITS.rationaleMax);
}

function buildActivityRecommendation(recommendedFocus, validatedInput) {
  const durationMinutes = Math.max(15, Math.min(30, validatedInput.durationMinutes));

  return {
    title: truncate(recommendedFocus, LIMITS.recommendationTitleMax),
    objective: truncate(recommendedFocus, LIMITS.recommendationObjectiveMax),
    durationMinutes,
    diagramRequirement: {
      required: true,
      reason: "main_activity_recommendation",
      preferredContract: "DiagramSequence",
    },
    reviewRequired: true,
  };
}

function buildTrainingBriefCandidate(input) {
  const validatedInput = validateTrainingBriefInput(input);
  const sessionBuilderHandoff = buildSessionBuilderHandoffFromTrainingBrief(input);
  const recommendedFocus = buildRecommendedFocus(validatedInput, sessionBuilderHandoff);

  return {
    candidateType: "training_brief_candidate",
    version: "v1",
    status: "draft",
    source: "training_brief_session_builder_intake",
    requiresCoachReview: true,
    validatedInput,
    recommendedFocus,
    rationale: buildRationale(validatedInput),
    activityRecommendations: [buildActivityRecommendation(recommendedFocus, validatedInput)],
    sessionBuilderHandoff,
    candidateMeta: {
      createdBy: "system",
      persistence: "not_persisted",
      nextStep: "review_in_session_builder",
      handoffReady: true,
    },
  };
}

module.exports = {
  buildTrainingBriefCandidate,
  LIMITS,
};
