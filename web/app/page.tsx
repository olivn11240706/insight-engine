export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50 px-4 py-10 font-sans">
      <div className="max-w-xl rounded-3xl border border-amber-100 bg-white/80 p-8 text-center shadow-lg shadow-amber-100 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          Insight Engine
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
          Calm, warm data prep.
        </h1>
        <p className="mt-3 text-sm text-stone-500">
          Upload CSV or Excel files, clean them with Pandas-like steps, and see
          a transparent Cleaning Log for every transformation.
        </p>
        <a
          href="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-amber-200 transition hover:bg-amber-700"
        >
          Open dashboard
        </a>
      </div>
    </main>
  );
}
