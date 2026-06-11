const steps = [
  {
    n: '01',
    title: 'Пишете промт',
    description: 'Открываете @buildo_aibot в Telegram и пишете: «лендинг для кофейни Утро на Патриарших, 6 позиций в меню, контакты».',
  },
  {
    n: '02',
    title: 'ИИ генерирует',
    description: 'Агент (MiniMax M3 + taste-skill v2) делает 5-8 файлов: HTML, CSS, JS, README. С контентом, дизайном, адаптивом.',
  },
  {
    n: '03',
    title: 'Смотрите preview',
    description: 'Бот показывает список файлов, превью дизайна, предлагает правки. Можно попросить изменить палитру, шрифты, секции.',
  },
  {
    n: '04',
    title: 'Деплой в 1 клик',
    description: 'Подтверждаете → сайт за 30 секунд появляется на Layero с SSL. Ссылка utro.layero.app приходит в боте.',
  },
  {
    n: '05',
    title: 'Качаете в GitHub',
    description: 'Хотите развивать сами? Кнопка «Export to GitHub» — репо с полным кодом у вас.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge mb-4">Как работает</div>
          <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
            5 шагов от идеи до сайта
          </h2>
          <p className="mt-4 text-balance text-lg text-ocean-500/70">
            Без регистрации, без банковской карты, без «сначала изучите документацию».
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-tide-500/0 via-tide-500/30 to-tide-500/0 lg:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`grid grid-cols-1 items-center gap-6 lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className={i % 2 === 1 ? 'lg:pl-12' : 'lg:pr-12'}>
                  <div className="text-6xl font-bold text-tide-500/20">{step.n}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-ocean-500">{step.title}</h3>
                  <p className="mt-3 text-ocean-500/70">{step.description}</p>
                </div>
                <div
                  className={`card noise-bg aspect-video ${
                    i % 2 === 1 ? 'lg:mr-12' : 'lg:ml-12'
                  }`}
                >
                  <div className="flex h-full items-center justify-center text-ocean-500/30">
                    <span className="font-mono text-sm">[визуализация шага {step.n}]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
