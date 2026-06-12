'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Plus, ExternalLink } from 'lucide-react';
import { api, getTelegramUserId } from '@/lib/api';
import type { Site } from '@/lib/types';

export default function DashboardPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSites();
  }, []);

  async function loadSites() {
    try {
      const tgId = getTelegramUserId();
      const res = await api.sites.list(tgId);
      setSites(res.sites);
    } catch (e: any) {
      setError(e.message || 'Не удалось загрузить сайты');
    } finally {
      setLoading(false);
    }
  }

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
        <Stat label="Активных сайтов" value={String(sites.length)} hint="из 1 бесплатно" />
        <Stat
          label="Сгенерировано файлов"
          value={String(sites.reduce((sum, s) => sum + (s as any).files_count || 0, 0))}
        />
        <Stat label="Тариф" value="Free" hint="Pro: 990 ₽/мес" />
      </div>

      {error && (
        <div className="card border-amber/30 bg-amber/5 text-sm text-ocean-500">
          ⚠️ Не удалось загрузить с backend: {error}
          <br />
          <span className="text-xs text-ocean-500/60">
            Убедись что <code>NEXT_PUBLIC_BOT_API_URL</code> указывает на бот.
          </span>
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <div className="card py-12 text-center text-ocean-500/60">Загружаю...</div>
        ) : sites.length === 0 ? (
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

function SiteCard({ site }: { site: Site }) {
  const url = (site as any).deploy_url || (site as any).url;
  const status = (site as any).status || 'draft';
  const created = (site as any).created_at?.slice(0, 10) || '';

  return (
    <div className="card flex items-center justify-between">
      <Link
        href={`/dashboard/sites/${site.id}`}
        className="flex flex-1 items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tide-500/10 text-tide-600">
          <Globe className="h-6 w-6" />
        </div>
        <div>
          <div className="font-medium text-ocean-500">
            {site.project_name ?? (site as { name?: string }).name ?? 'Без названия'}
          </div>
          <div className="mt-0.5 text-sm text-ocean-500/60">
            {url || 'нет URL'} · {created}
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-ocean-500/50 hover:bg-tide-500/10 hover:text-tide-600"
            title="Открыть"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            status === 'published' || status === 'deployed'
              ? 'bg-tide-500/10 text-tide-600'
              : 'bg-amber/10 text-amber'
          }`}
        >
          {status === 'published' || status === 'deployed' ? 'Live' : 'Черновик'}
        </span>
        <Link
          href={`/dashboard/sites/${site.id}`}
          className="rounded-lg p-2 text-ocean-500/30 hover:bg-ocean-500/5"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tide-500/10">
        <Globe className="h-8 w-8 text-tide-600" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-ocean-500">
        У вас пока нет сайтов
      </h3>
      <p className="mt-2 text-ocean-500/60">
        Создайте первый сайт — это бесплатно и занимает 2 минуты
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/dashboard/sites/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Создать сайт
        </Link>
        <a
          href="https://t.me/buildo_aibot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-tide-600 hover:underline"
        >
          или открой @buildo_aibot →
        </a>
      </div>
    </div>
  );
}
