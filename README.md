# Портфолио — Максим Блохин

Интерактивный сайт-портфолио backend-разработчика в стиле терминала: тёмная тема по
умолчанию, светлая — по переключателю, отдельная страница с резюме и настоящая командная
строка внизу экрана.

## Стек

- React 19 + TypeScript
- Vite
- React Router (HashRouter)
- Чистый CSS: токены тем, адаптивная вёрстка, анимации на `IntersectionObserver` и `useEffect`

Без UI-библиотек и тяжёлых зависимостей.

## Запуск

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production-сборка в dist/
npm run preview    # локальный просмотр сборки
```

## Что внутри

- **Hero** — анимированный `whoami`, код-карточка профиля на Go и бегущая строка стека.
- **About** — короткое описание, принципы работы и `profile.yaml`.
- **Stack** — группы технологий в виде директорий.
- **Projects** — пет-проекты из резюме с раскрывающимися README, стеком и метриками.
- **Education** — таймлайн в виде `git log`.
- **Contact** — почта, Telegram, GitHub, телефон; копирование в один клик, время по Москве.
- **CV** (`/#/cv`) — резюме на отдельной странице, печать и скачивание PDF.
- **Терминал** — команды, автодополнение, история, темы.

### Команды терминала

```
help        справка
about       раздел «обо мне»
stack       стек
projects    проекты
education   образование
contact     контакты
cv          открыть резюме
github      открыть GitHub
telegram    открыть Telegram
email       скопировать e-mail
phone       скопировать телефон
theme       dark | light | toggle
neofetch    краткая сводка
clear       очистить вывод
```

Горячие клавиши: `/` — фокус на терминале, `⌘K` / `Ctrl+K` — открыть терминал,
`↑` / `↓` — история, `Tab` — автодополнение, `Esc` — очистить вывод, `T` — сменить тему.

## Docker

```bash
docker compose up -d --build   # http://localhost:8080
docker compose logs -f          # логи nginx
docker compose down             # остановить
```

Сменить порт на хосте:

```bash
PORT=3000 docker compose up -d
```

Сборка и запуск без compose:

```bash
docker build -t blokhin-portfolio .
docker run --rm -p 8080:80 blokhin-portfolio
```

Образ собирается в два этапа: `node:22-alpine` собирает Vite-бандл, `nginx:1.27-alpine`
раздаёт статику. В `deploy/nginx.conf` настроены gzip, immutable-кэш для `/assets`,
`no-cache` для `index.html`, inline-отдача PDF и security-заголовки. У образа есть
healthcheck, у контейнера — лимит на размер логов.

## Где менять контент

Весь контент собран в [`src/data/profile.ts`](./src/data/profile.ts): профиль, стек,
проекты, образование и ссылки. PDF для скачивания лежит в `public/Blokhin-CV.pdf`.

## Деплой

Сборка статическая, подойдёт GitHub Pages, Netlify, Vercel или любой nginx. HashRouter
выбран специально, чтобы прямые ссылки вроде `/#/cv` работали без настройки fallback на
сервере. При размещении в поддиректории задайте `base` в `vite.config.ts` — ссылка на PDF
и ассеты подхватят его через `import.meta.env.BASE_URL`.

## Структура

```
src/
  components/   Hero, Header, секции, CommandDock, иконки
  context/      тема (localStorage + prefers-color-scheme)
  data/         контент портфолио
  hooks/        reveal-анимации, typewriter, активная секция, часы
  pages/        Home, Cv
  styles/       global.css
```
