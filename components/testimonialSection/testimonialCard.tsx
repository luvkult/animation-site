import React from "react";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  item,
  index,
  color,
}: {
  item: {
    clientName: string;
    role: string;
    testimonial: string;
    project: string;
    rating: number;
  };
  index: number;
  color: "Dark" | "Light";
}) {
  const stars = Array.from({ length: item.rating }, (_, i) => i);
  
  // color == "Dark" означает светлый фон - нужна черная карточка со светлым текстом
  // color == "Light" означает темный фон - нужна белая карточка с темным текстом
  const isLightBackground = color === "Dark";

  return (
    <article
      className={cn(
        "anime relative z-[100] mx-auto w-full max-w-4xl overflow-hidden rounded-[4rem] border-2 p-8 backdrop-blur-xl md:rounded-[6rem] md:p-12",
        isLightBackground
          ? "border-black/30 bg-[#272727] text-colorLight shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
          : "border-white/20 bg-white text-colorDark shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8)]",
      )}
    >
      {/* Декоративные элементы */}
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-3xl",
          isLightBackground
            ? "bg-[var(--primary-color)]/20"
            : "bg-[var(--primary-color)]/8",
        )}
      ></div>
      <div
        className={cn(
          "pointer-events-none absolute -bottom-8 -left-8 h-44 w-44 rounded-full blur-3xl",
          isLightBackground
            ? "bg-[var(--primary-color)]/15"
            : "bg-[var(--primary-color)]/6",
        )}
      ></div>

      {/* Верхняя часть - имя и роль */}
      <div className="anime mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h3
            className={cn(
              "text-2xl font-bold md:text-3xl",
              isLightBackground ? "text-colorLight" : "text-colorDark",
            )}
          >
            {item.clientName}
          </h3>
          <p
            className={cn(
              "mt-1 text-sm md:text-base",
              isLightBackground ? "text-colorSecondaryLight" : "text-colorSecondaryDark",
            )}
          >
            {item.role}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {stars.map((star) => (
            <svg
              key={star}
              className={cn(
                "h-8 w-8 md:h-9 md:w-9",
                isLightBackground
                  ? "text-[var(--primary-color)] drop-shadow-[0_0_12px_rgba(230,210,0,0.3)]"
                  : "text-[var(--primary-color)] brightness-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Проект */}
      <div className="anime mb-6">
        <span
          className={cn(
            "inline-block rounded-full px-4 py-2 text-xs font-semibold shadow-lg md:px-5 md:py-2.5 md:text-sm",
            isLightBackground
              ? "bg-[var(--primary-color)]/50 text-white font-bold ring-2 ring-yellow-400/40"
              : "bg-[var(--primary-color)]/40 text-black font-bold ring-2 ring-yellow-400/30",
          )}
        >
          {item.project}
        </span>
      </div>

      {/* Цитата */}
      <div className="anime relative">
        <svg
          className={cn(
            "absolute left-0 top-0 h-10 w-10 md:h-14 md:w-14 -translate-x-3 md:-translate-x-4 -translate-y-2 md:-translate-y-3",
            isLightBackground
              ? "text-[var(--primary-color)]/50"
              : "text-[var(--primary-color)]/40",
          )}
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-1.1.9-2 2-2V8z" />
        </svg>
        <blockquote
          className={cn(
            "relative pl-10 text-lg leading-relaxed md:pl-16 md:text-xl md:leading-relaxed",
            isLightBackground ? "text-colorLight" : "text-colorDark",
          )}
        >
          {item.testimonial}
        </blockquote>
      </div>

      {/* Декоративный разделитель */}
      <div
        className={cn(
          "anime mt-6 border-t pt-4 md:pt-5",
          isLightBackground ? "border-current/20" : "",
        )}
        style={
          !isLightBackground ? { borderColor: "#000" } : undefined
        }
      ></div>
    </article>
  );
}

