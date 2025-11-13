import React, { use, useEffect, useRef, useState } from "react";
import Magentic from "./ui/magentic";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Logo from "@/public/svg/Logo.svg";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { toggleMenu } from "@/redux/states/menuSlice";
import { cn } from "@/lib/utils";
import { links } from "@/data/data";
import "@/app/header.css";

const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");

type HeaderProps = {
  color: "Dark" | "Light";
  className?: string;
  mode?: "hamburger" | "cross";
};

export function Header({ color, className, mode = "hamburger" }: HeaderProps) {
  const possibleTailwindClasses = [
    "bg-colorDark",
    "bg-colorLight",
    "text-colorDark",
    "text-colorLight",
    "before:bg-colorDark",
    "before:bg-colorLight",
  ];

  const logoAnimationTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    logoAnimationTl.current = gsap.timeline({ paused: true }).fromTo(
      `.logo__rotate`,
      {
        rotate: 0,
        transformOrigin: "center",
      },
      {
        rotate: -360,
        transformOrigin: "center",
        duration: 0.6,
        ease: ease,
      },
    );

    return () => {
      logoAnimationTl.current?.kill();
    };
  }, []);

  const dispatch = useAppDispatch();
  return (
    <header className={cn("nav__container anime px-paddingX", className)}>
      <nav className="nav__bar ">
        <div className="max-w-maxWidth">
          <Magentic
            href={links.home}
            strength={50}
            className={`nav__item text-xl font-bold text-color${color} before:bg-color${color}`}
            onMouseEnter={() => {
              console.log("hello");
              logoAnimationTl.current?.play();
            }}
            onMouseLeave={() => {
              logoAnimationTl.current?.reverse();
            }}
          >
            <p className="mask logo__anim flex items-center justify-center font-semibold   ">
              <svg
                className="w-[88px]"
                xmlns="http://www.w3.org/2000/svg"
                width="210"
                height="88"
                viewBox="0 0 210 88"
                fill="none"
              >
                <g clipPath="url(#clip0_127_77)">
                <path
                  className="logo__rotate"
                    d="M160.322 54.5406L193.518 21.9178M172.122 64.5598L204.081 32.6613M159.658 52.8807L194.635 51.7641V57.8903H201.757M206.567 43.7065C206.567 57.0797 195.726 67.9209 182.352 67.9209C168.979 67.9209 158.138 57.0797 158.138 43.7065C158.138 30.3333 168.979 19.4922 182.352 19.4922C195.726 19.4922 206.567 30.3333 206.567 43.7065Z"
                  stroke="currentColor"
                  strokeWidth="6"
                />
                <path
                    d="M28.2763 31.2668C28.0431 29.0852 27.0605 27.3866 25.3286 26.1708C23.6132 24.9551 21.3817 24.3473 18.6338 24.3473C16.702 24.3473 15.045 24.6387 13.6627 25.2216C12.2805 25.8045 11.223 26.5955 10.4902 27.5947C9.75745 28.5939 9.38274 29.7347 9.36609 31.017C9.36609 32.0829 9.60757 33.0071 10.0905 33.7899C10.5901 34.5726 11.2646 35.2387 12.1139 35.7883C12.9633 36.3212 13.9042 36.7709 14.9367 37.1372C15.9692 37.5036 17.0101 37.8117 18.0593 38.0615L22.8555 39.2606C24.7873 39.7102 26.6442 40.3181 28.4261 41.0841C30.2247 41.8502 31.8318 42.8161 33.2474 43.9819C34.6796 45.1476 35.812 46.5549 36.6447 48.2036C37.4774 49.8523 37.8937 51.7841 37.8937 53.999C37.8937 56.9967 37.1277 59.6363 35.5955 61.9178C34.0634 64.1827 31.8485 65.9563 28.9507 67.2386C26.0697 68.5043 22.5807 69.1371 18.4839 69.1371C14.5037 69.1371 11.0481 68.521 8.11707 67.2886C5.20269 66.0562 2.92114 64.2576 1.27244 61.8928C-0.359618 59.528 -1.24226 56.6469 -1.37549 53.2496H7.74236C7.87559 55.0315 8.42516 56.5137 9.39107 57.6961C10.357 58.8785 11.6143 59.7612 13.1631 60.344C14.7285 60.9269 16.4772 61.2184 18.409 61.2184C20.4241 61.2184 22.1894 60.9186 23.7048 60.3191C25.237 59.7029 26.436 58.8535 27.302 57.7711C28.168 56.6719 28.6093 55.3896 28.626 53.9241C28.6093 52.5918 28.218 51.4926 27.4519 50.6267C26.6858 49.744 25.6117 49.0113 24.2294 48.4284C22.8638 47.8289 21.2651 47.2959 19.4332 46.8296L13.6128 45.3308C9.3994 44.2483 6.06867 42.6079 3.62059 40.4097C1.18917 38.1947 -0.0265459 35.2554 -0.0265459 31.5916C-0.0265459 28.5773 0.789481 25.9377 2.42153 23.6728C4.07024 21.4079 6.31015 19.651 9.14126 18.4019C11.9724 17.1363 15.1782 16.5034 18.7587 16.5034C22.3892 16.5034 25.57 17.1363 28.3012 18.4019C31.0491 19.651 33.2057 21.3913 34.7712 23.6228C36.3366 25.8378 37.1443 28.3858 37.1943 31.2668H28.2763Z"
                    fill="currentColor"
                  />
                  <path
                    d="M51.282 17.2029V68.3628H42.2391V17.2029H51.282Z"
                    fill="currentColor"
                  />
                  <path
                    d="M62.6843 82.7515C61.4519 82.7515 60.3111 82.6515 59.262 82.4517C58.2294 82.2685 57.4051 82.052 56.7889 81.8022L58.8872 74.7577C60.2029 75.1408 61.377 75.324 62.4095 75.3073C63.442 75.2907 64.3496 74.9659 65.1323 74.3331C65.9317 73.7169 66.6062 72.6844 67.1558 71.2355L67.9302 69.1621L54.0161 29.9928H63.6085L72.4516 58.9701H72.8513L81.7193 29.9928H91.3368L75.9738 73.0091C75.2577 75.0408 74.3085 76.7811 73.1261 78.23C71.9437 79.6955 70.4948 80.8113 68.7795 81.5774C67.0808 82.3601 65.0491 82.7515 62.6843 82.7515Z"
                    fill="currentColor"
                  />
                  <path
                    d="M113.237 29.9928V36.9874H91.1794V29.9928H113.237ZM96.6252 20.8H105.668V56.8218C105.668 58.0375 105.851 58.9701 106.218 59.6196C106.601 60.2524 107.1 60.6854 107.716 60.9186C108.333 61.1517 109.015 61.2683 109.765 61.2683C110.331 61.2683 110.847 61.2267 111.314 61.1434C111.797 61.0601 112.163 60.9852 112.413 60.9186L113.937 67.988C113.454 68.1546 112.762 68.3378 111.863 68.5376C110.981 68.7375 109.898 68.854 108.616 68.8873C106.351 68.954 104.311 68.6126 102.496 67.8631C100.68 67.0971 99.2398 65.9147 98.1739 64.3159C97.1248 62.7172 96.6085 60.7187 96.6252 58.3206V20.8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M133.857 69.1122C130.01 69.1122 126.688 68.3128 123.89 66.714C121.109 65.0986 118.969 62.8171 117.47 59.8694C115.971 56.9051 115.222 53.4161 115.222 49.4026C115.222 45.4557 115.971 41.9918 117.47 39.0108C118.986 36.0131 121.101 33.6816 123.815 32.0163C126.53 30.3342 129.719 29.4932 133.383 29.4932C135.747 29.4932 137.979 29.8763 140.077 30.6423C142.192 31.3917 144.058 32.5575 145.673 34.1396C147.305 35.7217 148.587 37.7368 149.52 40.1848C150.453 42.6163 150.919 45.514 150.919 48.878V51.6509H119.468V45.5556H142.251C142.234 43.8237 141.859 42.2832 141.127 40.9343C140.394 39.5687 139.37 38.4945 138.054 37.7118C136.755 36.9291 135.239 36.5377 133.507 36.5377C131.659 36.5377 130.035 36.9874 128.636 37.8867C127.237 38.7693 126.147 39.935 125.364 41.3839C124.598 42.8161 124.206 44.3899 124.19 46.1052V51.426C124.19 53.6576 124.598 55.5728 125.414 57.1715C126.23 58.7536 127.371 59.9693 128.836 60.8187C130.302 61.6513 132.017 62.0677 133.982 62.0677C135.298 62.0677 136.488 61.8845 137.554 61.5181C138.62 61.1351 139.544 60.5772 140.327 59.8444C141.11 59.1117 141.701 58.2041 142.101 57.1216L150.544 58.0708C150.011 60.3024 148.995 62.2509 147.497 63.9162C146.014 65.5649 144.116 66.8473 141.801 67.7632C139.486 68.6625 136.838 69.1122 133.857 69.1122Z"
                  fill="currentColor"
                />
                </g>
                <defs>
                  <clipPath id="clip0_127_77">
                    <rect width="210" height="88" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </p>
          </Magentic>
          <Magentic
            strength={50}
            className={`mask nav__item h-8 w-8 cursor-pointer items-center text-color${color} before:bg-color${color}`}
            onClick={() => {
              if (mode === "cross") {
                dispatch(toggleMenu({ isMenuOpen: false }));
              } else {
                dispatch(toggleMenu({ isMenuOpen: true, color: color }));
              }
            }}
          >
            <div
              className={cn(
                "flex h-[0.9rem] w-full flex-col justify-between ",
                {
                  "scale-[.90] justify-center": mode === "cross",
                },
              )}
            >
              <div
                className={cn(`h-[0.15rem] w-full bg-color${color}`, {
                  "absolute rotate-45": mode === "cross",
                })}
              ></div>
              <div
                className={cn(`h-[0.15rem] w-full bg-color${color}`, {
                  "absolute -rotate-45": mode === "cross",
                })}
              ></div>
            </div>
          </Magentic>
        </div>
      </nav>
    </header>
  );
}
