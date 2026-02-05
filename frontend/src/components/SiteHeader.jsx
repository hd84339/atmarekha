export default function SiteHeader({ onToggleNav }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] flex items-center justify-between border-b border-zinc-200 bg-white/90 px-8 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <a href="#index" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Atma Rekha
      </a>
      <div className="relative mx-10 hidden w-full max-w-2xl flex-1 md:block">
        <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400"></i>
        <input
          className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-12 pr-4 text-base text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
          placeholder="Search for Indian Manga, Genres, or Authors..."
        />
      </div>
      <button onClick={onToggleNav} className="text-2xl text-zinc-400 transition hover:text-zinc-900 dark:hover:text-white">
        <i className="fas fa-bars"></i>
      </button>
    </header>
  );
}
