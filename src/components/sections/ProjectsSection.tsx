'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { projects, type Project } from '@/data/projects';
import { ChevronLeft, ChevronRight, Plus, FolderOpen } from 'lucide-react';

const INITIAL_COUNT = 3;

// Actual PNG dimensions: Samsung 1866x3835, iPhone 1627x3328
const SAMSUNG_RATIO = 1866 / 3835;  // width/height ≈ 0.4866
const IPHONE_RATIO  = 1627 / 3328;  // width/height ≈ 0.4888

function PhoneMockup({
  images,
  current,
  direction,
  title,
  frameImage,
  label,
  wRatio,
  cornerRadius,
}: {
  images: string[];
  current: number;
  direction: number;
  title: string;
  frameImage: string;
  label: string;
  wRatio: number;
  cornerRadius: string;
}) {
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%' }),
  };

  return (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
      {/* Responsive width: compact on mobile, full-size on md+ */}
      <div
        className="relative w-[22vw] max-w-[112px] min-w-[70px] overflow-hidden"
        style={{ aspectRatio: `${wRatio}`, borderRadius: cornerRadius }}
      >
        {/* App screenshots behind the phone frame */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={images[current]}
                alt={title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phone frame overlay — transparent screen area lets app content show through */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameImage}
          alt=""
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        />
      </div>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const even = index % 2 === 0;

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrent(i => (i + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [project.images.length]);

  const prev = () => { setDirection(-1); setCurrent(i => (i - 1 + project.images.length) % project.images.length); };
  const next = () => { setDirection(1);  setCurrent(i => (i + 1) % project.images.length); };

  const title       = project.title[locale]       ?? project.title['pt'];
  const description = project.description[locale] ?? project.description['pt'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a2e] hover:border-blue-500 dark:hover:border-blue-600 transition-colors shadow-sm"
    >
      {/* Phones area */}
      <div
        className={`md:w-[42%] bg-slate-100 dark:bg-[#374151] flex flex-col items-center justify-center p-3 sm:p-6 gap-3 sm:gap-4 ${
          even ? 'md:order-first' : 'md:order-last'
        }`}
      >
        <div className="flex gap-3 sm:gap-5 items-end justify-center">
          <PhoneMockup
            images={project.images}
            current={current}
            direction={direction}
            title={title}
            frameImage="/images/samsung_screen.png"
            label="Android"
            wRatio={SAMSUNG_RATIO}
            cornerRadius="8px"
          />
          <PhoneMockup
            images={project.images}
            current={current}
            direction={direction}
            title={title}
            frameImage="/images/iphone_screen.png"
            label="iOS"
            wRatio={IPHONE_RATIO}
            cornerRadius="18px"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button onClick={prev} className="w-7 h-7 rounded-full bg-white dark:bg-slate-700 shadow flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors cursor-pointer">
            <ChevronLeft size={14} />
          </button>
          <div className="flex gap-1.5">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${i === current ? 'bg-blue-700' : 'bg-slate-300 dark:bg-slate-600'}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-7 h-7 rounded-full bg-white dark:bg-slate-700 shadow flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors cursor-pointer">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 bg-white dark:bg-[#1f2937] p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tools.map(tool => (
            <span key={tool} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const t = useTranslations('projects');
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="bg-slate-200 dark:bg-[#030712] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-12">
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
          <div className="absolute left-5 top-2 bottom-2 w-px border-l-2 border-dashed border-slate-300 dark:border-slate-600" />

          <div className="space-y-6">
            {displayed.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-3 sm:gap-6"
              >
                <div className="relative w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-900/30 border-2 border-blue-700 flex items-center justify-center flex-shrink-0 z-10 mt-3 overflow-hidden">
                  <FolderOpen size={18} className="text-blue-700 dark:text-blue-400 absolute" />
                  <Image
                    src={project.icon}
                    alt={project.title['pt']}
                    width={24}
                    height={24}
                    className="object-contain rounded-full relative z-10"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="flex-1">
                  <ProjectCard project={project} index={i} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {!showAll && projects.length > INITIAL_COUNT && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-medium transition-colors cursor-pointer"
            >
              <Plus size={18} />
              {t('seeAll')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
