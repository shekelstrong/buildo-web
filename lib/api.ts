// API client for talking to buildo-bot backend.
// In MVP: returns mock data. Phase 1.5: real fetch.

import type { Site, User } from './types';

const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:8888';

class ApiClient {
  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${BOT_API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
    return res.json();
  }

  sites = {
    list: () => this.request<{ sites: Site[]; total: number }>('/api/sites'),
    get: (id: string) => this.request<{ site: Site }>(`/api/sites/${id}`),
    create: (prompt: string) =>
      this.request<{ site: Site }>('/api/sites', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      }),
    delete: (id: string) =>
      this.request<{ ok: true }>(`/api/sites/${id}`, { method: 'DELETE' }),
  };

  user = {
    me: () => this.request<{ user: User }>('/api/auth/me'),
  };
}

export const api = new ApiClient();
