'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { technologies } from '@/data/technologies';

function FlagBR() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" className="rounded-sm flex-shrink-0">
      <rect width="22" height="16" fill="#009C3B" />
      <polygon points="11,1.4 20.6,8 11,14.6 1.4,8" fill="#FFDF00" />
      <circle cx="11" cy="8" r="3.8" fill="#002776" />
    </svg>
  );
}
function FlagUS() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" className="rounded-sm flex-shrink-0">
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
        <rect key={i} x="0" y={i * 16/13} width="22" height={16/13} fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
      ))}
      <rect x="0" y="0" width="8.8" height="8.6" fill="#3C3B6E" />
    </svg>
  );
}
function FlagES() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" className="rounded-sm flex-shrink-0">
      <rect width="22" height="16" fill="#c60b1e" />
      <rect y="4" width="22" height="8" fill="#ffc400" />
    </svg>
  );
}
function FlagFR() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" className="rounded-sm flex-shrink-0">
      <rect width="7.3" height="16" fill="#002395" />
      <rect x="7.3" width="7.4" height="16" fill="#FFFFFF" />
      <rect x="14.7" width="7.3" height="16" fill="#ED2939" />
    </svg>
  );
}

const levelColors: Record<string, string> = {
  native: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  C1:     'bg-blue-200 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
  B1:     'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400',
  A2:     'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
};

export function AboutSection() {
  const t = useTranslations('about');
  const tl = useTranslations('languages');

  const doubled = [...technologies, ...technologies];

  const spokenLanguages = [
    { nameKey: 'portuguese' as const, country: 'BR',  Flag: FlagBR, levelKey: 'native', level: tl('native') },
    { nameKey: 'english'    as const, country: 'USA', Flag: FlagUS, levelKey: 'C1',     level: 'C1' },
    { nameKey: 'spanish'    as const, country: 'ES',  Flag: FlagES, levelKey: 'B1',     level: 'B1' },
    { nameKey: 'french'     as const, country: 'FR',  Flag: FlagFR, levelKey: 'A2',     level: 'A2' },
  ];

  return (
    <section id="about" className="bg-slate-200 dark:bg-[#13131f] py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-start">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 min-w-0 w-full overflow-hidden"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-5">
              {t('title')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-4">{t('subtitle')}</p>
            <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-3">{t('body')}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mb-8">{t('cta')}</p>

            <a
              href="https://www.linkedin.com/in/william-douglas-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-medium transition-colors"
            >
              <Image src="/images/resume_icon.png" alt="" width={18} height={18} className="object-contain brightness-0 invert" />
              {t('resume')}
            </a>

            {/* Technologies carousel */}
            <div className="mt-10 md:mt-14">
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-5">{t('tools')}</p>
              <div className="overflow-hidden relative">
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-slate-200 dark:from-[#13131f] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-slate-200 dark:from-[#13131f] to-transparent pointer-events-none" />

                <div
                  className="flex gap-3 w-max"
                  style={{ animation: 'marquee 28s linear infinite' }}
                >
                  {doubled.map((tech, idx) => (
                    <div
                      key={`${tech.name}-${idx}`}
                      className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white dark:bg-[#1a1a30] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 transition-colors w-[74px] h-[80px] flex-shrink-0"
                    >
                      <Image src={tech.icon} alt={tech.name} width={32} height={32} className="object-contain flex-shrink-0" />
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center leading-tight">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mt-8">
                <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">{tl('title')}</p>
                <div className="flex flex-wrap gap-2">
                  {spokenLanguages.map(({ nameKey, country, Flag, levelKey, level }) => (
                    <div
                      key={nameKey}
                      className="flex items-center gap-2.5 bg-white dark:bg-[#1a1a30] rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 hover:border-blue-600 dark:hover:border-blue-500 transition-colors"
                    >
                      <Flag />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white text-xs leading-tight">{tl(nameKey)}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">{country}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${levelColors[levelKey]}`}>
                        {level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photo side — constrained on mobile, full size on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-[200px] sm:max-w-[240px] mx-auto lg:w-72 lg:max-w-none lg:mx-0 flex-shrink-0 self-start"
          >
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-blue-700 rounded-2xl" />
              <Image
                src="/images/image_profile.jpg"
                alt="William Douglas"
                width={288}
                height={384}
                className="relative rounded-2xl object-cover w-full shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
