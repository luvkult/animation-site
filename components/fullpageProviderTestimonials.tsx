"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";

import SplitType from "split-type";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setActiveSlide } from "@/redux/states/fullpageSlice";

const opts = {
  autoScrolling: true,
  scrollOverflow: false,
  scrollHorizontally: false,
  fixedElements: ".background",
  navigation: false,
  navigationPosition: "left",
  scrollingSpeed: 1300,
  easingcss3: "cubic-bezier(.70,0,.30,1)",
  anchors: ["first", "second", "third", "fourth", "fifth", "sixth"],
  licenseKey: "gplv3-license",
  credits: {
    enabled: false,
  },
};

const FullpageProviderTestimonials = ({ children }: { children: React.ReactNode }) => {
  const animateSection = (sectionIndex: number, direction: "down" | "up" = "down") => {
    if (direction == "down") {
      gsap
        .timeline()
        .from(`.s${sectionIndex} .anime`, {
          duration: 0.3,
        })
        .fromTo(
          `.s${sectionIndex} .anime`,
          {
            y: "30vh",
            opacity: 0,
          },
          {
            y: "0vh",
            opacity: 1,
            duration: 1.1,
            stagger: 0.03,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
          },
        );
    } else {
      gsap
        .timeline()
        .from(`.s${sectionIndex} .anime`, {
          duration: 0.3,
        })
        .fromTo(
          `.s${sectionIndex} .anime`,
          {
            y: "-30vh",
            opacity: 0,
          },
          {
            y: "0vh",
            opacity: 1,
            duration: 1.1,
            stagger: -0.03,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
          },
        );
    }

    var flex = screen.width > 540 ? 17 : 5;
    if (direction == "down") {
      gsap
        .timeline()
        .from(`.s${sectionIndex} .rounded__div__down`, {
          duration: 0.1,
        })
        .fromTo(
          `.s${sectionIndex} .rounded__div__down`,
          {
            height: `${flex}vh`,
          },
          {
            height: "0vh",
            duration: 1.2,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
          },
        );
    } else {
      gsap
        .timeline()
        .from(`.s${sectionIndex} .rounded__div__up`, {
          duration: 0.1,
        })
        .fromTo(
          `.s${sectionIndex} .rounded__div__up`,
          {
            height: `${flex}vh`,
          },
          {
            height: "0vh",
            duration: 1.2,
            ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
          },
        );
    }
  };

  const onLeave = function (index: any, nextIndex: any, direction: any) {
    console.log(nextIndex.index);
    animateSection(nextIndex.index, direction);
  };

  const afterLoad = function (origin: any, destination: any, direction: any) {
    // При первой загрузке страницы запускаем анимацию для первой секции
    if (destination.index === 0 && direction === "none") {
      animateSection(0, "down");
    }
  };

  useLayoutEffect(() => {
    // Устанавливаем начальное состояние элементов первой секции сразу
    gsap.set(".s0 .anime", {
      y: "30vh",
      opacity: 0,
    });
    
    var flex = screen.width > 540 ? 17 : 5;
    gsap.set(".s0 .rounded__div__down", {
      height: `${flex}vh`,
    });

    // Запускаем анимацию сразу без задержки
    requestAnimationFrame(() => {
      animateSection(0, "down");
    });
  }, []);

  return (
    <ReactFullpage
      {...opts}
      onLeave={onLeave}
      afterLoad={afterLoad}
      render={() => {
        return <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>;
      }}
    />
  );
};

export default FullpageProviderTestimonials;

