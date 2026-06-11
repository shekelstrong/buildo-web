# buildo-web

**Web-сайт платформы Buildo** — landing + presentation + /articles SEO блог + OAuth-вход для генерации сайтов.

## Stack (план)

- **Next.js 14** (App Router) + Vercel (deploy **manual** by user)
- **Supabase Auth** (Google, Яндекс OAuth2, GitHub, Apple, GitVerse)
- **Supabase DB** (pgvector + tables)
- **Telegram Web App SDK** (для встраивания в tg-бота)
- **Layero** = production host (user deploys manually after dev)

## Status

- **Phase 0** — repo created, no code yet
- **Phase 1 / MVP** — landing + /articles stub + OAuth-флоу
- **Before code starts** — deep research audience + competitors (see `nemo-team-docs/projects/buildo/competitors-research.md`)

## Deploy

NO CI/CD. User deploys manually:

```bash
# local
pnpm install
pnpm build
# deploy to Layero (manual process)
```

## Related

- **Spec**: `nemo-team-docs/projects/site-builder-audit.md` (2026-06-11 supplement)
- **Hub**: `nemo-team-docs/projects/buildo/`
- **Bot**: `shekelstrong/buildo-bot`
- **Mini App**: `shekelstrong/buildo-miniapp`
