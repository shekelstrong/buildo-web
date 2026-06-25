'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Bot, MessageSquare, ShoppingCart, Users, Brain, Lock, Settings, Zap, Check, ArrowRight, Plus, Minus } from 'lucide-react';

// =====================================================
//  КОНФИГУРАТОР WHITE-LABEL AI-АГЕНТА
//  Каждый блок управляет изолированным «клоном» агента.
//  Секреты владельца (ЛЛМ-ключи, оркестратор) НЕ утекают
//  в клиентский конфиг — клиент настраивает только своё.
// =====================================================

type ModuleKey = 'sales' | 'support' | 'hiring' | 'analytics';
type Channel = 'telegram' | 'whatsapp' | 'vk' | 'web';
type Tone = 'formal' | 'friendly' | 'expert' | 'casual';
type Language = 'ru' | 'en' | 'multi';

interface ConfigState {
  modules: Record<ModuleKey, boolean>;
  channels: Record<Channel, boolean>;
  tone: Tone;
  language: Language;
  knowledgeBase: string;
  productName: string;
  responseSpeed: 'instant' | 'fast' | 'normal';
  monthlyBudget: number;
  workingHours: '24-7' | 'business' | 'custom';
}

const MODULE_DEFS: { key: ModuleKey; title: string; desc: string; price: number; icon: any }[] = [
  { key: 'sales', title: 'Продажи', desc: 'Квалификация лида, ведение до сделки, follow-up, бронирование', price: 12000, icon: ShoppingCart },
  { key: 'support', title: 'Поддержка', desc: '24/7 ответы по базе знаний, эскалация на оператора', price: 8000, icon: MessageSquare },
  { key: 'hiring', title: 'Найм', desc: 'Скрининг резюме, первичное интервью, онбординг новых сотрудников', price: 10000, icon: Users },
  { key: 'analytics', title: 'Аналитика', desc: 'Дашборд диалогов, NPS, конверсии, A/B тесты сообщений', price: 6000, icon: Brain },
];

const CHANNEL_DEFS: { key: Channel; title: string; price: number }[] = [
  { key: 'telegram', title: 'Telegram', price: 0 },
  { key: 'whatsapp', title: 'WhatsApp Business', price: 2000 },
  { key: 'vk', title: 'ВКонтакте', price: 1500 },
  { key: 'web', title: 'Виджет на сайт', price: 1500 },
];

const TONE_DEFS: { key: Tone; label: string; example: string }[] = [
  { key: 'formal', label: 'Деловой', example: 'Здравствуйте! Готовы обсудить вашу задачу.' },
  { key: 'friendly', label: 'Дружелюбный', example: 'Привет! Расскажи, чем могу помочь 🙂' },
  { key: 'expert', label: 'Экспертный', example: 'Проанализировал ваш запрос. Вот рекомендация...' },
  { key: 'casual', label: 'Неформальный', example: 'Йо! Какой вопрос — разберёмся.' },
];

function priceFor(cfg: ConfigState): { base: number; extra: number; total: number } {
  const base = 5000; // базовый клон
  const modules = MODULE_DEFS.filter(m => cfg.modules[m.key]).reduce((s, m) => s + m.price, 0);
  const channels = CHANNEL_DEFS.filter(c => cfg.channels[c.key]).reduce((s, c) => s + c.price, 0);
  const extra = modules + channels;
  // -20% если выбрано 3+ модуля
  const discount = Object.values(cfg.modules).filter(Boolean).length >= 3 ? 0.8 : 1;
  const subtotal = (base + extra) * discount;
  return { base, extra, total: Math.round(subtotal) };
}

export function AIConfigurator() {
  const [cfg, setCfg] = useState<ConfigState>({
    modules: { sales: true, support: false, hiring: false, analytics: false },
    channels: { telegram: true, whatsapp: false, vk: false, web: false },
    tone: 'friendly',
    language: 'ru',
    knowledgeBase: '',
    productName: '',
    responseSpeed: 'fast',
    monthlyBudget: 50000,
    workingHours: '24-7',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const prices = priceFor(cfg);

  const toggle = <K extends keyof ConfigState['modules']>(key: K) =>
    setCfg(s => ({ ...s, modules: { ...s.modules, [key]: !s.modules[key] } }));

  const toggleCh = <K extends keyof ConfigState['channels']>(key: K) =>
    setCfg(s => ({ ...s, channels: { ...s.channels, [key]: !s.channels[key] } }));

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* LEFT: configurator */}
      <div className="lg:col-span-2 space-y-6">
        {/* Modules */}
        <section className="card">
          <header className="flex items-baseline justify-between mb-4">
            <h3 className="font-display text-xl font-semibold text-ocean-500">Модули агента</h3>
            <span className="text-sm text-ocean-500/60">Выбери ≥1</span>
          </header>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {MODULE_DEFS.map(m => {
              const Icon = m.icon;
              const on = cfg.modules[m.key];
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => toggle(m.key)}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                    on
                      ? 'border-tide-500 bg-tide-500/5 shadow-sm'
                      : 'border-ocean-500/10 bg-cream hover:border-ocean-500/30'
                  }`}
                >
                  {on && (
                    <span className="absolute top-2 right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-tide-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                  <Icon className={`h-6 w-6 ${on ? 'text-tide-500' : 'text-ocean-500/40'}`} />
                  <div className="mt-2 font-semibold text-ocean-500">{m.title}</div>
                  <div className="mt-1 text-xs text-ocean-500/60">{m.desc}</div>
                  <div className="mt-2 text-sm font-mono text-tide-600">+{m.price.toLocaleString('ru-RU')} ₽/мес</div>
                </button>
              );
            })}
          </div>
          {Object.values(cfg.modules).filter(Boolean).length >= 3 && (
            <p className="mt-3 text-sm text-tide-600">🎉 Скидка 20% при 3+ модулях применена</p>
          )}
        </section>

        {/* Channels */}
        <section className="card">
          <header className="flex items-baseline justify-between mb-4">
            <h3 className="font-display text-xl font-semibold text-ocean-500">Каналы связи</h3>
            <span className="text-sm text-ocean-500/60">Telegram включён</span>
          </header>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHANNEL_DEFS.map(c => {
              const on = cfg.channels[c.key];
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => toggleCh(c.key)}
                  disabled={c.key === 'telegram'}
                  className={`rounded-lg border-2 px-3 py-3 text-sm font-medium transition-all ${
                    on
                      ? 'border-tide-500 bg-tide-500/10 text-tide-700'
                      : 'border-ocean-500/10 bg-cream text-ocean-500/60 hover:border-ocean-500/30'
                  } ${c.key === 'telegram' ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {c.title}
                  <div className="mt-1 text-xs text-ocean-500/50">
                    {c.price === 0 ? 'бесплатно' : `+${c.price.toLocaleString('ru-RU')} ₽`}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Personality */}
        <section className="card">
          <h3 className="font-display text-xl font-semibold text-ocean-500 mb-4">Характер и язык</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-ocean-500">Тон общения</label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TONE_DEFS.map(t => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setCfg(s => ({ ...s, tone: t.key }))}
                    className={`rounded-lg border-2 px-3 py-2 text-sm transition-all ${
                      cfg.tone === t.key
                        ? 'border-tide-500 bg-tide-500/10 text-tide-700'
                        : 'border-ocean-500/10 text-ocean-500/60 hover:border-ocean-500/30'
                    }`}
                    title={t.example}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-ocean-500/50 italic">
                Пример: «{TONE_DEFS.find(t => t.key === cfg.tone)?.example}»
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-ocean-500">Язык</label>
                <select
                  value={cfg.language}
                  onChange={e => setCfg(s => ({ ...s, language: e.target.value as Language }))}
                  className="mt-1 w-full rounded-lg border border-ocean-500/20 bg-cream px-3 py-2 text-sm"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                  <option value="multi">Мульти (авто-определение)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-ocean-500">Скорость ответа</label>
                <select
                  value={cfg.responseSpeed}
                  onChange={e => setCfg(s => ({ ...s, responseSpeed: e.target.value as any }))}
                  className="mt-1 w-full rounded-lg border border-ocean-500/20 bg-cream px-3 py-2 text-sm"
                >
                  <option value="instant">Мгновенно (&lt;1 сек)</option>
                  <option value="fast">Быстро (2–3 сек)</option>
                  <option value="normal">Обычно (5–10 сек)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Base */}
        <section className="card">
          <h3 className="font-display text-xl font-semibold text-ocean-500 mb-1">База знаний</h3>
          <p className="text-sm text-ocean-500/60 mb-4">
            Опиши продукт/компанию. После оплаты мы загрузим твои PDF, документы, FAQ — и будем пополнять ежемесячно.
          </p>
          <input
            type="text"
            placeholder="Название продукта или компании"
            value={cfg.productName}
            onChange={e => setCfg(s => ({ ...s, productName: e.target.value }))}
            className="mb-3 w-full rounded-lg border border-ocean-500/20 bg-cream px-4 py-2.5 text-sm"
          />
          <textarea
            rows={4}
            placeholder="Что должен знать агент? (потом заменим на загрузку PDF/ссылок)"
            value={cfg.knowledgeBase}
            onChange={e => setCfg(s => ({ ...s, knowledgeBase: e.target.value }))}
            className="w-full rounded-lg border border-ocean-500/20 bg-cream px-4 py-2.5 text-sm resize-none"
          />
          <div className="mt-3 flex items-center gap-2 text-xs text-ocean-500/50">
            <Lock className="h-3.5 w-3.5" />
            Ваши секреты (ЛЛМ-ключи, внутренняя БД) остаются у нас. Клиент настраивает только свои данные.
          </div>
        </section>
      </div>

      {/* RIGHT: summary + CTA */}
      <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
        <div className="card !bg-gradient-to-br from-ocean-500 to-ocean-700 text-white !shadow-2xl">
          <div className="flex items-baseline gap-2">
            <Bot className="h-6 w-6 text-tide-300" />
            <h3 className="font-display text-xl font-semibold">Твой клон</h3>
          </div>
          <p className="mt-1 text-sm text-white/70">
            Готов к запуску через 5 дней. С ежемесячным обслуживанием и пополнением БЗ.
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between text-white/80">
              <span>Базовый клон</span>
              <span className="font-mono">{prices.base.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Модули и каналы</span>
              <span className="font-mono">+{prices.extra.toLocaleString('ru-RU')} ₽</span>
            </div>
            {Object.values(cfg.modules).filter(Boolean).length >= 3 && (
              <div className="flex justify-between text-tide-300">
                <span>Скидка 3+ модулей</span>
                <span className="font-mono">−20%</span>
              </div>
            )}
            <div className="border-t border-white/20 pt-3 mt-3">
              <div className="flex items-baseline justify-between">
                <span className="text-white/80">Итого в месяц</span>
                <span className="font-display text-3xl font-bold text-tide-300">
                  {prices.total.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <p className="mt-1 text-xs text-white/50">Без скрытых платежей. Заморозка 1 мес бесплатно.</p>
            </div>
          </div>

          <Link
            href={`/auth/signin?plan=ai-agent&cfg=${encodeURIComponent(JSON.stringify({ modules: cfg.modules, channels: cfg.channels, tone: cfg.tone }))}`}
            className="mt-6 block w-full rounded-lg bg-tide-500 px-6 py-3 text-center font-semibold text-white shadow-md transition-colors hover:bg-tide-600"
          >
            Заказать своего агента
            <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
          <p className="mt-3 text-center text-xs text-white/50">
            Помощь в настройке — бесплатно. Бесплатная демо-версия за 1 день.
          </p>
        </div>

        {/* Guarantees */}
        <div className="card">
          <h4 className="font-semibold text-ocean-500 mb-3">Что входит</h4>
          <ul className="space-y-2 text-sm text-ocean-500/70">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-tide-500" strokeWidth={3} />
              Деплой на наших серверах (РФ)
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-tide-500" strokeWidth={3} />
              Пополнение БЗ — до 5 раз в месяц
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-tide-500" strokeWidth={3} />
              Аналитика диалогов
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-tide-500" strokeWidth={3} />
              Тех-поддержка 24/7
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-tide-500" strokeWidth={3} />
              Без доступа к вашим ключам API
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

// =====================================================
//  FAQ для AI-агентов
// =====================================================
const FAQ_ITEMS = [
  {
    q: 'Как агент «изолирован» от моих данных?',
    a: 'Мы используем multi-tenant архитектуру: каждый клиент — отдельный tenant в нашей БД с Row Level Security. Ваши ЛЛМ-ключи, оркестратор, внутренние сервисы — в отдельном security group. Клиент видит только свою БЗ, свои каналы, свои настройки. Даже при компрометации клиентского аккаунта наши секреты не утекают.',
  },
  {
    q: 'Можно ли потом сменить модули?',
    a: 'Да, в любой момент. Добавить модуль — за 1 день. Убрать — со следующего месяца. Стоимость пересчитывается пропорционально.',
  },
  {
    q: 'Как пополняется база знаний?',
    a: 'Раз в неделю мы с тобой созваниваемся на 15 минут (или ты присылаешь материалы текстом/PDF). Мы обновляем БЗ и тестируем ответы. В среднем — 1 обновление в неделю, до 5 в месяц входит в стоимость.',
  },
  {
    q: 'Что если мой бизнес сезонный?',
    a: 'Можешь поставить агента «на паузу» на любой период до 3 месяцев в году — без оплаты. Это удобно для отелей, курсов, ивент-агентств.',
  },
  {
    q: 'Можно ли подключить CRM/Notion/Google Sheets?',
    a: 'Да. Стандартные интеграции — бесплатно. Нетиповые (1С, AmoCRM Pro, свой API) — от 5 000 ₽ разово за настройку.',
  },
  {
    q: 'Что если я хочу, чтобы агент был на моём домене?',
    a: 'White-label в тарифе Business: твой домен, твой логотип, без упоминания Buildo. Стоимость +10 000 ₽/мес.',
  },
];

export function AIFAQ() {
  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <details
          key={i}
          className="group rounded-xl border border-ocean-500/10 bg-cream open:bg-white open:shadow-sm"
        >
          <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-ocean-500">
            <span>{item.q}</span>
            <Plus className="h-4 w-4 transition-transform group-open:hidden" />
            <Minus className="h-4 w-4 hidden transition-transform group-open:block" />
          </summary>
          <div className="px-4 pb-4 text-sm text-ocean-500/70">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

// =====================================================
//  DEMO CHAT — превью «как это работает»
// =====================================================
export function DemoChat() {
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([
    { from: 'user', text: 'Хочу записаться на стрижку в субботу' },
    { from: 'bot', text: 'Здравствуйте! Свободные слоты в субботу: 11:00, 14:30, 17:00. Какое время удобнее?' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user' as const, text: input };
    const botReplies: Record<string, string> = {
      '14': 'Отлично! Записываю вас на субботу, 14:30. Мастер — Анна. Подтвердить запись?',
      'да': 'Готово! Запись подтверждена. Напомню за 2 часа до визита. Хорошего дня!',
      'цена': 'Мужская стрижка — 2 500 ₽, детская — 1 500 ₽. Дополнительно: борода — 800 ₽.',
    };
    const botMsg = {
      from: 'bot' as const,
      text: botReplies[input.toLowerCase()] || 'Уточните, пожалуйста. Я могу записать, рассказать про цены или услуги.',
    };
    setMessages(m => [...m, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-ocean-500/10 bg-ocean-500/[0.02] px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-coral/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-tide-500/60" />
        <span className="ml-2 text-xs text-ocean-500/50">Демо: AI-агент салона красоты</span>
      </div>
      <div className="h-72 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                m.from === 'user'
                  ? 'bg-tide-500 text-white rounded-tr-sm'
                  : 'bg-ocean-500/5 text-ocean-500/80 rounded-tl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-ocean-500/10 p-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Напишите сообщение..."
          className="flex-1 rounded-lg border border-ocean-500/20 bg-cream px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={send}
          className="rounded-lg bg-tide-500 px-4 py-2 text-sm font-medium text-white hover:bg-tide-600"
        >
          →
        </button>
      </div>
    </div>
  );
}