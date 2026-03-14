import Image from 'next/image';

const socialLinks = [
  { icon: '/images/instagram_icon.png', href: 'https://www.instagram.com/william_douglas_dev/', label: 'Instagram' },
  { icon: '/images/youtube_icon.png', href: 'https://www.youtube.com/@WilliamDouglasDev', label: 'YouTube' },
  { icon: '/images/tiktok_icon.png', href: 'https://www.tiktok.com/@william_douglas_dev', label: 'TikTok' },
  { icon: '/images/linkedin_icon.png', href: 'https://www.linkedin.com/in/william-douglas-dev/', label: 'LinkedIn' },
  { icon: '/images/github_icon.png', href: 'https://github.com/WilliamDCGomes', label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="bg-slate-300 dark:bg-[#030712] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
        <Image src="/images/logo.png" alt="Logo" width={42} height={42} className="object-contain opacity-80" />
        <div className="flex gap-3">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-400 dark:bg-white/10 hover:bg-slate-500 dark:hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
              aria-label={link.label}
            >
              <Image src={link.icon} alt={link.label} width={20} height={20} className="object-contain" />
            </a>
          ))}
        </div>
        <p className="text-slate-500 dark:text-slate-500 text-sm">© {new Date().getFullYear()} William Douglas. All rights reserved.</p>
      </div>
    </footer>
  );
}
