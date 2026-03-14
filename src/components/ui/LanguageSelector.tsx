'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

function FlagUS() {
  return (
    <svg width="18" height="13" viewBox="0 0 18 13" className="rounded-sm flex-shrink-0">
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
        <rect key={i} x="0" y={i} width="18" height="1" fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
      ))}
      <rect x="0" y="0" width="7" height="7" fill="#3C3B6E" />
    </svg>
  );
}

function FlagES() {
  return (
    <svg width="18" height="13" viewBox="0 0 18 13" className="rounded-sm flex-shrink-0">
      <rect x="0" y="0" width="18" height="13" fill="#c60b1e" />
      <rect x="0" y="3.25" width="18" height="6.5" fill="#ffc400" />
    </svg>
  );
}

function FlagFR() {
  return (
    <svg width="18" height="13" viewBox="0 0 18 13" className="rounded-sm flex-shrink-0">
      <rect x="0" y="0" width="6" height="13" fill="#002395" />
      <rect x="6" y="0" width="6" height="13" fill="#FFFFFF" />
      <rect x="12" y="0" width="6" height="13" fill="#ED2939" />
    </svg>
  );
}

const languages = [
  { code: 'pt', label: 'PT', flagType: 'image' as const, flagSrc: '/images/brazil_flag.png' },
  { code: 'en', label: 'EN', flagType: 'us' as const },
  { code: 'es', label: 'ES', flagType: 'es' as const },
  { code: 'fr', label: 'FR', flagType: 'fr' as const },
];

function Flag({ lang }: { lang: typeof languages[number] }) {
  if (lang.flagType === 'image') {
    return <Image src={lang.flagSrc!} alt={lang.label} width={18} height={13} className="rounded-sm object-cover flex-shrink-0" />;
  }
  if (lang.flagType === 'us') return <FlagUS />;
  if (lang.flagType === 'es') return <FlagES />;
  return <FlagFR />;
}

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find(l => l.code === locale) ?? languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const changeLocale = (code: string) => {
    const segments = pathname.split('/');
    segments[1] = code;
    router.push(segments.join('/') || '/');
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Flag lang={current} />
        <span className="font-medium">{current.label}</span>
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg overflow-hidden z-50 min-w-[110px]">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLocale(lang.code)}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer ${
                lang.code === locale
                  ? 'text-blue-800 dark:text-blue-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Flag lang={lang} />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
