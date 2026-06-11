import { NextResponse } from 'next/server';
import type { Site } from '@/lib/types';

// Mock data store (Phase 1.5: replace with real API call to buildo-bot backend)
const mockSites: Site[] = [
  { id: '1', name: 'Кофейня Утро', url: 'utro.layero.app', status: 'live', created_at: '2026-06-08T10:00:00Z', files_count: 8, llm_model: 'MiniMax-Text-01' },
  { id: '2', name: 'Барбершоп Бритва', url: null, status: 'draft', created_at: '2026-06-10T15:30:00Z', files_count: 5, llm_model: 'MiniMax-Text-01' },
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
    name: prompt.split(' ').slice(0, 3).join(' '),
    url: null,
    status: 'generating',
    created_at: new Date().toISOString(),
    files_count: 0,
    llm_model: 'MiniMax-Text-01',
  };
  mockSites.push(newSite);

  return NextResponse.json({ site: newSite }, { status: 201 });
}
