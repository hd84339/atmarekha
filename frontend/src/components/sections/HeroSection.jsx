export default function HeroSection({ heroBg, onOpenComingSoon }) {
  return (
    <section
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center"
      style={{ backgroundImage: heroBg, backgroundSize: 'cover', backgroundPosition: 'center', marginTop: 72 }}
    >
      <div className="relative z-10 max-w-4xl">
        <h1 className="hero-title text-4xl font-extrabold tracking-tight text-zinc-900 drop-shadow-sm dark:text-white md:text-7xl">
          Atma Rekha
        </h1>
        <p className="hero-sub mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-xl">
          In an age when divine light has long faded, two destined souls rise against the return of the ancient Asurs.
        </p>

        <div className="hero-cta mt-8 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Work in Progress
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Coming soon</p>
        </div>
      </div>

    </section>
  );
}
