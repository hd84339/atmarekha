export default function HeroSection({ heroBg, onOpenComingSoon }) {
  return (
    <section
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center"
      style={{ backgroundImage: heroBg, backgroundSize: 'cover', backgroundPosition: 'center', marginTop: 72 }}
    >
      <h1 className="hero-title text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl">
        Atma Rekha
      </h1>
      <p className="hero-sub mt-3 max-w-2xl text-base text-slate-700 dark:text-zinc-200 md:text-lg">
        In an age when divine light has long faded, two destined souls rise against the return of the ancient Asurs.
      </p>
      <p className="mt-4 text-sm text-slate-600 dark:text-zinc-300">
        <span className="font-semibold text-slate-900 dark:text-white">We are working on this</span>
        <br />
        coming soon
      </p>

    </section>
  );
}
