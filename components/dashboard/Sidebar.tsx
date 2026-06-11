'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Plus, User, LogOut, Globe } from 'lucide-react';
import { clsx } from 'clsx';

const links = [
  { href: '/dashboard', label: 'Обзор', icon: LayoutDashboard },
  { href: '/dashboard/sites/new', label: 'Новый сайт', icon: Plus },
  { href: '/dashboard/profile', label: 'Профиль', icon: User },
];

export function DashboardSidebar({ user }: { user: { name: string; email: string; avatar: string | null } }) {
  const pathname = usePathname();
  return (
    <aside className="sticky top-20 hidden h-fit w-56 shrink-0 md:block">
      <div className="card !p-4">
        <div className="flex items-center gap-3 border-b border-ocean-500/5 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-tide-500 to-tide-600 text-sm font-medium text-white">
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-ocean-500">{user.name}</div>
            <div className="truncate text-xs text-ocean-500/50">{user.email}</div>
          </div>
        </div>

        <nav className="mt-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-tide-500/10 font-medium text-tide-600'
                    : 'text-ocean-500/70 hover:bg-ocean-500/5 hover:text-ocean-500'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <button className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-ocean-500/60 transition-colors hover:bg-coral/5 hover:text-coral">
          <LogOut className="h-4 w-4" />
          Выйти
        </button>
      </div>
    </aside>
  );
}
