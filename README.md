# Buildo Web

**Web-сайт платформы Buildo** — Next.js 14 App Router. Лендинг + Dashboard + Auth.

## Запуск

```bash
cd buildo-web
npm install
npm run dev
# open http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Deploy на Layero

```bash
# после npm run build
# залить .next/ + public/ + package.json + next.config.js
# настроить Node.js runtime на Layero
```

(В будущем: `npx layero deploy --framework=nextjs`)

## Структура

```
app/
  (marketing)/        # публичные страницы
    pricing/
    about/
    docs/
  dashboard/          # авторизованная зона
    sites/
      new/
    profile/
  auth/
    signin/           # OAuth (GitHub, Яндекс, Google, Apple)
  api/
    sites/            # proxy → buildo-bot backend
components/
  landing/            # Header, Hero, Features, Pricing, FAQ, CTA, Footer
  dashboard/          # Sidebar
lib/
  api.ts              # client к bot backend
  types.ts            # shared types
```

## Backend (buildo-bot)

В MVP — mock data. В **Phase 1.5** подключается к FastAPI в buildo-bot через `NEXT_PUBLIC_BOT_API_URL`.

## Технологии

- **Next.js 14.2.13** (App Router)
- **React 18.3.1**
- **TypeScript 5.6**
- **TailwindCSS 3.4** (custom brand palette: ocean/tide/cream/amber/coral)
- **next-auth 4.24** (OAuth, Phase 1.5)
- **lucide-react** (icons)
- **zod** (validation)
- **react-hook-form** (forms)

## Бренд-кит

- **Шрифты:** Fraunces (display) + Inter (body) + JetBrains Mono (code)
- **Палитра:** midnight ocean #0A1628 + cyan tide #06B6D4 + paper cream #FDFCF8 + amber #F59E0B + coral #F43F5E
- **Стиль:** clean editorial + soft anti-slop, избегаем generic SaaS-look
