import Link from "next/link";

import { CoachPageHeader } from "../../../components/coach/CoachPageHeader";

const WORKSPACE_AREAS = [
  {
    title: "Session Builder",
    href: "/sessions/new",
    description:
      "Build coach-ready full sessions or focused activity ideas through Custom Build. Use Full Session for a complete practice plan or Drill / Activity for a shorter coaching idea."
  },
  {
    title: "Methodology",
    href: "/methodology",
    description:
      "Review the soccer logic behind the builder today and the direction for a clearer coach methodology over time."
  },
  {
    title: "Teams",
    href: "/teams",
    description:
      "Save team context like age band, program type, and player count so the builder starts from a better coaching picture."
  },
  {
    title: "Equipment",
    href: "/equipment",
    description:
      "Define the equipment profile the builder can use when it shapes activities, constraints, and scoring options."
  },
  {
    title: "Saved Sessions",
    href: "/sessions",
    description:
      "Review saved sessions, reuse ideas, and leave feedback that can support future learning-loop interpretation."
  }
];

export default async function HomePage() {
  return (
    <div className="grid gap-6">
      <CoachPageHeader
        badge="Home"
        title="Coach Workspace"
        description="A practical planning space for coaches who need sessions, team context, equipment context, and a clear record of what worked."
      />

      <section className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Why it exists
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Make the next practice easier to plan and easier to coach.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            Coach Workspace brings the day-to-day coaching tools into one place: session
            generation, methodology notes, team context, equipment context, saved sessions, and
            feedback. The goal is not to replace a coach&apos;s judgment. It is to give coaches a
            cleaner starting point and keep useful context close to the planning work.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {WORKSPACE_AREAS.map((area) => (
          <article
            key={area.title}
            className="rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-sm"
          >
            <h3 className="text-base font-semibold text-slate-900">{area.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{area.description}</p>
            <Link
              href={area.href}
              className="mt-4 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-700 hover:text-teal-800"
            >
              Open {area.title}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
