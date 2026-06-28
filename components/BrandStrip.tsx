"use client";

import { useEffect, useState } from "react";

export interface BrandLogo {
  name: string;
  /** URL или SVG. Можно давать и data-uri для инлайна. */
  src: string;
  /** Используется если src не указан — будет нарисован первый символ name. */
  fallback?: string;
  url?: string;
}

interface Props {
  title?: string;
  /** Заголовок-эпиграф справа от ленты (опционально). */
  eyebrow?: string;
  brands: BrandLogo[];
  /** sm = 24px лого, md = 32px, lg = 40px. */
  size?: "sm" | "md" | "lg";
  /** Скорость прокрутки в секундах на полный цикл. */
  speed?: number;
  variant?: "scroll" | "grid";
  /** Светлая или тёмная тема — влияет на цвет подложек/mask. */
  theme?: "light" | "dark";
  /** Дополнительные классы секции. */
  className?: string;
  /** Показывать статичную сетку под бегущей строкой (двойной trust). */
  showGrid?: boolean;
  /** Сколько лого в гриде при showGrid (по умолчанию 6). */
  gridCount?: number;
  /** Альтернативный набор брендов для грида (если не задан, берётся brands.slice(0, gridCount)). */
  featured?: BrandLogo[];
}

const sizeMap = {
  sm: { logo: "h-5", gap: "gap-10", text: "text-xs", pad: "py-6" },
  md: { logo: "h-7", gap: "gap-14", text: "text-sm", pad: "py-8" },
  lg: { logo: "h-9", gap: "gap-16", text: "text-base", pad: "py-10" },
};

/**
 * BrandStrip — бегущая строка с логотипами брендов/интеграций + опциональная
 * статичная сетка для двойного уровня доверия.
 *
 * - Pause on hover (по ТЗ конкурентов — CustomGPT, Botpress, Bothelp).
 * - Gradient mask по краям (мягкое затухание, без жёсткой обрезки).
 * - prefers-reduced-motion → отключает анимацию.
 * - ARIA-friendly: aria-label="Trusted by", role="region".
 * - Адаптивно: на мобиле показывает статичную сетку, на десктопе — скролл.
 *
 * Пример:
 *   <BrandStrip
 *     eyebrow="Trusted by"
 *     title="Команды, которые автоматизируют на Nemo"
 *     brands={TECH_BRANDS}
 *     showGrid
 *     theme="light"
 *   />
 */
export function BrandStrip({
  eyebrow,
  title,
  brands,
  size = "md",
  speed = 36,
  variant = "scroll",
  theme = "light",
  className = "",
  showGrid = false,
  gridCount = 6,
  featured,
}: Props) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sizing = sizeMap[size];

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const onChange = () => setReducedMotion(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  // Doubling для seamless loop
  const doubled = [...brands, ...brands];

  const isDark = theme === "dark";

  // Цвета масок
  const maskLeft = isDark
    ? "from-bg to-transparent"
    : "from-paper to-transparent";
  const maskRight = isDark
    ? "from-bg to-transparent"
    : "from-paper to-transparent";
  const sectionBg = isDark ? "bg-bg" : "bg-paper";
  const textColor = isDark ? "text-ink-dim" : "text-ink-dim";
  const headingColor = isDark ? "text-paper" : "text-ink";
  const borderColor = isDark ? "border-paper/10" : "border-line";

  // Лого fallback (если src невалиден)
  const renderLogo = (b: BrandLogo, key: string | number) => {
    const inner = b.src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={b.src}
        alt={b.name}
        loading="lazy"
        className={`${sizing.logo} w-auto ${
          isDark ? "opacity-80 hover:opacity-100" : "opacity-60 hover:opacity-100"
        } transition-opacity duration-300 grayscale-0`}
      />
    ) : (
      <span
        className={`font-display ${sizing.text} ${
          isDark ? "text-paper" : "text-ink"
        } opacity-70`}
      >
        {b.fallback || b.name}
      </span>
    );

    if (b.url) {
      return (
        <a
          key={key}
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center"
          title={b.name}
        >
          {inner}
        </a>
      );
    }
    return (
      <div
        key={key}
        className="flex-shrink-0 flex items-center"
        title={b.name}
      >
        {inner}
      </div>
    );
  };

  return (
    <section
      className={`relative ${sectionBg} ${className}`}
      role="region"
      aria-label={title || eyebrow || "Trusted by"}
    >
      {/* Верхняя граница */}
      <div
        className={`absolute inset-x-0 top-0 h-px ${borderColor}`}
        aria-hidden
      />
      {/* Нижняя граница */}
      <div
        className={`absolute inset-x-0 bottom-0 h-px ${borderColor}`}
        aria-hidden
      />

      <div className={`mx-auto max-w-7xl px-6 ${sizing.pad}`}>
        {/* Header */}
        {(eyebrow || title) && (
          <div className="mb-8 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              {eyebrow && (
                <p
                  className={`font-mono ${sizing.text} uppercase tracking-[0.2em] ${textColor}`}
                >
                  {eyebrow}
                </p>
              )}
              {title && (
                <p
                  className={`mt-1 font-display text-lg ${headingColor} opacity-90`}
                >
                  {title}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Static grid (по ТЗ — "двойной trust") */}
        {showGrid && (
          <div className="mb-10 grid grid-cols-3 gap-x-6 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
            {(featured ?? brands).slice(0, gridCount).map((b, i) => (
              <div
                key={`g-${i}`}
                className="flex items-center justify-center"
                title={b.name}
              >
                {renderLogo(b, `gi-${i}`)}
              </div>
            ))}
          </div>
        )}

        {/* Marquee */}
        {variant === "scroll" && (
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Gradient masks */}
            <div
              className={`absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r ${maskLeft}`}
              aria-hidden
            />
            <div
              className={`absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l ${maskRight}`}
              aria-hidden
            />

            {/* Scrolling track */}
            <div
              className={`flex ${sizing.gap} ${
                paused || reducedMotion ? "" : "animate-scroll"
              }`}
              style={
                paused || reducedMotion
                  ? undefined
                  : { animationDuration: `${speed}s` }
              }
            >
              {doubled.map((b, i) => renderLogo(b, `s-${i}`))}
            </div>
          </div>
        )}

        {/* Pure grid mode */}
        {variant === "grid" && (
          <div className="grid grid-cols-3 gap-x-6 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
            {brands.map((b, i) => (
              <div
                key={`p-${i}`}
                className="flex items-center justify-center p-3"
                title={b.name}
              >
                {renderLogo(b, `p-${i}`)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BrandStrip;
