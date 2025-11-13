import React from "react";
import { Header } from "@/components/header";
import { Bulge } from "../bulge";
import { TestimonialCard } from "./testimonialCard";
import { cn } from "@/lib/utils";

export function TestimonialSection({
  index,
  item,
  color,
  length,
}: {
  index: number;
  item: {
    clientName: string;
    role: string;
    testimonial: string;
    project: string;
    rating: number;
  };
  color: "Dark" | "Light";
  length: number;
}) {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sectionRef}
      className={`section s${index} ${
        color == "Dark" ? "lightGradient" : "darkGradient"
      }
      text-color${color} `}
      key={`testimonial-${index}`}
    >
      <Header color={color}></Header>
      <Bulge type={color} />

      <div className="relative z-[100] flex h-[100dvh] w-full items-center justify-center px-paddingX">
        <div className="relative z-[100] w-full max-w-maxWidth">
          <TestimonialCard item={item} index={index} color={color} />
        </div>
      </div>

      <div className="absolute bottom-10 z-30 flex w-full items-end justify-center gap-6">
        {Array(length)
          .fill(0)
          .map((_, i) => {
            return (
              <div
                key={`testimonial-dot-${index}-${i}`}
                className={cn(
                  `h-4 w-1 bg-colorSecondary${color} rounded-full transition-all duration-300`,
                  ` ${i === index ? `h-10 bg-color${color}` : ""}`,
                )}
              ></div>
            );
          })}
      </div>
    </div>
  );
}

