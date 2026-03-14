'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import { education } from '@/data/education';

export function EducationSection() {
  const t = useTranslations('education');

  return (
    <section id="education" className="bg-slate-100 dark:bg-[#0d0e1b] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">{t('title')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />

          <div className="space-y-5">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-3 sm:gap-6"
              >
                {/* Timeline icon — institution logo with GraduationCap fallback */}
                <div className="relative w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-900/30 border-2 border-blue-700 flex items-center justify-center flex-shrink-0 z-10 mt-1 overflow-hidden">
                  <GraduationCap size={18} className="text-blue-700 dark:text-blue-400 absolute" />
                  <Image
                    src={edu.logo}
                    alt={edu.institution}
                    width={24}
                    height={24}
                    className="object-contain rounded-full relative z-10"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                <div className="flex-1 bg-white dark:bg-[#1f2937] rounded-2xl border border-slate-200 dark:border-slate-700 p-3 sm:p-5 hover:border-blue-500 dark:hover:border-blue-600 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{edu.institution}</h3>
                      <p className="text-blue-800 dark:text-blue-400 text-sm font-medium">{edu.field}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{edu.degree}</p>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap self-start">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
