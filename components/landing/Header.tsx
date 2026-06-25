import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="relative z-10 border-b border-ocean-500/5 bg-cream/85 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-tide-500 to-tide-600 shadow-sm">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-bold text-ocean-500">Buildo</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/#features" className="btn-ghost">Возможности</Link>
          <Link href="/#how" className="btn-ghost">Как работает</Link>
          <Link href="/ai-agent" className="btn-ghost">AI-агент</Link>
          <Link href="/pricing" className="btn-ghost">Тарифы</Link>
          <Link href="/docs" className="btn-ghost">Документация</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/auth/signin" className="btn-ghost hidden sm:inline-flex">
            Войти
          </Link>
          <Link href="/dashboard/sites/new" className="btn-primary">
            Попробовать бесплатно
          </Link>
        </div>
      </div>
    </header>
  );
}