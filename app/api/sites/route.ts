import { NextResponse } from 'next/server';
import type { Site } from '@/lib/types';

// Mock data store (Phase 1.5: replace with real API call to buildo-bot backend)
const mockSites: Site[] = [
  {
    id: '1',
    user_id: 1,
    project_id: '1',
    project_name: 'Кофейня Утро',
    domain: 'utro.layero.app',
    deploy_target: 'layero',
    deploy_url: 'https://utro.layero.app',
    deploy_id: 'demo-1',
    status: 'published',
    last_deploy_at: '2026-06-08T10:00:00Z',
    created_at: '2026-06-08T10:00:00Z',
    files_count: 8,
    size_kb: 42,
    preview_summary: 'Лендинг кофейни в центре Москвы',
  },
  {
    id: '2',
    user_id: 1,
    project_id: '2',
    project_name: 'Барбершоп Бритва',
    domain: null,
    deploy_target: null,
    deploy_url: null,
    deploy_id: null,
    status: 'draft',
    last_deploy_at: null,
    created_at: '2026-06-10T15:30:00Z',
    files_count: 5,
    size_kb: 18,
    preview_summary: null,
  },
];

export async function GET() {
  // TODO Phase 1.5:
  // const session = await getServerSession();
  // if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // const res = await fetch(`${process.env.BOT_API_URL}/api/sites`, {
  //   headers: { Authorization: `Bearer ${session.user.botToken}` }
  // });
  // return NextResponse.json(await res.json());

  return NextResponse.json({ sites: mockSites, total: mockSites.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  if (!prompt || typeof prompt !== 'string' || prompt.length < 10) {
    return NextResponse.json({ error: 'prompt_too_short', min_length: 10 }, { status: 400 });
  }

  // TODO Phase 1.5: forward to bot backend
  // const res = await fetch(`${process.env.BOT_API_URL}/api/sites`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  //   body: JSON.stringify({ prompt })
  // });

  // Mock response
  const newSite: Site = {
    id: Math.random().toString(36).slice(2, 11),
    user_id: 1,
    project_id: Math.random().toString(36).slice(2, 11),
    project_name: prompt.split(' ').slice(0, 3).join(' '),
    domain: null,
    deploy_target: null,
    deploy_url: null,
    deploy_id: null,
    status: 'draft',
    last_deploy_at: null,
    created_at: new Date().toISOString(),
    files_count: 0,
    size_kb: 0,
    preview_summary: null,
  };
  mockSites.push(newSite);

  return NextResponse.json({ site: newSite }, { status: 201 });
}
