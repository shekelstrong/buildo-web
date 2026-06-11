'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, ExternalLink } from 'lucide-react';

export default function SignInPage() {
  const [tgLinked, setTgLinked] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-lg">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-tide-500 to-tide-600">
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.4-6.3 4.4 2.3-7.2-6-4.4h7.6L12 2z" />
            </svg>
          </div>
          <span className="font-display text-3xl font-bold text-ocean-500">Buildo</span>
        </Link>

        <div className="card">
          <h1 className="text-center font-display text-2xl font-bold text-ocean-500">
            Войти в Buildo
          </h1>
          <p className="mt-2 text-center text-sm text-ocean-500/60">
            Buildo работает через Telegram-бота. Это быстрее, чем формы регистрации.
          </p>

          <a
            href="https://t.me/buildo_aibot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 flex w-full items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Открыть @buildo_aibot
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          <div className="mt-6 rounded-lg border border-tide-500/20 bg-tide-500/5 p-4 text-sm text-ocean-500/80">
            <div className="font-medium text-ocean-500">Как это работает:</div>
            <ol className="mt-2 space-y-1 text-xs">
              <li>1. Нажмите кнопку выше — откроется Telegram</li>
              <li>2. Нажмите <b>Start</b> в боте</li>
              <li>3. Напишите <code className="rounded bg-ocean-500/10 px-1">/site</code> и опишите сайт</li>
              <li>4. Через минуту получите готовый сайт</li>
            </ol>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/dashboard"
              className="text-xs text-ocean-500/50 hover:text-tide-600"
            >
              Уже зарегистрированы? Открыть dashboard →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ocean-500/50">
          Buildo = Telegram-first. Войти можно только через бота.
          <br />
          Регистрация через Google/Яндекс/GitHub/Apple появится в версии 1.5.
        </p>
      </div>
    </div>
  );
}
