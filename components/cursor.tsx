import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const cursorRefs = useRef<HTMLDivElement[]>([]);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const cursors = document.querySelectorAll(".cursor") as NodeListOf<HTMLElement>;
    
    // Изначально скрываем курсор и ставим в центр экрана
    cursors.forEach((cursor) => {
      gsap.set(cursor, {
        opacity: 0,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    });

    function handleMove(e: MouseEvent) {
      if (!hasMovedRef.current) {
        // Первое движение мыши - показываем курсор
        hasMovedRef.current = true;
        cursors.forEach((cursor) => {
          gsap.to(cursor, {
            opacity: 1,
            duration: 0.3,
          });
        });
      }

      gsap.to(".cursor", {
        x: e.clientX,
        y: e.clientY,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out",
      });
    }

    // Отслеживаем движение мыши
    document.addEventListener("mousemove", handleMove);

    // При потере фокуса или когда мышь уходит за пределы окна - скрываем курсор
    function handleMouseLeave() {
      cursors.forEach((cursor) => {
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.3,
        });
      });
    }

    function handleMouseEnter() {
      if (hasMovedRef.current) {
        cursors.forEach((cursor) => {
          gsap.to(cursor, {
            opacity: 1,
            duration: 0.3,
          });
        });
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Скрываем курсор когда модалка открыта
    function handleModalStateChange() {
      const isModalOpen = document.body.classList.contains("modal-open");
      if (isModalOpen) {
        cursors.forEach((cursor) => {
          gsap.to(cursor, {
            opacity: 0,
            duration: 0.3,
          });
        });
      } else if (hasMovedRef.current) {
        // Возвращаем курсор только если мышь уже двигалась
        cursors.forEach((cursor) => {
          gsap.to(cursor, {
            opacity: 1,
            duration: 0.3,
          });
        });
      }
    }

    // Наблюдаем за изменениями класса modal-open на body
    const observer = new MutationObserver(handleModalStateChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Проверяем начальное состояние
    handleModalStateChange();

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor cursor1" ref={(el) => el && (cursorRefs.current[0] = el)}></div>
      <div className="cursor cursor2" ref={(el) => el && (cursorRefs.current[1] = el)}></div>
    </>
  );
}
