export default function ReadingPage({
  chapters,
  displayRating,
  isSaved,
  onOpenRating,
  onToggleSave,
  onSortToggle,
  onOpenComments,
  onBack
}) {
  return (
    <main className="pt-16">
      <div className="sticky top-0 z-50 flex items-center gap-5 border-b border-zinc-200 bg-white/95 px-5 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <button className="text-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white" onClick={onBack}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <img
          src="https://images.pexels.com/photos/8112552/pexels-photo-8112552.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Manga"
          className="h-16 w-12 rounded-lg border border-zinc-200 object-cover dark:border-zinc-800"
        />
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">The Eternal Bond</h1>
          <div className="mt-1 flex gap-4">
            <button
              onClick={onOpenRating}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <i className="fa-solid fa-star text-yellow-400"></i>
              <span>{displayRating}</span>
            </button>
            <button
              onClick={onToggleSave}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <i className={isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-6">
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
          <span className="font-semibold">8 Chapters</span>
          <button
            onClick={onSortToggle}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <i className="fa-solid fa-sort"></i>
            Sort
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {chapters.map((ch) => (
            <div
              key={ch.num}
              className="grid grid-cols-[64px_1fr_auto_56px] items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <a href={`#reader?ch=${ch.num.replace('Ch. ', '')}`} className="contents">
                <span className="font-bold text-zinc-900 dark:text-white">{ch.num}</span>
                <span className="truncate text-zinc-700 dark:text-zinc-200">{ch.title}</span>
                <span className="text-xs text-zinc-400">{ch.date}</span>
              </a>
              <button
                className="rounded-full p-2 text-zinc-400 transition hover:text-zinc-900 dark:hover:text-white"
                onClick={() => onOpenComments(ch.num)}
              >
                <i className="fa-regular fa-comment-dots"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
