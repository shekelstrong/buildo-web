import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Sparkles, Heart, Globe, Code2, Users } from 'lucide-react';

export const metadata = { title: 'О нас' };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="py-20">
        <div className="container-narrow">
          <div className="badge mb-4">О нас</div>
          <h1 className="text-balance font-display text-5xl font-bold text-ocean-500 sm:text-6xl">
            Мы верим, что каждый может запустить сайт
          </h1>
          <p className="mt-6 text-balance text-xl text-ocean-500/70">
            Без кода, без конструктора, без 8-часового обучения. Просто напишите, что хотите — ИИ-агент
            сделает остальное.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Value
              icon={Sparkles}
              title="Честный ИИ"
              description="Не маркетинговый bullshit. Реальная LLM (MiniMax M3) генерирует чистый код, не копипастит шаблоны."
            />
            <Value
              icon={Globe}
              title="Российский хостинг"
              description="Layero CDN в 3 регионах. Сайты открываются за 50мс. Без блокировок Роскомнадзора."
            />
            <Value
              icon={Code2}
              title="Код принадлежит вам"
              description="GitHub export в 1 клик. Исходники ваши — деплойте куда хотите, модифицируйте как хотите."
            />
            <Value
              icon={Users}
              title="Open-source дух"
              description="Мы пишем в Telegram-канале про каждый релиз. Pull requests приветствуются."
            />
          </div>

          <div id="privacy" className="mt-20 rounded-2xl border border-ocean-500/10 bg-white p-8">
            <h2 className="text-2xl font-semibold text-ocean-500">Конфиденциальность</h2>
            <ul className="mt-4 space-y-3 text-ocean-500/80">
              <li>• Ваши промты не используются для обучения LLM</li>
              <li>• База данных изолирована (не торчит наружу через firewall)</li>
              <li>• fail2ban блокирует brute-force атаки</li>
              <li>• Платежи через ЮKassa — данные карт не хранятся у нас</li>
              <li>• Telegram-боты работают через официальный Bot API</li>
            </ul>
          </div>

          <div className="mt-16 text-center">
            <Heart className="mx-auto h-8 w-8 text-coral" fill="currentColor" />
            <p className="mt-3 text-sm text-ocean-500/50">
              Сделано в России. Один разработчик + ИИ-агенты.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Value({ icon: Icon, title, description }: { icon: typeof Sparkles; title: string; description: string }) {
  return (
    <div className="card">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tide-500/10 text-tide-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ocean-500">{title}</h3>
      <p className="mt-2 text-ocean-500/70">{description}</p>
    </div>
  );
}
