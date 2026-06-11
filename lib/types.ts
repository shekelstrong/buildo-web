// Shared types between buildo-web and buildo-bot backend
// Matches the real API response from /api/v1/sites

export interface Site {
  id: string;
  user_id: number;
  project_id: string;
  project_name: string;
  domain: string | null;
  deploy_target: 'layero' | 'github' | 'gitverse' | null;
  deploy_url: string | null;
  deploy_id: string | null;
  status: 'deployed' | 'published' | 'draft' | 'failed' | 'deleted';
  last_deploy_at: string | null;
  created_at: string;
  // Optional fields from list endpoint
  files_count?: number;
  size_kb?: number;
  preview_summary?: string;
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
  detail: string;
  // or
  error?: string;
  message?: string;
}
