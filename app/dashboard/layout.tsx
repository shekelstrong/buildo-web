import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // For MVP: hardcoded user. In Phase 1.5 — getServerSession.
  const user = {
    name: 'Демо Юзер',
    email: 'demo@buildo.ru',
    avatar: null,
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="container-wide flex gap-8 py-8">
        <DashboardSidebar user={user} />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
