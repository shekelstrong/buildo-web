// Shared types between buildo-web and buildo-bot backend

export interface Site {
  id: string;
  name: string;
  url: string | null;
  status: 'draft' | 'generating' | 'live' | 'failed';
  created_at: string;
  files_count: number;
  llm_model: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  plan: 'free' | 'pro' | 'business';
  sites_limit: number;
  sites_used: number;
  created_at: string;
}

export interface ApiError {
  error: string;
  message?: string;
  details?: unknown;
}
