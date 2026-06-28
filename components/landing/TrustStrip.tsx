"use client";

import { BrandStrip } from "@/components/BrandStrip";
import { BUILDO_FEATURED, BUILDO_ALL } from "@/lib/brands";

/**
 * TrustStrip — секция доверия с двойным эффектом:
 *  1. Статичная сетка 6 ключевых брендов (Featured)
 *  2. Бегущая строка с полным стеком (Marquee)
 *
 * Размещается сразу после Hero — best practice.
 */
export function TrustStrip() {
  return (
    <BrandStrip
      eyebrow="Стек"
      title="Технологии и платформы, на которых работает Buildo"
      brands={BUILDO_ALL}
      featured={BUILDO_FEATURED}
      showGrid
      gridCount={6}
      theme="dark"
      size="md"
      speed={42}
      className="bg-ocean-700"
    />
  );
}
