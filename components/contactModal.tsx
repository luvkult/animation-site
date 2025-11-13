"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/actions/sendEmail";
import { gsap } from "gsap";
import Magentic from "@/components/ui/magentic";

const formSchema = z.object({
  name: z.string().min(1, { message: "Поле обязательно" }),
  email: z
    .string()
    .min(1, { message: "Поле обязательно" })
    .email("Некорректный email"),
  message: z.string().min(1, { message: "Поле обязательно" }),
});

type TFormSchema = z.infer<typeof formSchema>;

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"Initial" | "Loading" | "Success" | "Error">("Initial");
  const [visibleErrors, setVisibleErrors] = useState<{ [key: string]: boolean }>({});
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const titleAnimTimer = useRef<number | null>(null);
  const errorTimersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const scrollYRef = useRef(0);
  const prevBodyOverflowRef = useRef<string>("");
  const prevHtmlOverflowRef = useRef<string>("");
  const prevBodyPositionRef = useRef<string>("");
  const prevBodyTopRef = useRef<string>("");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact-modal", handler as EventListener);
    return () => window.removeEventListener("open-contact-modal", handler as EventListener);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      // lock scroll (including iOS and html element)
      scrollYRef.current = window.scrollY || window.pageYOffset;
      prevBodyOverflowRef.current = document.body.style.overflow;
      prevHtmlOverflowRef.current = document.documentElement.style.overflow;
      prevBodyPositionRef.current = document.body.style.position;
      prevBodyTopRef.current = document.body.style.top;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.documentElement.style.height = "100%";
      document.body.style.height = "100%";
      
      // Отключаем желтое выделение при открытии формы
      document.body.classList.add("modal-open");

      // Prevent wheel scrolling
      const preventScroll = (e: WheelEvent | TouchEvent) => {
        e.preventDefault();
      };
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
        document.documentElement.style.overflow = prevHtmlOverflowRef.current;
        document.body.style.overflow = prevBodyOverflowRef.current;
        document.body.style.position = prevBodyPositionRef.current;
        document.body.style.top = prevBodyTopRef.current;
        document.documentElement.style.height = "";
        document.body.style.height = "";
        // Возвращаем желтое выделение при закрытии формы
        document.body.classList.remove("modal-open");
        window.scrollTo(0, scrollYRef.current);
      };
    }
    return () => {};
  }, [open]);

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const { formState: { errors } } = form;

  // Auto-hide errors after 6 seconds
  useEffect(() => {
    Object.keys(errors).forEach((fieldName) => {
      if (errors[fieldName as keyof typeof errors] && !visibleErrors[fieldName]) {
        setVisibleErrors(prev => ({ ...prev, [fieldName]: true }));
        const timer = setTimeout(() => {
          setVisibleErrors(prev => {
            const next = { ...prev };
            delete next[fieldName];
            return next;
          });
          form.clearErrors(fieldName as keyof TFormSchema);
          delete errorTimersRef.current[fieldName];
        }, 6500);
        errorTimersRef.current[fieldName] = timer;
      }
    });
    return () => {
      Object.values(errorTimersRef.current).forEach(timer => clearTimeout(timer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const onSubmit = async (data: TFormSchema) => {
    setStatus("Loading");
    const ok = await sendEmail(data);
    if (ok) {
      setStatus("Success");
      form.reset();
      setTimeout(() => closeModal(), 900);
    } else {
      setStatus("Error");
    }
  };

  const openTimeline = () => {
    if (!dialogRef.current || !overlayRef.current) return;
    tlRef.current?.kill();
    const tl = gsap
      .timeline({ defaults: { ease: "power3.out", duration: 0.6 } })
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0,
      )
      .fromTo(
        dialogRef.current,
        { y: 24, scale: 0.96, opacity: 0, filter: "blur(6px)" },
        { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
        0.05,
      )
      .fromTo(
        dialogRef.current.querySelectorAll(".border-glow"),
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0.15,
      );
    tlRef.current = tl;
  };

  const closeModal = () => {
    if (!dialogRef.current || !overlayRef.current) return setOpen(false);
    tlRef.current?.kill();
    const tl = gsap
      .timeline({ defaults: { ease: "power3.in", duration: 0.35 } })
      .to(dialogRef.current, { y: 16, scale: 0.98, opacity: 0, filter: "blur(4px)" }, 0)
      .to(overlayRef.current, { opacity: 0, duration: 0.25 }, 0)
      .add(() => {
        document.documentElement.style.overflow = prevHtmlOverflowRef.current;
        document.body.style.overflow = prevBodyOverflowRef.current;
        document.body.style.position = prevBodyPositionRef.current;
        document.body.style.top = prevBodyTopRef.current;
        // Возвращаем желтое выделение при закрытии формы
        document.body.classList.remove("modal-open");
        window.scrollTo(0, scrollYRef.current);
        setOpen(false);
        if (titleAnimTimer.current) {
          clearInterval(titleAnimTimer.current);
          titleAnimTimer.current = null;
        }
      });
    tlRef.current = tl;
  };

  useEffect(() => {
    if (open) {
      requestAnimationFrame(openTimeline);
      // Clear form errors when opening
      form.clearErrors();
      setStatus("Initial");
      setVisibleErrors({});
      // Clear all error timers
      Object.values(errorTimersRef.current).forEach(timer => clearTimeout(timer));
      errorTimersRef.current = {};
      if (typeof ScrambleTextPlugin !== "undefined" && titleRef.current) {
        // @ts-ignore
        gsap.registerPlugin(ScrambleTextPlugin);
        const run = () => {
          gsap.to(titleRef.current, {
            // @ts-ignore
            scrambleText: { text: "Связаться", chars: "-x", speed: 0.2 },
            duration: 0.9,
            ease: "power3.out",
          }).progress(0.05);
        };
        run();
        titleAnimTimer.current = window.setInterval(run, 1800);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[7000] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/55 backdrop-blur-[16px]"
        onClick={closeModal}
      ></div>
      <div
        ref={dialogRef}
        className="relative mx-4 w-[min(640px,92vw)] max-h-[85vh] overflow-hidden rounded-[4rem] md:rounded-[5rem]"
      >
        {/* Gradient frame */}
        <div className="pointer-events-none absolute inset-0 border-glow opacity-0">
          <div
            className="absolute -inset-[2px] rounded-[4rem] md:rounded-[5rem]"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.9), rgba(255,255,255,0.2), rgba(255,255,255,0.9))",
              filter: "blur(10px)",
            }}
          />
        </div>
        <div className="relative rounded-[3.8rem] md:rounded-[4.8rem] bg-white/10 backdrop-blur-[24px] p-8 text-[var(--colorLight)] shadow-2xl ring-1 ring-white/20 md:p-10 overflow-y-auto">
          {/* Decorative positioned elements */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="mask text-xl font-bold tracking-tight md:text-2xl text-colorDark"><span ref={titleRef} className="scrambleText">Связаться</span></h3>
            <Magentic
              href="#"
              onClick={(e: any) => {
                e.preventDefault();
                closeModal();
              }}
              className="relative grid h-12 w-12 place-items-center rounded-full bg-colorDark ring-1 ring-black/20 transition-colors hover:bg-colorDark/90 focus:outline-none focus-visible:outline-none ring-0 focus:ring-0"
              strength={30}
            >
              <span className="absolute inline-block h-[2px] w-5 -rotate-45 bg-colorLight transition-transform"></span>
              <span className="absolute inline-block h-[2px] w-5 rotate-45 bg-colorLight transition-transform"></span>
            </Magentic>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="border-t-0 pt-0 pb-2 relative">
                    <FormLabel className="inline-block text-black/80 mb-1.5 md:mb-2">Как вас зовут?</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          className={`relative my-0 rounded-[2rem] md:rounded-[2.5rem] border-2 ${errors.name && visibleErrors.name ? 'border-red-500/60 error-shake' : 'border-black/60'} bg-gradient-to-br from-white/15 to-white/8 px-4 py-3 text-black placeholder-black/50 caret-[var(--primary-color)] outline-none transition-all duration-500 hover:border-[var(--primary-color)]/40 hover:from-white/20 hover:to-white/12 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] focus:border-[var(--primary-color)]/60 focus:from-white/25 focus:to-white/15 focus:ring-4 focus:ring-[var(--primary-color)]/30 focus:shadow-[0_6px_30px_rgba(230,210,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1)] md:px-5 md:py-3.5`}
                          placeholder="Ваше имя"
                          {...field}
                        />
                      </FormControl>
                      {errors.name && visibleErrors.name && (
                        <FormMessage className="error-message absolute left-full top-0 z-10" />
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="py-2 relative">
                    <FormLabel className="inline-block text-black/80 mb-1.5 md:mb-2">Ваш e‑mail</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          className={`relative my-0 rounded-[2rem] md:rounded-[2.5rem] border-2 ${errors.email && visibleErrors.email ? 'border-red-500/60 error-shake' : 'border-black/60'} bg-gradient-to-br from-white/15 to-white/8 px-4 py-3 text-black placeholder-black/50 caret-[var(--primary-color)] outline-none transition-all duration-500 hover:border-[var(--primary-color)]/40 hover:from-white/20 hover:to-white/12 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] focus:border-[var(--primary-color)]/60 focus:from-white/25 focus:to-white/15 focus:ring-4 focus:ring-[var(--primary-color)]/30 focus:shadow-[0_6px_30px_rgba(230,210,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1)] md:px-5 md:py-3.5`}
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      {errors.email && visibleErrors.email && (
                        <FormMessage className="error-message absolute left-full top-0 z-10" />
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="py-2 relative">
                    <FormLabel className="inline-block text-black/80 mb-1.5 md:mb-2">Ваше сообщение</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          className={`relative my-0 rounded-[2rem] md:rounded-[2.5rem] border-2 ${errors.message && visibleErrors.message ? 'border-red-500/60 error-shake' : 'border-black/60'} bg-gradient-to-br from-white/15 to-white/8 px-4 py-3 text-black placeholder-black/50 caret-[var(--primary-color)] outline-none transition-all duration-500 hover:border-[var(--primary-color)]/40 hover:from-white/20 hover:to-white/12 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] focus:border-[var(--primary-color)]/60 focus:from-white/25 focus:to-white/15 focus:ring-4 focus:ring-[var(--primary-color)]/30 focus:shadow-[0_6px_30px_rgba(230,210,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1)] min-h-[140px] md:min-h-[160px] resize-none md:px-5 md:py-3.5`}
                          placeholder="Коротко опишите задачу"
                          {...field}
                        />
                      </FormControl>
                      {errors.message && visibleErrors.message && (
                        <FormMessage className="error-message absolute left-full top-0 z-10" />
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <div className="sticky bottom-0 -mx-5 mt-1 flex items-center gap-2 bg-white/10 px-5 py-1.5 backdrop-blur-[12px] ring-1 ring-white/20 md:-mx-6 md:px-6">
                <Magentic
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (status !== "Loading") form.handleSubmit(onSubmit)();
                  }}
                  className="inline-flex h-11 md:h-13 items-center justify-center rounded-full bg-colorDark px-6 md:px-7 text-colorLight text-[15px] md:text-[17px] leading-none transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] active:translate-y-0 focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 select-none"
                  strength={40}
                  scrambleParams={{
                    text: status === "Loading" ? "Отправка…" : status === "Success" ? "Отправлено" : "Отправить",
                    chars: "-x",
                  }}
                >
                  <span className="scrambleText">{status === "Loading" ? "Отправка…" : status === "Success" ? "Отправлено" : "Отправить"}</span>
                </Magentic>
                <span className="text-sm opacity-80">или напишите в Telegram — внизу страницы</span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>,
    document.body,
  );
}


