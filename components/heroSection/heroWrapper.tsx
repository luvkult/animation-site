import React from "react";
import { HeroButton } from "./heroButton";
import { HeroMarquee } from "./heroMarquee";
export function HeroWrapper({}) {
  return (
    <main className="section1__wrapper relative max-w-maxWidth grow ">
      <div className="myImage anime"></div>
      <HeroButton />
      <h2 className="left anime mask pointer-events-none z-20 pt-20">
        <div className="free anime">Студия</div>
        <div className="animation__wrapper anime">
          <span className="animate__this animate__this1 left-0 text-[.9em]">
            Моушн<span className="yellow__it">.</span>
            <br />
          </span>
          <span className="animate__this animate__this2 left-0">
            2D / 3D Motion Design<span className="yellow__it">.</span>
          </span>
          <span>&nbsp;</span>
        </div>
      </h2>
      <HeroMarquee />
    </main>
  );
}
