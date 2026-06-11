import { Zap, Code2, Globe, Smartphone, Shield, GitBranch, MessageSquare, Wallet, Bot } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Telegram-бот',
    description: 'Пишите в боте, как другу. Никаких форм, только естественный язык.',
  },
  {
    icon: Zap,
    title: 'За 2 минуты',
    description: 'LLM-агент (MiniMax M3) генерирует сайт с дизайном, контентом и адаптивом.',
  },
  {
    icon: Code2,
    title: 'Чистый код',
    description: 'Vite + React + TypeScript. Без конструкторов, без бойлерплейта.',
  },
  {
    icon: Globe,
    title: 'Хостинг в РФ',
    description: 'Layero CDN в 3 регионах. Быстро открывается из Москвы, Питера, Казани.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-first',
    description: 'Каждый сайт адаптирован под телефоны. Проверяем на 5 разрешениях.',
  },
  {
    icon: Shield,
    title: 'Безопасно',
    description: 'База данных за firewall, fail2ban, SSL. Ваши данные не утекут.',
  },
  {
    icon: GitBranch,
    title: 'GitHub-export',
    description: 'Скачайте исходники одним кликом. Деплойте куда хотите.',
  },
  {
    icon: Wallet,
    title: 'ЮKassa + СБП',
    description: 'Оплата рублями, картой, через СБП. Telegram Stars — для подписчиков.',
  },
  {
    icon: Bot,
    title: 'ИИ-агенты 24/7',
    description: 'Бот сам обновляет контент, отвечает на вопросы клиентов, ведёт соцсети.',
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-ocean-500/5 bg-white py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge mb-4">Возможности</div>
          <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
            Всё что нужно для запуска сайта
          </h2>
          <p className="mt-4 text-balance text-lg text-ocean-500/70">
            Без скрытых платежей, без бойлерплейта, без часов настройки.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tide-500/10 text-tide-600 transition-colors group-hover:bg-tide-500 group-hover:text-white">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ocean-500">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ocean-500/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
