import React from 'react';
import { Brain, Menu } from 'lucide-react';

const HeaderNav = () => {
  const [open, setOpen] = React.useState(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#models', label: 'Models' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <Brain className="w-6 h-6" />
            </div>
            <div className="">
              <p className="text-lg font-semibold tracking-tight text-slate-900">BrainSightAI</p>
              <p className="text-[11px] uppercase tracking-widest text-slate-500">Precision Neuro Imaging</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-blue-700 transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#upload" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 transition-colors">
              Upload MRI
            </a>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#upload"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
                onClick={() => setOpen(false)}
              >
                Upload MRI
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderNav;
