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

function includesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function getWeakSide(text) {
  if (/\b(left\s+side|left\s+flank|left\s+channel|left\s+back)\b.*\b(weak|vulnerable|open|slow|space)\b/.test(text)) {
    return "left side";
  }
  if (/\b(weak|vulnerable|open|slow|space)\b.*\b(left\s+side|left\s+flank|left\s+channel|left\s+back)\b/.test(text)) {
    return "left side";
  }
  if (/\b(right\s+side|right\s+flank|right\s+channel|right\s+back)\b.*\b(weak|vulnerable|open|slow|space)\b/.test(text)) {
    return "right side";
  }
  if (/\b(weak|vulnerable|open|slow|space)\b.*\b(right\s+side|right\s+flank|right\s+channel|right\s+back)\b/.test(text)) {
    return "right side";
  }

  return undefined;
}

function classifyEvidence(validatedInput) {
  const text = compactText(
    [
      validatedInput.evidenceSummary,
      validatedInput.coachNotes,
      validatedInput.context?.space,
      ...(validatedInput.context?.methodologyTags || []),
    ].join(" ")
  ).toLowerCase();
  const scoringProblem = includesAny(text, [
    /\bscore\b/,
    /\bscoring\b/,
    /\bgoals?\b/,
    /\bfinish(?:ing)?\b/,
    /\bshoot(?:ing)?\b/,
    /\bchance(?:s)?\b/,
    /\bconvert(?:ing)?\b/,
  ]);
  const weakSide = getWeakSide(text);
  const competitive = includesAny(text, [/\bcompetitive\b/, /\bgame[- ]?like\b/, /\bmatch[- ]?realistic\b/]);
  const defensiveTransition = includesAny(text, [
    /\btransition defending\b/,
    /\bdefensive transition\b/,
    /\bcounterattacks?\b/,
    /\bprotect central\b/,
    /\bcentral compactness\b/,
  ]);

  if (scoringProblem && weakSide) {
    return {
      intent: "attacking_chance_creation",
      weakSide,
      competitive,
      recommendedFocus: `Create and finish chances by attacking the opponent's weak ${weakSide}`,
      activityTitle: "Weak-Side Chance Creation Game",
      activityObjective: `Create game-like chances through the opponent's weak ${weakSide} and finish attacks under pressure.`,
      valueStatement:
        `This is valuable because the last-match problem is chance conversion, and the next opponent gives a clear attacking target on the ${weakSide}.`,
      successCriteria: [
        `Players identify the weak ${weakSide} early and attack it with purpose.`,
        "The team creates repeatable final-third entries before shooting.",
        "Finishing actions happen at game speed with runners arriving in support.",
      ],
      coachingEmphasis: [
        "Attack the weak side quickly without forcing low-quality shots.",
        "Use width to open the lane, then arrive in the box with numbers.",
        competitive
          ? "Keep score so chance creation and finishing decisions stay game-like."
          : "Reward clear chance creation before the finish.",
      ],
    };
  }

  if (scoringProblem) {
    return {
      intent: "attacking_chance_creation",
      competitive,
      recommendedFocus: "Create better chances and finish attacks under game pressure",
      activityTitle: "Chance Creation To Finish Game",
      activityObjective: "Create higher-quality chances and finish with realistic pressure, support, and rebounds.",
      valueStatement:
        "This is valuable because the last-match problem is not only effort or possession, but turning attacks into goals.",
      successCriteria: [
        "Players create shots from cleaner central or wide-entry situations.",
        "The team attacks with support around the finisher.",
        "Finishing choices improve under pressure.",
      ],
      coachingEmphasis: [
        "Separate hopeful shots from high-quality chances.",
        "Coach the pass before the finish as much as the finish itself.",
        competitive ? "Use a scoring system that rewards chance quality and goals." : "Repeat the final action at game tempo.",
      ],
    };
  }

  if (defensiveTransition) {
    return {
      intent: "defensive_transition",
      recommendedFocus: "Stabilize transition defending and protect central space",
      activityTitle: "Compact Recovery Transition Game",
      activityObjective: "React after possession loss, pressure the ball, and recover central compactness.",
      valueStatement:
        "This is valuable because transition moments decide whether the opponent can attack before the team is organized.",
      successCriteria: [
        "First defender pressures immediately after loss.",
        "Closest support protects central space.",
        "The team recovers compactness before the opponent can counter.",
      ],
      coachingEmphasis: [
        "Pressure the ball first, then recover together.",
        "Protect central space before chasing wide.",
        "Reset shape quickly after the first recovery action.",
      ],
    };
  }

  return {
    intent: "general_training_need",
    recommendedFocus: validatedInput.nextGameObjective,
    activityTitle: "Evidence-Led Training Game",
    activityObjective: validatedInput.nextGameObjective,
    valueStatement:
      "This is valuable because it turns the match evidence into one coach-reviewable training focus before session generation.",
    successCriteria: [
      "Players can explain the training focus.",
      "The main activity recreates the match problem clearly.",
      "The coach can see improved decisions by the end of the practice.",
    ],
    coachingEmphasis: [
      "Keep the activity connected to the match evidence.",
      "Coach the decision cues, not only the technical action.",
      "Review the focus before generating the final session.",
    ],
  };
}

function buildRecommendedFocus(validatedInput, sessionBuilderHandoff, analysis) {
  return truncate(
    analysis.recommendedFocus || validatedInput.nextGameObjective || sessionBuilderHandoff.theme,
    LIMITS.recommendedFocusMax
  );
}

function buildRationale(validatedInput, analysis) {
  const base = `Based on the match evidence, ${validatedInput.evidenceSummary}`;
  const withObjective = `${base} ${analysis.valueStatement}`;

  return truncate(withObjective, LIMITS.rationaleMax);
}

function buildSevenQuestionReasoning(validatedInput, analysis, recommendedFocus) {
  const problem =
    analysis.intent === "attacking_chance_creation"
      ? "The team is not converting attacks into goals."
      : validatedInput.evidenceSummary;
  const opportunity = analysis.weakSide
    ? `The next opponent appears vulnerable on the ${analysis.weakSide}, so training should rehearse how to attack that space.`
    : "The next match gives the coach a clear reason to train the problem now.";

  return [
    {
      question: "What problem did we see?",
      answer: problem,
      category: "Ball awareness",
    },
    {
      question: "Why does it matter for the next match?",
      answer: opportunity,
      category: "Opponent awareness",
    },
    {
      question: "Where can we attack or improve?",
      answer: analysis.weakSide
        ? `Attack the opponent's weak ${analysis.weakSide} and turn entries into shots.`
        : recommendedFocus,
      category: "Space awareness",
    },
    {
      question: "Who needs to be involved?",
      answer:
        analysis.intent === "attacking_chance_creation"
          ? "Wide players, the first forward option, the finisher, and supporting runners around the box."
          : "The players closest to the match problem and the supporting teammates around them.",
      category: "Teammate awareness",
    },
    {
      question: "What behavior are we training?",
      answer:
        analysis.intent === "attacking_chance_creation"
          ? "Recognize the weak side, create a high-quality chance, and finish with game-speed decisions."
          : recommendedFocus,
      category: "Decision selection",
    },
    {
      question: "How should the activity look?",
      answer:
        analysis.intent === "attacking_chance_creation"
          ? "A competitive directional game with wide entry, runners arriving, defenders recovering, and points for goals from created chances."
          : "A game-like activity that recreates the match problem with clear constraints and coach review.",
      category: analysis.intent === "attacking_chance_creation" ? "Attacking transition awareness" : "Decision selection",
    },
    {
      question: "How will the coach know it worked?",
      answer: analysis.successCriteria.join(" "),
      category: "Decision selection",
    },
  ];
}

function buildActivityRecommendation(recommendedFocus, validatedInput, analysis) {
  const durationMinutes = Math.max(15, Math.min(30, validatedInput.durationMinutes));

  return {
    title: truncate(analysis.activityTitle || recommendedFocus, LIMITS.recommendationTitleMax),
    objective: truncate(analysis.activityObjective || recommendedFocus, LIMITS.recommendationObjectiveMax),
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
  const analysis = classifyEvidence(validatedInput);
  const effectiveInput = {
    ...validatedInput,
    ...(analysis.recommendedFocus ? { nextGameObjective: analysis.recommendedFocus } : {}),
  };
  const sessionBuilderHandoff = buildSessionBuilderHandoffFromTrainingBrief(effectiveInput);
  const recommendedFocus = buildRecommendedFocus(validatedInput, sessionBuilderHandoff, analysis);

  return {
    candidateType: "training_brief_candidate",
    version: "v1",
    status: "draft",
    source: "match_to_match_prescription",
    requiresCoachReview: true,
    validatedInput,
    recommendedFocus,
    valueStatement: analysis.valueStatement,
    rationale: buildRationale(validatedInput, analysis),
    sevenQuestionReasoning: buildSevenQuestionReasoning(validatedInput, analysis, recommendedFocus),
    successCriteria: analysis.successCriteria,
    coachingEmphasis: analysis.coachingEmphasis,
    activityRecommendations: [buildActivityRecommendation(recommendedFocus, validatedInput, analysis)],
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
