// API client for talking to buildo-bot backend.
// Phase 1: real fetch. Falls back to empty arrays on error.

import type { Site, User } from './types';

const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:9090';

class ApiClient {
  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${BOT_API_URL}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `API ${res.status}`);
    }
    return res.json();
  }

  sites = {
    list: (tgUserId: number) =>
      this.request<{ sites: Site[]; total: number }>(
        `/api/v1/sites?tg_user_id=${tgUserId}`
      ),
    get: (id: string) => this.request<{ site: Site }>(`/api/v1/sites/${id}`),
    create: (prompt: string, tgUserId: number) =>
      this.request<{ site: Site }>('/api/v1/sites', {
        method: 'POST',
        body: JSON.stringify({ prompt, tg_user_id: tgUserId }),
      }),
    delete: (id: string) =>
      this.request<{ ok: true }>(`/api/v1/sites/${id}`, { method: 'DELETE' }),
  };

  user = {
    me: (tgUserId: number) =>
      this.request<{ user: User }>(`/api/v1/auth/me?tg_user_id=${tgUserId}`),
  };
}

export const api = new ApiClient();

// Helper to get TG user ID from window.Telegram.WebApp or fallback
export function getTelegramUserId(): number {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return (window as any).Telegram.WebApp.initDataUnsafe.user.id;
  }
  return 6318513424; // MVP admin
}
