export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  description: string;
  logo: string;
}

export const education: Education[] = [
  {
    institution: 'FIAP',
    degree: 'Pós-graduação Lato Sensu — MBA',
    field: 'Engenharia de Software',
    period: 'Mar 2024 – Mar 2025',
    description: 'Especialização em Engenharia de Software com foco em arquitetura de sistemas, metodologias ágeis, qualidade de software e gestão de projetos tecnológicos.',
    logo: '/images/fiap_icon.png',
  },
  {
    institution: 'FIB — Faculdades Integradas de Bauru',
    degree: 'Bacharelado em Ciência da Computação',
    field: 'Ciência da Computação',
    period: 'Jan 2019 – Dez 2022',
    description: 'Formação sólida em fundamentos da computação, algoritmos, estruturas de dados, desenvolvimento de software, redes, banco de dados e inteligência artificial.',
    logo: '/images/fib_icon.jpg',
  },
  {
    institution: 'Colégio Técnico Industrial — Prof. Isaac Portal Roldán',
    degree: 'Curso Técnico',
    field: 'Eletrônica',
    period: 'Fev 2015 – Dez 2017',
    description: 'Formação técnica em eletrônica analógica e digital, manutenção de equipamentos eletrônicos, programação de microcontroladores e automação industrial.',
    logo: '/images/cti_icon.png',
  },
  {
    institution: 'EF English Live',
    degree: 'Curso de Idiomas',
    field: 'Língua Inglesa — Nível Pós-Intermediário',
    period: 'Ago 2023 – Ago 2024',
    description: 'Aprimoramento da fluência em inglês com foco em comunicação profissional, escrita técnica e conversação para ambientes corporativos internacionais.',
    logo: '/images/ef_english_icon.jpg',
  },
  {
    institution: 'Times Idioma',
    degree: 'Curso de Idiomas',
    field: 'Língua Inglesa',
    period: 'Mar 2023 – Abr 2024',
    description: 'Curso presencial de inglês com foco em conversação, gramática avançada e vocabulário técnico para profissionais de tecnologia.',
    logo: '/images/times_idioma_icon.jpg',
  },
];
