export default function RecentUpload() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-7 text-center text-xl font-semibold text-zinc-900 dark:text-white">Recent upload</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="card-animate overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1.5 hover:shadow-deep dark:border-zinc-800 dark:bg-zinc-900">
          <img
            src="https://images.pexels.com/photos/8112552/pexels-photo-8112552.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Manga Cover"
            className="h-56 w-full object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">The Eternal Bond</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Chapter 4: The Untold Truth</p>
          </div>
        </div>
      </div>
    </section>
  );
}
