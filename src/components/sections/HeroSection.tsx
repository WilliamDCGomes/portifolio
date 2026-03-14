'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { ParticleSilhouette } from '@/components/ui/ParticleSilhouette';

const socialLinks = [
  { icon: '/images/instagram_icon.png', href: 'https://www.instagram.com/william_douglas_dev/', label: 'Instagram' },
  { icon: '/images/youtube_icon.png', href: 'https://www.youtube.com/@WilliamDouglasDev', label: 'YouTube' },
  { icon: '/images/tiktok_icon.png', href: 'https://www.tiktok.com/@william_douglas_dev', label: 'TikTok' },
  { icon: '/images/linkedin_icon.png', href: 'https://www.linkedin.com/in/william-douglas-dev/', label: 'LinkedIn' },
  { icon: '/images/github_icon.png', href: 'https://github.com/WilliamDCGomes', label: 'GitHub' },
  { icon: '/images/gmail_icon.png', href: 'mailto:canalwilliamdouglasdev@gmail.com', label: 'Gmail' },
];

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-slate-100 dark:bg-[#0d0e1b]">
      {/* Background decorations — mirroring Flutter's Stack layout */}
      {/* Layer 1: right decoration (top-right, behind) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home_background_right.png"
        alt=""
        className="absolute top-0 right-0 h-full w-auto pointer-events-none select-none opacity-20 dark:opacity-60"
      />
      {/* Layer 2: bottom decoration (bottom-center, full width) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home_background_bottom.png"
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none opacity-20 dark:opacity-60"
      />
      {/* Layer 3: top decoration (top-right, front) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home_background_top.png"
        alt=""
        className="absolute top-0 right-0 h-full w-auto pointer-events-none select-none opacity-20 dark:opacity-60"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-20">
        <div className="flex items-center justify-between gap-8 lg:gap-16">
        <div className="max-w-2xl flex-1">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-blue-800 dark:text-blue-400 font-medium mb-3 text-lg"
          >
            {t('greeting')}
            <span className="cursor-blink ml-0.5 font-light">|</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-10 leading-relaxed"
          >
            {t('description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-blue-200 dark:hover:bg-blue-600/40 border border-slate-300 dark:border-white/10 hover:border-blue-600 dark:hover:border-blue-500/50 flex items-center justify-center transition-all hover:scale-110"
                aria-label={link.label}
              >
                <Image src={link.icon} alt={link.label} width={22} height={22} className="object-contain" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Particle silhouette — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="hidden lg:flex items-center justify-center flex-shrink-0"
        >
          <ParticleSilhouette />
        </motion.div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 text-xs tracking-widest uppercase"
      >
        <span>{t('scroll')}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
