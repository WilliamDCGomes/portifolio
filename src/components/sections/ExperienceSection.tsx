'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { experiences } from '@/data/experience';
import { Plus, Building2 } from 'lucide-react';

interface ExperienceTranslated {
  title: string;
  period: string;
  duration: string;
  type: string;
  observation?: string;
  responsibilities: string[];
}

const INITIAL_COUNT = 3;

export function ExperienceSection() {
  const t = useTranslations('experience');
  const [showAll, setShowAll] = useState(false);

  const translatedItems = t.raw('items') as ExperienceTranslated[];
  const allItems = experiences.map((exp, i) => ({ ...exp, ...translatedItems[i] }));
  const displayed = showAll ? allItems : allItems.slice(0, INITIAL_COUNT);

  return (
    <section id="experience" className="bg-slate-100 dark:bg-[#0d0e1b] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">{t('title')}</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />

          <div className="space-y-6">
            {displayed.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-3 sm:gap-6"
              >
                {/* Dot */}
                <div className="relative w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-900/30 border-2 border-blue-700 flex items-center justify-center flex-shrink-0 z-10 mt-1 overflow-hidden">
                  <Building2 size={18} className="text-blue-700 dark:text-blue-400 absolute" />
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={24}
                    height={24}
                    className="object-contain rounded-full relative z-10"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 bg-white dark:bg-[#1f2937] rounded-2xl border border-slate-200 dark:border-slate-700 p-3 sm:p-5 hover:border-blue-500 dark:hover:border-blue-600 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{exp.company}</h3>
                      <p className="text-blue-800 dark:text-blue-400 text-sm font-medium">{exp.title}</p>
                      {exp.observation && (
                        <p className="text-slate-400 dark:text-slate-500 text-xs italic mt-0.5">{exp.observation}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-left sm:text-right">
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {exp.period}
                      </span>
                      <p className="text-xs text-blue-700 dark:text-blue-400 mt-1 font-medium">{exp.duration}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{exp.type}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">{t('responsibilities')}</p>
                    <ul className="space-y-1">
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2 leading-snug">
                          <span className="text-blue-700 flex-shrink-0 mt-0.5">▪</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">{t('tools')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tools.map(tool => (
                        <span key={tool} className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {!showAll && allItems.length > INITIAL_COUNT && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-medium transition-colors cursor-pointer"
              >
                <Plus size={18} />
                {t('seeAll')}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
