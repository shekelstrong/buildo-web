import Link from 'next/link';
import { ArrowRight, Globe, Plus } from 'lucide-react';

export default function DashboardPage() {
  // MVP: mock data
  const sites = [
    { id: '1', name: 'Кофейня Утро', url: 'utro.layero.app', status: 'live', created: '2026-06-08' },
    { id: '2', name: 'Барбершоп Бритва', url: 'britva.layero.app', status: 'draft', created: '2026-06-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-ocean-500">Мои сайты</h1>
        <Link href="/dashboard/sites/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Новый сайт
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Активных сайтов" value="1" hint="из 1 бесплатно" />
        <Stat label="Сгенерировано файлов" value="13" />
        <Stat label="Тариф" value="Free" hint="Pro: 990 ₽/мес" />
      </div>

      <div className="space-y-3">
        {sites.length === 0 ? (
          <EmptyState />
        ) : (
          sites.map((site) => <SiteCard key={site.id} site={site} />)
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card">
      <div className="text-sm text-ocean-500/60">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold text-ocean-500">{value}</div>
      {hint && <div className="mt-1 text-xs text-ocean-500/50">{hint}</div>}
    </div>
  );
}

function SiteCard({ site }: { site: { id: string; name: string; url: string; status: string; created: string } }) {
  return (
    <Link
      href={`/dashboard/sites/${site.id}`}
      className="card group flex items-center justify-between transition-all hover:border-tide-500/30"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tide-500/10 text-tide-600">
          <Globe className="h-6 w-6" />
        </div>
        <div>
          <div className="font-medium text-ocean-500">{site.name}</div>
          <div className="mt-0.5 text-sm text-ocean-500/60">
            {site.url} · {site.created}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            site.status === 'live'
              ? 'bg-tide-500/10 text-tide-600'
              : 'bg-amber/10 text-amber'
          }`}
        >
          {site.status === 'live' ? 'Live' : 'Черновик'}
        </span>
        <ArrowRight className="h-4 w-4 text-ocean-500/30 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="card py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tide-500/10">
        <Globe className="h-8 w-8 text-tide-600" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-ocean-500">У вас пока нет сайтов</h3>
      <p className="mt-2 text-ocean-500/60">Создайте первый сайт — это бесплатно и занимает 2 минуты</p>
      <Link href="/dashboard/sites/new" className="btn-primary mt-6 inline-flex">
        <Plus className="h-4 w-4" />
        Создать сайт
      </Link>
    </div>
  );
}
