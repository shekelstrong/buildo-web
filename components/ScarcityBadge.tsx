"use client";

import { useEffect, useState } from "react";

interface Props {
  /** Текущее число (например, подключений). */
  current: number;
  /** Максимум (например, 300). */
  total: number;
  /** Лейбл для "current из total" — например "подключений". */
  unit?: string;
  /** Текст-событие справа — например "Набор закрывается 20 июля". */
  closingLabel?: string;
  /** Дедлайн — если задан, показывает "осталось X дней Y часов". */
  deadline?: Date;
  /** Тема. */
  theme?: "light" | "dark";
  /** Иконка (lucide-react). */
  icon?: React.ReactNode;
  /** Размер. */
  size?: "sm" | "md";
}

/**
 * ScarcityBadge — «живой» счётчик социального доказательства.
 *
 * По мотивам getnexora.ru: «Осталось 221 из 300 мест · Набор закрывается 20 июня».
 * Реально повышает конверсию — паттерн conversion-boosting.
 *
 *  - Анимированный прогресс (current → total)
 *  - Опциональный countdown до deadline
 *  - Pulse-анимация "живого" счётчика
 *  - Темный/светлый вариант
 *  - ARIA: role="status", aria-live="polite"
 */
export function ScarcityBadge({
  current,
  total,
  unit = "мест",
  closingLabel,
  deadline,
  theme = "light",
  icon,
  size = "md",
}: Props) {
  const [display, setDisplay] = useState(current);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // Анимация счётчика при mount
  useEffect(() => {
    const start = Math.max(0, current - 12);
    const steps = 18;
    const dur = 1200;
    const inc = (current - start) / steps;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= steps) {
        setDisplay(current);
        clearInterval(interval);
        return;
      }
      setDisplay(Math.round(start + inc * i));
    }, dur / steps);
    return () => clearInterval(interval);
  }, [current]);

  // Countdown
  useEffect(() => {
    if (!deadline) return;
    const tick = () => {
      const ms = deadline.getTime() - Date.now();
      if (ms <= 0) {
        setTimeLeft("Набор закрыт");
        return;
      }
      const days = Math.floor(ms / 86400000);
      const hours = Math.floor((ms % 86400000) / 3600000);
      const mins = Math.floor((ms % 3600000) / 60000);
      setTimeLeft(
        days > 0
          ? `${days} ${pluralDays(days)} ${hours} ${pluralHours(hours)}`
          : hours > 0
          ? `${hours} ${pluralHours(hours)} ${mins} мин`
          : `${mins} мин`,
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [deadline]);

  const pct = Math.min(100, (display / total) * 100);
  const isDark = theme === "dark";

  const padY = size === "sm" ? "py-2 px-3" : "py-3 px-4";
  const numSize = size === "sm" ? "text-sm" : "text-base";

  // Цвета
  const bg = isDark
    ? "bg-cyan/5 border-cyan/20 backdrop-blur-md"
    : "bg-cyan/[0.06] border-cyan/20 backdrop-blur-md";
  const textPrimary = isDark ? "text-paper" : "text-ink";
  const textSecondary = isDark ? "text-paper/70" : "text-ink-muted";
  const progressBg = isDark ? "bg-cyan/20" : "bg-cyan/10";
  const progressFg = "bg-cyan";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-3 ${padY} rounded-full border ${bg}`}
    >
      {icon && <span className="text-cyan">{icon}</span>}

      <div className="flex flex-col gap-1.5 min-w-0">
        <div className={`flex items-center gap-2 ${numSize}`}>
          <span className="relative flex items-center">
            <span
              className={`font-display font-semibold tabular-nums ${textPrimary}`}
            >
              {display}
            </span>
            <span className="absolute -right-1.5 top-0 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
          </span>
          <span className={`${textSecondary}`}>из {total}</span>
          <span className={`${textPrimary}`}>{unit}</span>
          <span className={`${textSecondary}`}>уже подключили</span>
        </div>

        {/* Progress bar */}
        <div className={`relative h-1 w-40 overflow-hidden rounded-full ${progressBg}`}>
          <div
            className={`absolute inset-y-0 left-0 ${progressFg} transition-all duration-1000 ease-out`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {(closingLabel || timeLeft) && (
        <div
          className={`hidden sm:flex flex-col items-end text-xs ${
            isDark ? "text-paper/60" : "text-ink-dim"
          } pl-3 border-l ${
            isDark ? "border-paper/10" : "border-line"
          }`}
        >
          {closingLabel && <span className="font-medium">{closingLabel}</span>}
          {timeLeft && <span className="font-mono tabular-nums">{timeLeft}</span>}
        </div>
      )}
    </div>
  );
}

function pluralDays(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "день";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "дня";
  return "дней";
}

function pluralHours(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "час";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "часа";
  return "часов";
}

export default ScarcityBadge;
