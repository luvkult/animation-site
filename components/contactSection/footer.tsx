import { FooterGroup } from "@/components/contactSection/footerGroup";
import { links } from "@/data/data";
import { cn, getJoinedDate } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
export function Footer({ className }: { className?: string }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions[] = [
      { month: "long", day: "numeric" },
      { hour: "2-digit", minute: "2-digit", hour12: false },
    ];

    setCurrentTime(getJoinedDate(options));

    const interval = setInterval(() => {
      setCurrentTime(getJoinedDate(options));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <footer
      className={cn(
        "footer__links absolute flex  w-full flex-wrap   px-paddingX mix-blend-difference ",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-maxWidth gap-0 md:gap-12">
        <FooterGroup
          title="МЕСТНОЕ ВРЕМЯ"
          className="hidden md:block"
          links={[{ href: "", text: currentTime }]}
        />
        {/* Open Source block removed as requested */}

        <FooterGroup
          title="СВЯЗАТЬСЯ"
          className="md:ml-auto"
          isMagnetic={true}
          links={[
            { href: links.email, text: "Почта" },
            { href: links.telegram, text: "Telegram" },
            { href: links.github, text: "GitHub" },
          ]}
        />
      </div>
    </footer>
  );
}
