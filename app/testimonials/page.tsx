"use client";
import React from "react";
import "../work.css";
import "../header.css";
import FullpageProviderTestimonials from "@/components/fullpageProviderTestimonials";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { TestimonialSection } from "@/components/testimonialSection/testimonialSection";

const testimonialsData = [
  {
    clientName: "Банк «Сфера»",
    role: "Маркетинг-директор",
    testimonial:
      "Slyte Animation создали для нас эксплейнер, который за первые три месяца набрал более миллиона просмотров. Профессионализм, креативность и внимание к деталям — на высшем уровне.",
    project: "Эксплейнер для банковского продукта",
    rating: 5,
  },
  {
    clientName: "TechStart",
    role: "CEO",
    testimonial:
      "Работали со многими студиями, но эта — особенная. Они не просто делают анимацию, а вникают в бизнес и помогают донести идею до аудитории. Рекомендую.",
    project: "3D-презентация стартапа",
    rating: 5,
  },
  {
    clientName: "ООО «Ритм»",
    role: "Бренд-менеджер",
    testimonial:
      "Анимация логотипа получилась именно такой, как мы мечтали. Быстро, качественно, без лишних правок. Команда знает, что делает.",
    project: "Motion-брендинг",
    rating: 5,
  },
  {
    clientName: "Digital Agency «Вектор»",
    role: "Креативный директор",
    testimonial:
      "Доверяем Slyte Animation уже третий проект. Всегда на связи, всегда в срок, всегда с идеями. Для наших клиентов — только они.",
    project: "Рекламный ролик приложения",
    rating: 5,
  },
  {
    clientName: "IT-Конференция DevConf",
    role: "Организатор",
    testimonial:
      "Титры для митапа вышли отличными. Стильно, динамично, атмосферно. Участники до сих пор спрашивают, кто делал.",
    project: "Титры и опенер митапа",
    rating: 5,
  },
  {
    clientName: "Fashion Brand «Лейка»",
    role: "Арт-директор",
    testimonial:
      "Стили проекта определили весь визуальный язык кампании. Четкое понимание бренда, современный подход, безупречное исполнение.",
    project: "Арт-дирекшн и визуальный стиль",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <FullpageProviderTestimonials>
        <div id="fullpage" className="app-testimonials">
          <div className="background">
            ОТЗЫВЫ
            <br />
            ОТЗЫВЫ
          </div>

          {testimonialsData.map((item, index) => (
            <TestimonialSection
              key={index}
              item={item}
              index={index}
              length={testimonialsData.length}
              color={index % 2 !== 0 ? "Light" : "Dark"}
            />
          ))}
        </div>
      </FullpageProviderTestimonials>
    </>
  );
}

