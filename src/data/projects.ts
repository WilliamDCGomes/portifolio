export interface Project {
  title: Record<string, string>;
  description: Record<string, string>;
  tools: string[];
  images: string[];
  icon: string;
}

export const projects: Project[] = [
  {
    title: { pt: 'Social Media Video Creator', en: 'Social Media Video Creator', es: 'Social Media Video Creator', fr: 'Social Media Video Creator' },
    description: {
      pt: 'Aplicativo criado com a intenção de gerar automaticamente vídeos para plataformas de mídia social como TikTok, Instagram e YouTube Shorts. O objetivo é que o usuário apenas informe o tema do vídeo, e então um vídeo será gerado com a narração de um conteúdo criado por inteligência artificial.',
      en: 'An application created to automatically generate videos for social media platforms such as TikTok, Instagram, and YouTube Shorts. The user simply provides the video theme, and a video is generated with narration from AI-created content.',
      es: 'Aplicación creada para generar automáticamente videos para plataformas de redes sociales como TikTok, Instagram y YouTube Shorts. El usuario solo indica el tema y el video se genera con narración de contenido creado por inteligencia artificial.',
      fr: 'Application créée pour générer automatiquement des vidéos pour des plateformes comme TikTok, Instagram et YouTube Shorts. L\'utilisateur fournit simplement le thème et une vidéo est générée avec narration IA.',
    },
    tools: ['Flutter', 'Dart', '.NET', 'C#', 'Azure', 'Eleven Labs'],
    images: Array.from({ length: 9 }, (_, i) => `/images/projects/smvc/${i + 1}.png`),
    icon: '/images/smvc_icon.png',
  },
  {
    title: { pt: 'Protótipo de Controle Educacional', en: 'Educational Control Prototype', es: 'Prototipo de Control Educativo', fr: 'Prototype de Contrôle Éducatif' },
    description: {
      pt: 'Este aplicativo foi criado para facilitar e agilizar a troca de informações entre uma instituição de ensino e os alunos. Com ele, o aluno pode acompanhar suas notas, frequência, tarefas, aulas, comunicados e fazer solicitações diretamente pelo aplicativo.',
      en: 'This application was created to facilitate the exchange of information between an educational institution and its students. Students can track grades, attendance, assignments, classes, announcements, and make requests directly through the app.',
      es: 'Esta aplicación facilita el intercambio de información entre una institución educativa y sus alumnos. Los alumnos pueden seguir notas, asistencia, tareas, clases y comunicados.',
      fr: 'Cette application facilite l\'échange d\'informations entre un établissement scolaire et ses élèves. Les élèves peuvent suivre leurs notes, présence, devoirs et cours.',
    },
    tools: ['Flutter', 'Dart', 'Firebase'],
    images: Array.from({ length: 9 }, (_, i) => `/images/projects/pce/${i + 1}.png`),
    icon: '/images/pce_icon.png',
  },
  {
    title: { pt: 'ZiPartner', en: 'ZiPartner', es: 'ZiPartner', fr: 'ZiPartner' },
    description: {
      pt: 'Aplicativo para encontrar outras pessoas interessadas em treinar juntas. Mostra pessoas próximas com seus treinos e academias. Se houver um MATCH, um chat interno é aberto para agendar sessões de treino juntos.',
      en: 'App to find other people interested in training together. Shows nearby people with their workout preferences and gyms. If there is a MATCH, an internal chat opens to schedule a training session together.',
      es: 'App para encontrar personas interesadas en entrenar juntas. Muestra personas cercanas con sus entrenamientos y gimnasios. Si hay un MATCH, se abre un chat para organizar el entrenamiento.',
      fr: 'Application pour trouver des partenaires d\'entraînement. Affiche les personnes à proximité avec leurs préférences. En cas de MATCH, un chat interne s\'ouvre pour planifier une séance.',
    },
    tools: ['Flutter', 'Dart', '.NET', 'C#', 'SQL Server', 'Azure', 'Firebase'],
    images: Array.from({ length: 8 }, (_, i) => `/images/projects/zipartner/${i + 1}.png`),
    icon: '/images/zipartner_icon.png',
  },
  {
    title: { pt: 'Elephant Control', en: 'Elephant Control', es: 'Elephant Control', fr: 'Elephant Control' },
    description: {
      pt: 'Aplicativo para gerenciar o controle de máquinas de prêmios com bichos de pelúcia. Inclui quatro tipos diferentes de usuários, cada um com acesso exclusivo à sua respectiva conta.',
      en: 'Application to manage prize machines with stuffed animals. Includes four different user types, each with exclusive access to their respective account.',
      es: 'Aplicación para gestionar máquinas de premios con peluches. Incluye cuatro tipos de usuarios con acceso exclusivo a sus cuentas.',
      fr: 'Application pour gérer des machines à prix avec peluches. Comprend quatre types d\'utilisateurs avec accès exclusif à leurs comptes.',
    },
    tools: ['Flutter', 'Dart', '.NET', 'C#', 'SQL Server', 'SQLite', 'Azure'],
    images: Array.from({ length: 5 }, (_, i) => `/images/projects/elephant/${i + 1}.png`),
    icon: '/images/elephant_control_icon.png',
  },
  {
    title: { pt: 'Catálogo Japamix', en: 'Japamix Catalog', es: 'Catálogo Japamix', fr: 'Catalogue Japamix' },
    description: {
      pt: 'Guia turístico para uma cidade. Inclui estabelecimentos comerciais, pontos turísticos, shoppings, parques e muito mais, facilitando a navegação pelos principais pontos da cidade.',
      en: 'Tourist guide for a city. Includes commercial establishments, tourist attractions, shopping malls, parks and much more, making it easy to explore key city locations.',
      es: 'Guía turística para una ciudad. Incluye establecimientos comerciales, atracciones turísticas, centros comerciales, parques y mucho más.',
      fr: 'Guide touristique pour une ville. Inclut des établissements commerciaux, attractions touristiques, centres commerciaux, parcs et bien plus encore.',
    },
    tools: ['Flutter', 'Dart', '.NET', 'C#', 'Azure', 'Firebase'],
    images: Array.from({ length: 4 }, (_, i) => `/images/projects/japamix/${i + 1}.png`),
    icon: '/images/japamix_icon.png',
  },
];
