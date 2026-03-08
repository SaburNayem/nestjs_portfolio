'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains('dark');
    root.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-cyan/40 px-4 py-2 text-sm font-semibold"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
