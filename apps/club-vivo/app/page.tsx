import Link from "next/link";

export default function Home() {
  return (
    <main className="px-6 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <section className="club-vivo-shell rounded-[2rem] border p-8 backdrop-blur sm:p-12">
          <div className="club-vivo-badge mb-8 inline-flex rounded-full px-3 py-1 text-sm font-medium tracking-wide uppercase">
            Club Vivo
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Welcome to Club Vivo
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Where sports organizations start.
            </p>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Plan practices, organize teams, and give coaches a cleaner way to help athletes
              learn, compete, and enjoy the game.
            </p>

            <p className="mt-8 text-sm font-medium uppercase tracking-wide text-teal-800">
              Current product
            </p>

            <article className="mt-4 max-w-2xl rounded-3xl border border-slate-200 bg-white/75 p-5">
              <h2 className="text-lg font-semibold text-teal-800">Coach Workspace</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Start as a coach by creating your team, building game-like sessions, managing
                equipment context, and turning practice ideas into activities that help athletes
                learn, play, and grow.
              </p>
              <Link
                href="/login/start?mode=signup"
                prefetch={false}
                className="mt-5 inline-flex rounded-full bg-teal-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-800"
              >
                Sign up here
              </Link>
            </article>

            <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login/start"
                prefetch={false}
                className="font-medium text-teal-800 transition hover:text-teal-900 hover:underline"
              >
                Sign in
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
