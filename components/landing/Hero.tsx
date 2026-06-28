import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Code2, Users } from 'lucide-react';
import { ScarcityBadge } from '@/components/ScarcityBadge';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative gradient blob — scale down on mobile to prevent overflow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-gradient-to-br from-tide-500/20 via-tide-400/10 to-transparent blur-3xl sm:-top-40 sm:h-[500px] sm:w-[500px]" />
      <div className="pointer-events-none absolute top-20 -right-12 h-[180px] w-[180px] rounded-full bg-gradient-to-br from-amber/10 to-coral/10 blur-3xl sm:top-40 sm:right-0 sm:h-[300px] sm:w-[300px]" />

      <div className="container-wide relative pt-20 pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="badge mb-6 animate-fade-in">
            <Sparkles className="h-3 w-3" />
            Первый сайт — бесплатно
          </div>

          {/* Scarcity badge — паттерн getnexora.ru: social proof + urgency в hero */}
          <div className="mb-6 flex justify-center">
            <ScarcityBadge
              current={142}
              total={200}
              unit="компания"
              closingLabel="Скидка 50% на онбординг закрывается"
              deadline={new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)}
              theme="dark"
              icon={<Users className="h-4 w-4" />}
            />
          </div>

          <h1 className="animate-slide-up text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight text-ocean-500 sm:text-6xl lg:text-7xl">
            ИИ-агент делает сайты{' '}
            <span className="gradient-text">за 2 минуты</span>
          </h1>

          <p className="mt-6 animate-slide-up text-balance text-lg leading-relaxed text-ocean-500/70 sm:text-xl">
            Напишите в Telegram-бот: «лендинг для кофейни на Патриарших» — получите готовый сайт
            с хостингом, SSL и красивым дизайном. Без кода, без регистрации, без оплаты за первый сайт.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/dashboard/sites/new" className="btn-primary px-8 py-4 text-lg shadow-lg shadow-tide-500/20">
              Открыть в Telegram
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="#how" className="btn-secondary px-8 py-4 text-lg">
              Как это работает
            </Link>
          </div>

          {/* Mock chat preview */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-ocean-500/10 bg-white shadow-2xl shadow-ocean-500/5">
            <div className="flex items-center gap-2 border-b border-ocean-500/5 bg-ocean-500/[0.02] px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-coral/60" />
              <div className="h-3 w-3 rounded-full bg-amber/60" />
              <div className="h-3 w-3 rounded-full bg-tide-500/60" />
              <span className="ml-2 text-xs text-ocean-500/50">@buildo_aibot</span>
            </div>
            <div className="space-y-4 p-6 text-left">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-ocean-500/10" />
                <div className="rounded-2xl rounded-tl-sm bg-ocean-500/5 px-4 py-2.5 text-sm text-ocean-500/80">
                  Лендинг для кофейни «Утро» на Патриарших. Пастельные тона, скролл-эффекты, меню с 6 позициями, контакты и кнопка «Забронировать столик».
                </div>
              </div>
              <div className="flex items-start justify-end gap-3">
                <div className="rounded-2xl rounded-tr-sm bg-tide-500 px-4 py-2.5 text-sm text-white">
                  <div className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5" />
                    Генерирую сайт...
                  </div>
                </div>
                <div className="h-8 w-8 shrink-0 rounded-full bg-tide-500" />
              </div>
              <div className="flex items-start justify-end gap-3">
                <div className="rounded-2xl rounded-tr-sm bg-tide-500 px-4 py-3 text-sm text-white">
                  <div className="font-medium">Готово! ☕</div>
                  <div className="mt-1 text-white/90">Сайт «Утро» создан: 8 файлов, 4 секции</div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs">
                    <Code2 className="h-3 w-3" />
                    utro-layero.app
                  </div>
                </div>
                <div className="h-8 w-8 shrink-0 rounded-full bg-tide-500" />
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ocean-500/50">
            <div>✓ Без банковской карты</div>
            <div>✓ SSL из коробки</div>
            <div>✓ Исходный код в GitHub</div>
            <div>✓ ЮKassa / СБП / Telegram Stars</div>
          </div>
        </div>
      </div>
    </section>
  );
}
