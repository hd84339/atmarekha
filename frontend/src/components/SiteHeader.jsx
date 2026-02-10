import { useState, useEffect } from 'react';

export default function SiteHeader({ onToggleNav }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#index');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    // Initial check
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navLinks = [
    { href: '#index', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#latest', label: 'Latest Updates' },
    { href: '#contact', label: 'Contact' },
    { href: '#help', label: 'Help' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-8 py-4 transition-all duration-500 ${isScrolled
        ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-lg border-b border-zinc-200/50 dark:border-zinc-800/50 py-3'
        : 'bg-transparent border-transparent py-5'
        }`}
    >
      <a href="#index" className="group flex items-center gap-3">
        {/* Custom SVG Logo */}
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-blue-500/40">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white drop-shadow-md">
            <path d="M12 2L2 19H5L7 15M22 19H19L17 15M7 15L12 4L17 15M7 15H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 2L12 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100 mix-blend-overlay"></div>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-none">
            Atma Rekha
          </span>
          <span className="text-[10px] font-medium tracking-widest text-zinc-400 uppercase leading-none mt-0.5 group-hover:text-zinc-500 transition-colors">
            Manga Platform
          </span>
        </div>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/50 dark:bg-zinc-900/50 p-1.5 backdrop-blur-sm border border-white/20 dark:border-zinc-800/50 shadow-sm">
        {navLinks.map((link) => {
          const isActive = activeHash === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive
                ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-800 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
                }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <button
        onClick={onToggleNav}
        className="text-2xl text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white md:hidden"
      >
        <i className="fas fa-bars"></i>
      </button>
    </header>
  );
}
