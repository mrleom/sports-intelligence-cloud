"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { type SessionBuilderMode } from "../../../../components/coach/ModeSelector";
import { type SessionEnvironmentOption } from "../../../../components/coach/SessionBuilderTopBlock";
import {
  TeamSelector,
  type WorkspaceTeamOption
} from "../../../../components/coach/TeamSelector";
import { type TrainingBriefCandidateFormState } from "./session-new-flow";

type DaysUntilNextMatch =
  | "6_plus_days"
  | "4_5_days"
  | "3_days"
  | "1_2_days"
  | "congested";

type RecommendationKind = "session" | "activity";

type PrescriptionRecommendation = {
  kind: RecommendationKind;
  title: string;
  focus: string;
  why: string;
  volume: string;
  durationMin: string;
  mode: SessionBuilderMode;
};

type MatchToMatchPrescriptionDraftProps = {
  teams: WorkspaceTeamOption[];
  selectedTeamId: string;
  onTeamChange: (teamId: string) => void;
  environment: string;
  environmentOptions: SessionEnvironmentOption[];
  onEnvironmentChange: (value: string) => void;
  candidateState: TrainingBriefCandidateFormState;
  candidateFormAction: (formData: FormData) => void;
  onUseOption: (values: {
    objective: string;
    constraints: string;
    environment: string;
    durationMin: string;
    mode: SessionBuilderMode;
  }) => void;
};

function DraftCandidateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex rounded-full border border-transparent bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Drafting candidate..." : "Draft prescription options"}
    </button>
  );
}

const RECOMMENDATION_LIBRARY: PrescriptionRecommendation[] = [
  {
    kind: "session",
    title: "Session option A",
    focus: "Stabilize transition defending and protect central space",
    why: "Recent match evidence can be converted into clearer recovery roles and compact spacing.",
    volume: "Full 60-minute session with moderate-to-high decision load.",
    durationMin: "60",
    mode: "full_session"
  },
  {
    kind: "session",
    title: "Session option B",
    focus: "Improve first pass after regain and attack before the opponent resets",
    why: "A full session allows the team to rehearse regain moments through multiple activity shapes.",
    volume: "Full 60-minute session with progressive intensity and a competitive close.",
    durationMin: "60",
    mode: "full_session"
  },
  {
    kind: "session",
    title: "Session option C",
    focus: "Manage match rhythm with compact defending and controlled forward play",
    why: "The longer format supports team-shape rehearsal without rushing the tactical detail.",
    volume: "Full 60-minute session with controlled load and game-realistic decisions.",
    durationMin: "60",
    mode: "full_session"
  },
  {
    kind: "activity",
    title: "Activity option A",
    focus: "Regain and play forward",
    why: "It isolates the first decision after a key match moment.",
    volume: "Focused 20-minute activity with repeated high-quality reps.",
    durationMin: "20",
    mode: "quick_drill"
  },
  {
    kind: "activity",
    title: "Activity option B",
    focus: "Recover central space",
    why: "It keeps the tactical correction clear while limiting overall load.",
    volume: "Focused 20-minute activity with short work bouts and coaching breaks.",
    durationMin: "20",
    mode: "quick_drill"
  },
  {
    kind: "activity",
    title: "Activity option C",
    focus: "Pressing trigger gates",
    why: "It connects opponent cues to simple collective actions.",
    volume: "Focused 20-minute activity with moderate intensity.",
    durationMin: "20",
    mode: "quick_drill"
  },
  {
    kind: "activity",
    title: "Activity option D",
    focus: "First pass race",
    why: "It creates quick repetition around the evidence without adding a full session load.",
    volume: "Low-to-moderate 20-minute drill with frequent rotation.",
    durationMin: "20",
    mode: "quick_drill"
  },
  {
    kind: "activity",
    title: "Activity option E",
    focus: "Compact block to counter",
    why: "It gives the team a tactical reminder that can fit close to match day.",
    volume: "Low-volume 20-minute tactical activity.",
    durationMin: "20",
    mode: "quick_drill"
  },
  {
    kind: "activity",
    title: "Activity option F",
    focus: "Directional transition game",
    why: "It keeps the next-match idea alive through a small, controlled game.",
    volume: "Low-volume 20-minute activity with managed intensity.",
    durationMin: "20",
    mode: "quick_drill"
  }
];

function normalizeDraftText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function getDaysUntilNextMatchLabel(value: DaysUntilNextMatch) {
  switch (value) {
    case "6_plus_days":
      return "Next match in 6+ days";
    case "4_5_days":
      return "Next match in 4-5 days";
    case "3_days":
      return "Next match in 3 days";
    case "1_2_days":
      return "Next match in 1-2 days";
    case "congested":
      return "Tournament / congested schedule";
  }
}

function getDurationMinutesForTimeline(value: DaysUntilNextMatch) {
  switch (value) {
    case "6_plus_days":
      return 75;
    case "4_5_days":
      return 60;
    case "3_days":
      return 45;
    case "1_2_days":
    case "congested":
      return 30;
  }
}

function buildEvidenceContext({
  daysUntilNextMatch,
  observations,
  tacticalNotes,
  coachNotes,
  environment
}: {
  daysUntilNextMatch: DaysUntilNextMatch;
  observations: string;
  tacticalNotes: string;
  coachNotes: string;
  environment: string;
}) {
  const sections = [
    ["Days until next match", getDaysUntilNextMatchLabel(daysUntilNextMatch)],
    ["Last match observations / performance evidence", observations],
    ["Next opponent / tactical notes", tacticalNotes],
    ["Coach notes", coachNotes],
    ["Environment", environment]
  ]
    .map(([label, value]) => {
      const normalizedValue = normalizeDraftText(value);
      return normalizedValue ? `${label}: ${normalizedValue}` : "";
    })
    .filter(Boolean);

  return sections.join("\n");
}

function getRecommendations(daysUntilNextMatch: DaysUntilNextMatch) {
  const sessions = RECOMMENDATION_LIBRARY.filter((option) => option.kind === "session");
  const activities = RECOMMENDATION_LIBRARY.filter((option) => option.kind === "activity");

  switch (daysUntilNextMatch) {
    case "6_plus_days":
      return sessions.slice(0, 3);
    case "4_5_days":
      return [...sessions.slice(0, 2), ...activities.slice(0, 3)];
    case "3_days":
      return [sessions[0], ...activities.slice(0, 4)];
    case "1_2_days":
      return activities.map((option) => ({
        ...option,
        title: option.title.replace("Activity", "Low-volume activity"),
        volume: "Low-volume 20-minute drill/activity with managed intensity."
      }));
    case "congested":
      return activities.map((option) => ({
        ...option,
        title: option.title.replace("Activity", "Recovery/tactical activity"),
        volume: "Low-volume tactical/recovery activity with controlled physical load."
      }));
  }
}

function buildHandoffNotes({
  context,
  recommendation
}: {
  context: string;
  recommendation: PrescriptionRecommendation;
}) {
  const sections = [
    context,
    `Recommendation: ${recommendation.title}`,
    `Recommended focus: ${recommendation.focus}`,
    `Why this matters: ${recommendation.why}`,
    `Suggested volume/intensity: ${recommendation.volume}`,
    "Suggested equipment: Use saved equipment profile"
  ].filter(Boolean);

  return sections.join("\n");
}

export function MatchToMatchPrescriptionDraft({
  teams,
  selectedTeamId,
  onTeamChange,
  environment,
  environmentOptions,
  onEnvironmentChange,
  candidateState,
  candidateFormAction,
  onUseOption
}: MatchToMatchPrescriptionDraftProps) {
  const [daysUntilNextMatch, setDaysUntilNextMatch] =
    useState<DaysUntilNextMatch>("6_plus_days");
  const [observations, setObservations] = useState("");
  const [tacticalNotes, setTacticalNotes] = useState("");
  const [coachNotes, setCoachNotes] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const evidenceContext = buildEvidenceContext({
    daysUntilNextMatch,
    observations,
    tacticalNotes,
    coachNotes,
    environment
  });
  const recommendations = getRecommendations(daysUntilNextMatch);
  const selectedTeam = teams.find((team) => team.id === selectedTeamId);
  const environmentLabel =
    environmentOptions.find((option) => option.value === environment)?.label || environment;
  const strongestRecommendation = recommendations[0];
  const shouldUseLocalRecommendationObjective =
    !normalizeDraftText(observations) && !normalizeDraftText(tacticalNotes);
  const candidate = candidateState.candidate;

  return (
    <section className="grid gap-6">
      <form action={candidateFormAction} className="rounded-3xl border border-slate-200 bg-white/70 p-5">
        <input type="hidden" name="sport" value="soccer" />
        <input type="hidden" name="selectedTeamId" value={selectedTeamId} />
        <input type="hidden" name="ageBand" value={selectedTeam?.ageBand || "u14"} />
        <input
          type="hidden"
          name="durationMinutes"
          value={String(getDurationMinutesForTimeline(daysUntilNextMatch))}
        />
        <input
          type="hidden"
          name="nextGameObjective"
          value={shouldUseLocalRecommendationObjective ? strongestRecommendation?.focus || "" : ""}
        />
        <input type="hidden" name="environmentLabel" value={environmentLabel} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Advanced draft path
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Match-to-Match Prescription
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              SIC recommends training options from last-match evidence and the next-match timeline.
            </p>
          </div>

          <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            Frontend draft
          </span>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Team</span>
            <TeamSelector teams={teams} value={selectedTeamId} onChange={onTeamChange} />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Days until next match</span>
            <select
              name="daysUntilNextMatch"
              value={daysUntilNextMatch}
              onChange={(event) =>
                setDaysUntilNextMatch(event.target.value as DaysUntilNextMatch)
              }
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700"
            >
              <option value="6_plus_days">Next match in 6+ days</option>
              <option value="4_5_days">Next match in 4-5 days</option>
              <option value="3_days">Next match in 3 days</option>
              <option value="1_2_days">Next match in 1-2 days</option>
              <option value="congested">Tournament / congested schedule</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm text-slate-700 lg:col-span-2">
            <span className="font-medium">Environment</span>
            <select
              name="environment"
              value={environment}
              onChange={(event) => onEnvironmentChange(event.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700"
            >
              {environmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">
              Last match observations / performance evidence
            </span>
            <textarea
              name="observations"
              value={observations}
              onChange={(event) => setObservations(event.target.value)}
              className="min-h-28 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700"
              placeholder="Example: We lost central compactness after turnovers and struggled to play forward after regains."
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Next opponent / tactical notes</span>
            <textarea
              name="tacticalNotes"
              value={tacticalNotes}
              onChange={(event) => setTacticalNotes(event.target.value)}
              className="min-h-28 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700"
              placeholder="Example: Opponent presses high but leaves space behind the wide players."
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700 lg:col-span-2">
            <span className="font-medium">Coach notes</span>
            <textarea
              name="coachNotes"
              value={coachNotes}
              onChange={(event) => setCoachNotes(event.target.value)}
              className="min-h-24 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700"
              placeholder="Example: Keep load moderate and make the final activity competitive."
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-600">
            Internal candidate preview. Review before Session Builder handoff.
          </p>
          <div onClick={() => setShowPreview(true)}>
            <DraftCandidateButton />
          </div>
        </div>
        {candidateState.error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {candidateState.error}
          </p>
        ) : null}
      </form>

      {candidate ? (
        <section className="rounded-3xl border border-teal-200 bg-teal-50/50 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Internal candidate preview
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                {candidate.recommendedFocus}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{candidate.valueStatement}</p>
            </div>
            <span className="w-fit rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-teal-800">
              Review required
            </span>
          </div>

          <section className="mt-5 rounded-3xl border border-slate-200 bg-white/80 p-5">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Why this matters
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-700">{candidate.rationale}</p>
          </section>

          <section className="mt-4 rounded-3xl border border-slate-200 bg-white/80 p-5">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              7Q football reasoning
            </h4>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {candidate.sevenQuestionReasoning.map((item) => (
                <article key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                    {item.category}
                  </p>
                  <h5 className="mt-1 text-sm font-semibold text-slate-900">{item.question}</h5>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
            <div className="grid gap-4">
              {candidate.activityRecommendations.slice(0, 1).map((recommendation) => (
                <article
                  key={`${recommendation.title}-${recommendation.durationMinutes}`}
                  className="rounded-3xl border border-slate-200 bg-white/80 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Recommended activity
                  </p>
                  <h4 className="mt-1 text-base font-semibold text-slate-900">
                    {recommendation.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {recommendation.objective}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                      {recommendation.durationMinutes} min
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                      Diagram: {recommendation.diagramRequirement.preferredContract}
                    </span>
                  </div>
                </article>
              ))}

              <article className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Success criteria / coach watch points
                </p>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                  {[...candidate.successCriteria, ...candidate.coachingEmphasis].slice(0, 5).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <h4 className="text-sm font-semibold text-slate-900">
                Review before Session Builder handoff
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                This does not create a saved prescription and does not use a public Training Brief
                API. Generate only after reviewing the handoff in Custom Build.
              </p>
              <button
                type="button"
                onClick={() =>
                  onUseOption({
                    objective: candidate.sessionBuilderHandoff.theme,
                    constraints: candidate.sessionBuilderHandoff.coachNotes,
                    environment,
                    durationMin: String(candidate.sessionBuilderHandoff.durationMin),
                    mode: candidate.sessionBuilderHandoff.sessionMode
                  })
                }
                className="mt-4 inline-flex rounded-full border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Review in Custom Build
              </button>
            </aside>
          </div>
        </section>
      ) : null}

      {showPreview && !candidate ? (
        <section className="rounded-3xl border border-slate-200 bg-white/70 p-5">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Draft options for {getDaysUntilNextMatchLabel(daysUntilNextMatch)}
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Draft preview only. Full prescription logic will be wired later.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {recommendations.map((recommendation) => (
              <article
                key={`${recommendation.title}-${recommendation.focus}`}
                className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <div>
                  <h4 className="text-base font-semibold text-slate-900">
                    {recommendation.title}
                  </h4>
                </div>

                <div className="grid gap-3">
                  <section>
                    <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Recommended focus
                    </h5>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {recommendation.focus}
                    </p>
                  </section>

                  <section>
                    <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Why this matters
                    </h5>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {recommendation.why}
                    </p>
                  </section>

                  <section>
                    <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Suggested volume/intensity
                    </h5>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {recommendation.volume}
                    </p>
                  </section>

                  <section>
                    <h5 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Suggested equipment
                    </h5>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      Use saved equipment profile
                    </p>
                  </section>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onUseOption({
                      objective: recommendation.focus,
                      constraints: buildHandoffNotes({
                        context: evidenceContext,
                        recommendation
                      }),
                      environment,
                      durationMin: recommendation.durationMin,
                      mode: recommendation.mode
                    })
                  }
                  className="mt-auto inline-flex w-fit rounded-full border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Use this in Custom Build
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
