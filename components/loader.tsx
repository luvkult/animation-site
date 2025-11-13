"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef<string>("");
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const startLoading = useCallback(() => {
    if (!progressRef.current || !containerRef.current) return;

    // Очищаем предыдущие таймеры
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];

    setIsVisible(true);

    // Сбрасываем ширину и показываем контейнер
    gsap.set(progressRef.current, { width: "0%" });
    gsap.set(containerRef.current, { 
      opacity: 1,
      display: "block",
    });

    // Анимация начала загрузки
    gsap.fromTo(
      progressRef.current,
      {
        width: "0%",
      },
      {
        width: "70%",
        duration: 0.4,
        ease: "power2.out",
      }
    );

    // Продолжаем до 90%
    const timer1 = setTimeout(() => {
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: "90%",
          duration: 0.5,
          ease: "power1.out",
        });
      }
    }, 200);
    timersRef.current.push(timer1);

    // Завершаем загрузку
    const timer2 = setTimeout(() => {
      if (progressRef.current && containerRef.current) {
        gsap.to(progressRef.current, {
          width: "100%",
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setTimeout(() => {
              gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                  setIsVisible(false);
                  if (progressRef.current) {
                    gsap.set(progressRef.current, { width: "0%" });
                  }
                },
              });
            }, 200);
          },
        });
      }
    }, 700);
    timersRef.current.push(timer2);
  }, []);

  useEffect(() => {
    // Показываем лоадер при изменении пути (переходе между страницами)
    if (prevPathnameRef.current !== pathname) {
      if (prevPathnameRef.current) {
        // Переход между страницами
        startLoading();
      }
      prevPathnameRef.current = pathname;
    }
  }, [pathname, startLoading]);

  // Показываем лоадер при первой загрузке страницы для теста
  useEffect(() => {
    // Запускаем лоадер при первой загрузке
    const timer = setTimeout(() => {
      startLoading();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [startLoading]);

  // Слушаем события загрузки 3D моделей и другого контента
  useEffect(() => {
    const handleContentLoading = () => {
      // Очищаем предыдущие таймеры
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
      startLoading();
    };

    window.addEventListener("content-loading", handleContentLoading as EventListener);

    return () => {
      window.removeEventListener("content-loading", handleContentLoading as EventListener);
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [startLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-[99999] h-[4px] w-full overflow-hidden pointer-events-none"
      style={{ 
        opacity: isVisible ? 1 : 0,
        display: isVisible ? "block" : "none",
      }}
    >
      <div
        ref={progressRef}
        className="h-full w-0 relative"
        style={{
          width: "0%",
          background: "#FFE600",
          boxShadow:
            "0 0 15px rgba(255, 230, 0, 0.9), 0 0 25px rgba(255, 230, 0, 0.6), 0 0 35px rgba(255, 230, 0, 0.4), 0 2px 10px rgba(255, 230, 0, 0.3)",
        }}
      >
        {/* Блестящий эффект */}
        <div
          className="absolute inset-0 shimmer-effect"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

