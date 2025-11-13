"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import Magentic from "@/components/ui/magentic";
import "./work.css";
import "./index.css";

export default function NotFoundPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLSpanElement>(null);
  const rotateImageRef = useRef<gsap.core.Timeline | null>(null);
  const rotating = useRef(null);

  useEffect(() => {
    // Анимация вращения логотипа
    const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");
    rotateImageRef.current = gsap
      .timeline({ defaults: { ease: "none" }, repeat: -1, paused: true })
      .fromTo(
        rotating.current,
        {
          rotation: 0,
        },
        {
          rotation: -360,
          duration: 3,
        },
      );
  }, []);

  useEffect(() => {
    // Таймер для редиректа через 5 секунд
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    // Анимация обратного отсчета
    const countdownValues = [4, 3, 2, 1, 0];
    let currentIndex = 0;
    
    const countdownInterval = setInterval(() => {
      if (countdownRef.current && currentIndex < countdownValues.length) {
        const newValue = countdownValues[currentIndex];
        
        // Анимация исчезновения
        gsap.to(countdownRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          onComplete: () => {
            if (countdownRef.current) {
              countdownRef.current.textContent = newValue.toString();
              gsap.set(countdownRef.current, { opacity: 0, scale: 1.2 });
              
              // Анимация появления
              gsap.to(countdownRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.2,
              });
            }
          },
        });
        
        currentIndex++;
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  useLayoutEffect(() => {
    // Устанавливаем начальное состояние элементов
    gsap.set(".not-found .anime", {
      y: "30vh",
      opacity: 0,
    });

    // Запускаем анимацию появления
    requestAnimationFrame(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".not-found .anime",
        {
          y: "30vh",
          opacity: 0,
        },
        {
          y: "0vh",
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1"),
        },
      );

      // Анимация для счетчика
      if (countdownRef.current) {
        gsap.fromTo(
          countdownRef.current,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.5,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1"),
          },
        );
      }
    });
  }, []);

  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <div ref={containerRef} className="not-found relative min-h-screen w-full overflow-hidden">
        {/* Фоновый текст */}
        <div className="background">
          404
          <br />
          404
        </div>

        {/* Декоративные элементы свечения */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[var(--primary-color)]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[var(--primary-color)]/8 blur-3xl" />

        {/* Основной контент */}
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <h1 className="anime mb-6 text-9xl font-black text-colorDark md:text-[12rem]">
              404
            </h1>
            
            <p className="anime mb-8 text-xl text-colorSecondaryDark md:text-2xl">
              Похоже, что страница, которую вы ищете, не существует
            </p>

            <div className="anime mb-12 flex flex-col items-center gap-6">
              <p className="text-lg text-colorSecondaryDark">
                Перенаправление на главную через{" "}
                <span
                  ref={countdownRef}
                  className="inline-block font-black text-colorDark"
                  style={{ fontSize: "2.5rem", minWidth: "2ch" }}
                >
                  5
                </span>{" "}
                секунд
              </p>
            </div>
          </div>
        </div>

        {/* Кнопка внизу страницы */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center pb-8 md:pb-12">
          <Magentic
            strength={50}
            className="anime isolate relative rounded-full !text-[clamp(16px,_1vw_+_14px,_24px)] md:bg-[#272727] cursor-pointer !static w-auto min-w-fit"
            style={{
              position: 'relative',
              right: 'auto',
              bottom: 'auto',
              left: 'auto',
            }}
            onMouseEnter={() => rotateImageRef.current?.play()}
            onMouseLeave={() => rotateImageRef.current?.pause()}
            href="#"
            onClick={(e: any) => {
              e.preventDefault();
              router.push("/");
            }}
            scrambleParams={[
              {
                text: "Перейти на главную",
                chars: "-x",
              },
            ]}
          >
            <div className="shapka !flex items-center justify-center gap-[3.5rem] px-4 md:px-6">
              <div className="round flex items-center justify-center min-w-[200px] md:min-w-[250px] h-[130px]">
                <p className="whitespace-nowrap text-[21px] text-colorLight">
                  <span>
                    <span className="scrambleText">Перейти на главную</span>
                  </span>
                </p>
              </div>
              <div className="round flex items-center justify-center w-[130px] h-[130px] flex-shrink-0">
                <Image
                  className="rotateAnimation inline-block aspect-square border-2 border-white md:border-0 md:p-1"
                  ref={rotating}
                  width={120}
                  height={120}
                  src="/img/logo.png"
                  alt=""
                />
              </div>
            </div>
          </Magentic>
        </div>
      </div>
    </>
  );
}
