import { Pricing } from '@/components/landing/Pricing';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { CTA } from '@/components/landing/CTA';

export const metadata = { title: 'Тарифы' };

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
