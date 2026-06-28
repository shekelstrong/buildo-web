import type { BrandLogo } from "@/components/BrandStrip";

/**
 * Buildo — бренды технологий и платформ, которые мы используем / поддерживаем
 * в AI-агенте, создающем сайты.
 *
 * Источник: simpleicons.org (CC0) +/clients/*.svg
 */

export const BUILDO_AI_STACK: BrandLogo[] = [
  { name: "OpenAI", src: "/clients/openai.svg" },
  { name: "Anthropic", src: "/clients/anthropic.svg" },
  { name: "Gemini", src: "/clients/googlegemini.svg" },
  { name: "Hugging Face", src: "/clients/huggingface.svg" },
  { name: "Yandex Cloud", src: "/clients/yandexcloud.svg" },
  { name: "VK Cloud", src: "/clients/vkcloud.svg" },
];

export const BUILDO_DEPLOY: BrandLogo[] = [
  { name: "Vercel", src: "/clients/vercel.svg" },
  { name: "Netlify", src: "/clients/netlify.svg" },
  { name: "Cloudflare", src: "/clients/cloudflare.svg" },
  { name: "Docker", src: "/clients/docker.svg" },
  { name: "Nginx", src: "/clients/nginx.svg" },
  { name: "GitHub", src: "/clients/github.svg" },
];

export const BUILDO_DEV: BrandLogo[] = [
  { name: "Next.js", src: "/clients/nextdotjs.svg" },
  { name: "React", src: "/clients/react.svg" },
  { name: "Node.js", src: "/clients/nodedotjs.svg" },
  { name: "TypeScript", src: "/clients/typescript.svg" },
  { name: "Python", src: "/clients/python.svg" },
  { name: "FastAPI", src: "/clients/fastapi.svg" },
  { name: "Tailwind CSS", src: "/clients/tailwindcss.svg" },
  { name: "Figma", src: "/clients/figma.svg" },
];

export const BUILDO_PAYMENTS: BrandLogo[] = [
  { name: "ЮKassa", src: "/clients/yookassa.svg" },
  { name: "Stripe", src: "/clients/stripe.svg" },
];

export const BUILDO_DATA: BrandLogo[] = [
  { name: "PostgreSQL", src: "/clients/postgresql.svg" },
  { name: "Redis", src: "/clients/redis.svg" },
];

// Полный набор для marquee (без дубликатов по slug)
export const BUILDO_ALL: BrandLogo[] = [
  ...BUILDO_AI_STACK,
  ...BUILDO_DEPLOY,
  ...BUILDO_DEV,
  ...BUILDO_PAYMENTS,
  ...BUILDO_DATA,
];

// Топ-6 для статичной сетки (двойной trust)
export const BUILDO_FEATURED: BrandLogo[] = [
  BUILDO_AI_STACK[0], // OpenAI
  BUILDO_AI_STACK[1], // Anthropic
  BUILDO_DEPLOY[0],   // Vercel
  BUILDO_DEV[0],      // Next.js
  BUILDO_PAYMENTS[0],  // ЮKassa
  BUILDO_DEPLOY[2],   // Cloudflare
];
