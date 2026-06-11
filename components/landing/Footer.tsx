import Link from 'next/link';
import { Sparkles, Github, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-ocean-500/5 bg-ocean-500 text-white">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-tide-500 to-tide-600">
                <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-2xl font-bold">Buildo</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Аналог Lovable для РФ. ИИ-агент делает сайты в Telegram за 2 минуты.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://t.me/buildo_aibot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/shekelstrong/buildo-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Продукт"
            links={[
              { href: '/#features', label: 'Возможности' },
              { href: '/#how', label: 'Как работает' },
              { href: '/pricing', label: 'Тарифы' },
              { href: '/docs', label: 'Документация' },
            ]}
          />
          <FooterColumn
            title="Для юзеров"
            links={[
              { href: '/auth/signin', label: 'Войти' },
              { href: '/dashboard/sites/new', label: 'Создать сайт' },
              { href: '/dashboard/profile', label: 'Профиль' },
            ]}
          />
          <FooterColumn
            title="Компания"
            links={[
              { href: '/about', label: 'О нас' },
              { href: 'https://t.me/buildo_aibot', label: 'Поддержка' },
              { href: '/about#privacy', label: 'Конфиденциальность' },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <div>© 2026 Buildo. Все права защищены.</div>
          <div className="font-mono text-xs">v0.1.0-mvp · buildo.ru</div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-medium text-white/90">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/60 transition-colors hover:text-tide-400">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
