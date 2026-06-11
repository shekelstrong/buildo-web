'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Mail, Apple } from 'lucide-react';

const providers = [
  { id: 'github', name: 'GitHub', icon: Github, color: 'bg-gray-900' },
  { id: 'yandex', name: 'Яндекс', icon: Mail, color: 'bg-yellow-500' },
  { id: 'google', name: 'Google', icon: Mail, color: 'bg-red-500' },
  { id: 'apple', name: 'Apple', icon: Apple, color: 'bg-black' },
];

export default function SignInPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = (providerId: string) => {
    setLoading(providerId);
    // TODO Phase 1.5: NextAuth signIn()
    setTimeout(() => setLoading(null), 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-tide-500 to-tide-600">
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.4-6.3 4.4 2.3-7.2-6-4.4h7.6L12 2z" />
            </svg>
          </div>
          <span className="font-display text-3xl font-bold text-ocean-500">Buildo</span>
        </Link>

        <div className="card">
          <h1 className="text-center font-display text-2xl font-bold text-ocean-500">Войти в Buildo</h1>
          <p className="mt-2 text-center text-sm text-ocean-500/60">
            Или{' '}
            <Link href="https://t.me/buildo_aibot" className="text-tide-600 hover:underline">
              напишите боту
            </Link>{' '}
            и создайте сайт без регистрации
          </p>

          <div className="mt-8 space-y-3">
            {providers.map(({ id, name, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => handleSignIn(id)}
                disabled={loading !== null}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-ocean-500/10 bg-white px-4 py-3 text-sm font-medium text-ocean-500 transition-all hover:border-ocean-500/20 hover:bg-ocean-500/[0.02] disabled:opacity-50"
              >
                <div className={`flex h-5 w-5 items-center justify-center rounded ${color} text-white`}>
                  <Icon className="h-3 w-3" />
                </div>
                {loading === id ? 'Подключение...' : `Продолжить с ${name}`}
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-ocean-500/50">
            Регистрируясь, вы соглашаетесь с{' '}
            <Link href="/about#privacy" className="underline hover:text-ocean-500">
              политикой конфиденциальности
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
