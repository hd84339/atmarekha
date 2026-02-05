export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white px-8 py-10 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex justify-center gap-8 text-2xl text-zinc-400">
        <a
          className="transition hover:-translate-y-1 hover:text-zinc-900 dark:hover:text-white"
          href="https://www.instagram.com/amritanshorg?igsh=MXBwNnp2aWtneHN1cg=="
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          className="transition hover:-translate-y-1 hover:text-zinc-900 dark:hover:text-white"
          href="https://youtube.com/@amritanshorg?si=pnq7mvRA1PlzyHsB"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-youtube"></i>
        </a>
        <a
          className="transition hover:-translate-y-1 hover:text-zinc-900 dark:hover:text-white"
          href="https://x.com/amritansh5u"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-x-twitter"></i>
        </a>
        <a className="transition hover:-translate-y-1 hover:text-zinc-900 dark:hover:text-white" href="mailto:itsamritanshofficial@gmail.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p className="text-sm text-zinc-500">© 2026 Atma Rekha. All rights reserved.</p>
    </footer>
  );
}
