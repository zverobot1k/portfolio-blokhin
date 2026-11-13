export const profile = {
  name: 'Максим Блохин',
  firstName: 'Максим',
  lastName: 'Блохин',
  role: 'Backend Developer',
  location: 'Москва, Россия',
  email: 'maksikkblohinn@gmail.com',
  phone: '+7 (968) 455-24-86',
  phoneRaw: '+79684552486',
  telegram: '@wearclouds',
  telegramUrl: 'https://t.me/wearclouds',
  github: 'zverobot1k',
  githubUrl: 'https://github.com/zverobot1k',
  educationShort: 'МИРЭА · full stack',
  status: 'open to work',
  summary:
    'Проектирую backend-сервисы на Go и Python: REST API, пайплайны обработки данных, кэширование и очереди. Учусь в МИРЭА на full stack-разработчика и копаю вглубь — от сетевых протоколов до оптимизации SQL.',
  about: [
    'Я backend-разработчик, основной стек — Go и Python. Мне нравится разбираться в том, как устроены сервисы изнутри: от обработки HTTP-запроса и бизнес-логики до работы с базами данных, кэшированием и фоновой обработкой задач.',
    'Работаю с Go (Gin, GORM) и Python (FastAPI, SQLAlchemy, Celery). Использую PostgreSQL, Redis и TimescaleDB, знаком с Docker, CI/CD и настройкой reverse proxy. В проектах уделяю внимание не только реализации функциональности, но и производительности, отказоустойчивости и тому, насколько удобно систему развивать дальше.',
    'Сейчас учусь на направлении «Full Stack разработка» факультета информационных систем и технологий в МИРЭА. При этом больше всего меня увлекает backend: конкурентность, архитектура сервисов, работа с данными и внутренние механизмы операционных систем.',
    'Люблю не просто использовать готовые инструменты, а понимать, какие задачи они решают и что происходит под капотом.',
  ],
  principles: [
    {
      index: '01',
      title: 'Проектирование и API',
      text: 'От контракта до реализации: проектирование REST API, валидация, бизнес-логика и взаимодействие между слоями приложения.',
    },
    {
      index: '02',
      title: 'Конкурентность и обработка',
      text: 'Горутины, каналы, синхронизация, фоновые задачи и асинхронная обработка данных.',
    },
    {
      index: '03',
      title: 'Данные и инфраструктура',
      text: 'PostgreSQL, Redis, индексы, транзакции, кэширование, Docker и CI/CD.',
    },
  ],
  quickFacts: [
    ['role', 'Backend Developer'],
    ['location', 'Москва, Россия'],
    ['education', 'МИРЭА · с 2024'],
    ['focus', 'API · data pipelines'],
    ['stack', 'Go, Python, PostgreSQL, Redis'],
    ['status', 'open to opportunities'],
  ],
} as const

export type SkillGroup = {
  id: string
  dir: string
  title: string
  comment: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'langs',
    dir: 'languages/',
    title: 'Programming Languages',
    comment: '// основной инструментарий',
    items: ['Go', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'frameworks',
    dir: 'frameworks/',
    title: 'Frameworks',
    comment: '// HTTP, REST, GraphQL',
    items: ['Gin', 'Express.js', 'FastAPI'],
  },
  {
    id: 'databases',
    dir: 'databases/',
    title: 'Databases',
    comment: '// хранение и аналитика',
    items: ['PostgreSQL', 'TimescaleDB'],
  },
  {
    id: 'orm',
    dir: 'data-access/',
    title: 'ORM & Data Access',
    comment: '// слой работы с данными',
    items: ['GORM', 'SQLAlchemy'],
  },
  {
    id: 'async',
    dir: 'messaging/',
    title: 'Async & Messaging',
    comment: '// очереди, кэш, фоновые задачи',
    items: ['Celery', 'Redis', 'Kafka', 'AnyIO'],
  },
  {
    id: 'ai',
    dir: 'ai-ml/',
    title: 'AI / ML',
    comment: '// inference и обработка медиа',
    items: ['Whisper', 'Gemma', 'LLaMA', 'Apple MPS'],
  },
  {
    id: 'infra',
    dir: 'infra/',
    title: 'Infra & Tools',
    comment: '// от локального стенда до продакшена',
    items: ['Git', 'Docker', 'Docker Compose', 'Kubernetes', 'CI/CD'],
  },
]

export type Project = {
  id: string
  name: string
  kind: string
  year: string
  summary: string
  highlights: string[]
  stack: string[]
  metrics: { value: string; label: string }[]
  accent: 'green' | 'cyan' | 'amber'
  file: string
}

export const projects: Project[] = [
  {
    id: 'spotify-stats',
    name: 'Spotify Stats',
    kind: 'Full-stack сервис',
    year: '2025',
    file: 'spotify-stats/README.md',
    summary:
      'Сервис для сбора и визуализации статистики прослушиваний Spotify: Wrapped, Insights, Timeline, Compare и персональные рекомендации с экспортом в плейлист.',
    highlights: [
      'Реализовал безопасную авторизацию Spotify OAuth 2.0 + PKCE, хранение и refresh токенов, CORS и сессионные API для защищённого доступа к данным пользователя.',
      'Спроектировал pipeline сбора и обогащения данных прослушиваний: top tracks/artists, recently played, audio features, жанры Last.fm — с кэшированием в Redis (TTL 30 минут) и дедупликацией запросов через singleflight.',
      'Реализовал API для Wrapped / Insights / Timeline / Compare и движок персональных рекомендаций (Last.fm + Spotify fallback) с экспортом рекомендаций в плейлист.',
      'Упаковал проект в Docker / Docker Compose для быстрого локального запуска и тестирования.',
    ],
    stack: ['OAuth 2.0 + PKCE', 'Redis', 'Last.fm API', 'Spotify API', 'Docker'],
    metrics: [
      { value: '30 мин', label: 'TTL кэша' },
      { value: '4', label: 'API-модуля' },
    ],
    accent: 'green',
  },
  {
    id: 'ads-api',
    name: 'Ads API',
    kind: 'REST-сервис',
    year: '2025',
    file: 'ads-api/README.md',
    summary:
      'REST API для объявлений на Go + Gin с чистой слоистой архитектурой, миграциями через GORM и контейнеризацией.',
    highlights: [
      'Разработал REST на Go + Gin, реализовал полный CRUD для объявлений.',
      'Настроил PostgreSQL с миграциями через GORM.',
      'Спроектировал масштабируемую архитектуру с низкой связанностью между слоями — проще поддерживать и расширять приложение.',
      'Внедрил контейнеризацию с Docker, что сократило время деплоя в 2 раза.',
    ],
    stack: ['Go', 'Gin', 'PostgreSQL', 'GORM', 'Docker'],
    metrics: [
      { value: '×2', label: 'быстрее деплой' },
      { value: 'CRUD', label: 'объявления' },
    ],
    accent: 'cyan',
  },
  {
    id: 'video-notes',
    name: 'Video Notes SaaS',
    kind: 'SaaS / API',
    year: '2025',
    file: 'video-notes/README.md',
    summary:
      'SaaS для конспектирования видеороликов: REST/GraphQL API, фоновый video pipeline и ML-транскрибация с ускорением на Apple Silicon.',
    highlights: [
      'Разработал REST / GraphQL API на FastAPI (Pydantic, SQLAlchemy, JWT).',
      'Спроектировал video pipeline на 1000+ видео в день (Celery, Redis).',
      'Настроил PostgreSQL + TimescaleDB partitions для метаданных и аналитики.',
      'Интегрировал PyTorch (Whisper-medium, LLaMA-7B) и ускорил inference на Apple Silicon в 3 раза.',
    ],
    stack: ['Python', 'FastAPI', 'Celery', 'Redis', 'TimescaleDB', 'PyTorch', 'Whisper'],
    metrics: [
      { value: '1000+', label: 'видео / день' },
      { value: '×3', label: 'быстрее inference' },
    ],
    accent: 'amber',
  },
]

export type EducationEntry = {
  school: string
  degree: string
  period: string
  hash: string
  branch: string
  bullets: string[]
  current?: boolean
}

export const education: EducationEntry[] = [
  {
    school: 'МИРЭА',
    degree: 'Бакалавриат, full stack разработка',
    period: 'сентябрь 2024 — настоящее время',
    hash: 'a1b2c3d',
    branch: 'HEAD -> main',
    current: true,
    bullets: [
      'Сетевые протоколы и взаимодействие систем: TCP/IP, HTTP/HTTPS, DNS, маршрутизация, сокеты, клиент-серверная архитектура.',
      'Алгоритмы и структуры данных, многопоточность, синхронизация и управление памятью.',
      'Операционные системы: процессы и потоки, планирование, виртуальная память, файловые системы.',
      'Реляционные БД: нормализация, индексы, транзакции, ACID, уровни изоляции, оптимизация SQL-запросов.',
    ],
  },
  {
    school: 'Лицей НИУ ВШЭ',
    degree: 'Математика, информатика и инженерия',
    period: 'сентябрь 2022 — июнь 2024',
    hash: '9f8e7d6',
    branch: 'origin/hse-lyceum',
    bullets: [],
  },
]

export const sectionLinks = [
  { id: 'about', label: 'about', index: '01' },
  { id: 'stack', label: 'stack', index: '02' },
  { id: 'projects', label: 'projects', index: '03' },
  { id: 'education', label: 'education', index: '04' },
  { id: 'contact', label: 'contact', index: '05' },
] as const

export const marqueeItems = [
  'Go',
  'Python',
  'PostgreSQL',
  'TimescaleDB',
  'Redis',
  'Kafka',
  'FastAPI',
  'Gin',
  'Celery',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'SQLAlchemy',
  'GORM',
  'TypeScript',
]
