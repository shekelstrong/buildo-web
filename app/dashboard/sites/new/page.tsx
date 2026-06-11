'use client';

import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

const suggestions = [
  'Лендинг для кофейни с меню и контактами',
  'Сайт-портфолио для фотографа',
  'Визитка для юриста с формой записи',
  'Landing для онлайн-курса по дизайну',
];

export default function NewSitePage() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setGenerating(true);
    // TODO Phase 1.5: POST /api/sites { prompt }
    await new Promise((r) => setTimeout(r, 1500));
    setGenerating(false);
    alert('Сайт создан! (mock — Phase 1.5 подключит API)');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-ocean-500">Новый сайт</h1>
      <p className="mt-2 text-ocean-500/60">
        Опишите что хотите. Чем подробнее — тем лучше результат.
      </p>

      <form onSubmit={handleSubmit} className="card mt-8">
        <label className="block text-sm font-medium text-ocean-500">
          Промт
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          placeholder="Лендинг для кофейни «Утро» на Патриарших. Пастельные тона (бежевый, терракота), 6 позиций в меню с ценами, контакты с картой, кнопка «Забронировать столик», блок «О нас» с историей..."
          className="mt-2 w-full rounded-lg border border-ocean-500/15 bg-white px-4 py-3 text-sm text-ocean-500 placeholder:text-ocean-500/30 focus:border-tide-500 focus:outline-none focus:ring-2 focus:ring-tide-500/20"
        />

        <div className="mt-3 flex items-center justify-between text-xs text-ocean-500/50">
          <span>{prompt.length} символов</span>
          <span>Рекомендуем 200-500</span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-ocean-500/60">
            <Sparkles className="h-4 w-4 text-tide-500" />
            <span>ИИ-агент MiniMax M3 + taste-skill v2</span>
          </div>
          <button
            type="submit"
            disabled={generating || !prompt.trim()}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Генерирую...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Создать сайт
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <div className="text-sm font-medium text-ocean-500/70">Примеры промтов:</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="rounded-full border border-ocean-500/10 bg-white px-3 py-1.5 text-xs text-ocean-500/70 transition-colors hover:border-tide-500/30 hover:bg-tide-500/5 hover:text-tide-600"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
