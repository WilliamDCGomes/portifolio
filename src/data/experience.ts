export interface Experience {
  company: string;
  title: string;
  period: string;
  duration: string;
  type: string;
  observation?: string;
  logo: string;
  responsibilities: string[];
  tools: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Aubay Portugal',
    title: 'Desenvolvedor Sênior',
    period: 'Jul 2025 – Presente',
    duration: '8 meses',
    type: 'Full-time',
    observation: 'Trabalho alocado na BNP Paribas',
    logo: '/images/companiesExperience/aubay_icon.png',
    responsibilities: [
      'Desenvolvimento de Aplicações para Web',
      'Desenvolvimento com C#, .NET, VB.NET, JavaScript e Angular',
      'Criação e Manutenção de tabelas SQL e Oracle',
      'Criação e Manutenção de API Rest e consumo',
    ],
    tools: ['C#', '.NET', 'VB.NET', 'JavaScript', 'Angular', 'SQL Server', 'Oracle'],
  },
  {
    company: 'BNP Paribas',
    title: 'Desenvolvedor Sênior',
    period: 'Jul 2025 – Out 2025',
    duration: '4 meses',
    type: 'Full-time',
    observation: 'Trabalho como terceirizado pela Aubay na BNP Paribas',
    logo: '/images/companiesExperience/bnp_paribas_icon.png',
    responsibilities: [
      'Desenvolvimento de Aplicações para Web',
      'Desenvolvimento com C#, .NET, VB.NET, JavaScript e Angular',
      'Criação e Manutenção de tabelas SQL e Oracle',
      'Criação e Manutenção de API Rest e consumo',
    ],
    tools: ['C#', '.NET', 'VB.NET', 'JavaScript', 'Angular', 'SQL Server', 'Oracle'],
  },
  {
    company: 'Microsoft',
    title: 'Desenvolvedor Sênior',
    period: 'Set 2024 – Nov 2025',
    duration: '1 ano e 2 meses',
    type: 'Full-time',
    observation: 'Trabalho como terceirizado pela Wipro na Microsoft',
    logo: '/images/companiesExperience/microsoft_icon.png',
    responsibilities: [
      'Manutenção em Aplicações e implementação de novas funções',
      'Criação de automações para projetos internos',
      'Desenvolvimento de Aplicações para Web',
      'Desenvolvimento com C#, Angular e React',
      'Criação e Manutenção de tabelas SQL e SQLite',
      'Criação e Manutenção de API Rest e consumo',
    ],
    tools: ['Power Automate', 'SharePoint', 'C#', '.NET Core', '.NET Framework', 'Azure'],
  },
  {
    company: 'Wipro',
    title: 'Desenvolvedor Sênior',
    period: 'Set 2024 – Nov 2025',
    duration: '1 ano e 2 meses',
    type: 'Full-time',
    observation: 'Trabalho alocado na Microsoft',
    logo: '/images/companiesExperience/wipro_icon.png',
    responsibilities: [
      'Manutenção em Aplicações e implementação de novas funções',
      'Criação de automações para projetos internos',
      'Desenvolvimento de Aplicações para Web',
      'Desenvolvimento com C#, Angular e React',
      'Criação e Manutenção de tabelas SQL e SQLite',
      'Criação e Manutenção de API Rest e consumo',
    ],
    tools: ['Power Automate', 'SharePoint', 'C#', '.NET Core', '.NET Framework', 'Azure'],
  },
  {
    company: 'Totvs',
    title: 'Desenvolvedor .NET / Desktop e Mobile',
    period: 'Mai 2023 – Set 2024',
    duration: '1 ano e 4 meses',
    type: 'Full-time',
    logo: '/images/companiesExperience/totvs_icon.png',
    responsibilities: [
      'Desenvolvimento de Aplicações utilizando Xamarin Forms',
      'Manutenção em Aplicações e implementação de novas funções',
      'Desenvolvimento de Aplicações para Android e Windows',
      'Criação e Manutenção de tabelas SQL e SQLite',
      'Criação e Manutenção de API Rest e consumo',
      'Suporte aos desenvolvedores com menor experiência',
    ],
    tools: ['C#', 'Xamarin Forms', '.NET Core', '.NET Framework', 'SQLite', 'PostgreSQL', 'SQL Server'],
  },
  {
    company: 'Keeper',
    title: 'Desenvolvedor Full Stack',
    period: 'Out 2023 – Mai 2024',
    duration: '7 meses',
    type: 'Full-time',
    logo: '/images/companiesExperience/keeper_icon.png',
    responsibilities: [
      'Desenvolvimento de Aplicações utilizando Flutter, Angular e .NET',
      'Desenvolvimento com C#, Dart e TypeScript',
      'Manutenção em Aplicações e implementação de novas funções',
      'Desenvolvimento de Aplicações para Android, iOS e plataformas web',
      'Manutenção e criação de tabelas SQL e SQLite',
      'Manutenção de API Rest e consumo',
    ],
    tools: ['C#', '.NET Core', 'Flutter', 'Dart', 'TypeScript', 'Angular', 'SQL Server', 'Firebase'],
  },
  {
    company: 'Moovefy',
    title: 'Desenvolvedor Mobile',
    period: 'Jul 2021 – Abr 2023',
    duration: '1 ano e 9 meses',
    type: 'Full-time',
    logo: '/images/companiesExperience/moovefy_icon.png',
    responsibilities: [
      'Desenvolvimento de Aplicações do zero utilizando Flutter e Xamarin Forms',
      'Manutenção em Aplicações e implementação de novas funções',
      'Desenvolvimento de Aplicações para Android e iOS',
      'Manutenção e criação de tabelas SQL e SQLite',
      'Manutenção de API Rest e consumo',
      'Correções de bugs em produção',
      'Publicação dos apps na Apple Store e Google Play',
    ],
    tools: ['C#', 'Xamarin Forms', 'Dart', 'Flutter', '.NET Core', '.NET Framework', 'SQL Server', 'SQLite'],
  },
  {
    company: 'William Douglas Developer',
    title: 'Desenvolvedor Mobile e Web',
    period: 'Out 2018 – Abr 2024',
    duration: '5 anos e 6 meses',
    type: 'Freelance',
    observation: 'Minha própria empresa para trabalhos freelancers',
    logo: '/images/companiesExperience/william_douglas_developer_icon.png',
    responsibilities: [
      'Desenvolvimento de Aplicações do zero utilizando Flutter e Xamarin Forms',
      'Desenvolvimento de Sites utilizando HTML, CSS e JavaScript',
      'Manutenção em Aplicações e implementação de novas funções',
      'Desenvolvimento de Aplicações para Android e iOS',
      'Criação, manutenção e consumo de API Rest',
      'Correções de bugs em produção',
      'Publicação dos apps na Apple Store e Google Play',
    ],
    tools: ['C#', 'Xamarin Forms', 'MAUI', '.NET Core', 'Flutter', 'Dart', 'Java', 'JavaScript', 'Angular', 'SQLite', 'MySQL', 'SQL Server', 'Azure', 'Firebase'],
  },
];
