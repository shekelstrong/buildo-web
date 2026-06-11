import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-500 via-ocean-600 to-ocean-700 p-12 text-center shadow-2xl shadow-ocean-500/30 sm:p-16">
          <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-tide-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-amber/20 blur-3xl" />

          <div className="relative">
            <Sparkles className="mx-auto h-10 w-10 text-tide-400" />
            <h2 className="mt-6 text-balance font-display text-4xl font-bold text-white sm:text-5xl">
              Готовы попробовать?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-white/80">
              Откройте @buildo_aibot в Telegram, напишите «сделай лендинг» — увидите как это работает.
              Первый сайт — бесплатно.
            </p>
            <Link
              href="https://t.me/buildo_aibot"
              target="_blank"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-tide-500 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-tide-500/30 transition-all hover:scale-[1.02] hover:bg-tide-600"
            >
              Открыть в Telegram
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
