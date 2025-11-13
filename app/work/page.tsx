"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workPage/workSection";

const projectsData = [
  {
    title: (
      <>
        Эксплейнер <br /> банка
      </>
    ),
    description: "2D-анимация, сценарий, озвучка",
    link: "#",
    imageLink: "/img/projects/1.avif",
    videoLink: "/img/projects/1.MP4",
  },
  {
    title: (
      <>
        3D <br /> презентация
      </>
    ),
    description: "3D-рендеры, шейдинг, свет",
    link: "#",
    imageLink: "/img/projects/2.avif",
    videoLink: "/img/projects/2.MP4",
  },
  {
    title: (
      <>
        Анимация <br /> логотипа
      </>
    ),
    description: "Motion‑брендинг, стиль-фреймы",
    link: "#",
    imageLink: "/img/projects/3.avif",
    videoLink: "/img/projects/3.MP4",
  },
  {
    title: (
      <>
        Реклама <br /> приложения
      </>
    ),
    description: "Монтаж, моушн‑графика, субтитры",
    link: "#",
    imageLink: "/img/projects/4.avif",
    videoLink: "/img/projects/4.MP4",
  },

  {
    title: (
      <>
        Титры <br /> митапа
      </>
    ),
    description: "Опенер, переходы, нижние трети",
    link: "#",
    imageLink: "/img/projects/5.avif",
    videoLink: "/img/projects/5.MP4",
  },
  {
    title: (
      <>
        Стили <br /> проекта
      </>
    ),
    description: "Арт‑дирекшн, визуальный стиль",
    link: "#",
    imageLink: "/img/projects/6.avif",
    videoLink: "/img/projects/6.MP4",
  },
];

// Функция для восстановления исходных значений цветов
const resetColors = () => {
  gsap.set("body", {
    "--colorLight": "#fff",
    "--colorDark": "#0e0d0c",
    "--colorSecondaryDark": "#404040",
    "--colorSecondaryLight": "#bfbfbf",
    "--colorSecondaryHalfLight": "#f2f2f2",
    "--colorSecondaryHalfDark": "#1a1a1a",
    "--colorWhite": "#fff",
  });
};

//test
export default function WorkPage() {
  // Сбрасываем цвета при загрузке страницы услуг
  useEffect(() => {
    resetColors();
  }, []);

  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <FullpageProviderWork>
        <div id="fullpage">
          <div className="background">
            УСЛУГИ
            <br />
            УСЛУГИ
          </div>

          {projectsData.map((item, index) => (
            <WorkSection
              key={index}
              item={item}
              index={index}
              length={projectsData.length}
              color={index % 2 !== 0 ? "Light" : "Dark"}
            />
          ))}
        </div>
      </FullpageProviderWork>
    </>
  );
}
