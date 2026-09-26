"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Phone, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileCTA() {
  const t = useTranslations("mobileCta");
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.innerWidth < 768;
      setIsMobile(hasTouch && isNarrow);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      {/* Expanded options */}
      <div
        className={cn(
          "flex flex-col gap-2 transition-all duration-200",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <a
          href="https://open.kakao.com/o/sVeY3gPi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg"
          onClick={() => setOpen(false)}
        >
          <MessageCircle className="h-4 w-4" />
          {t("openChat")}
        </a>
        <a
          href="tel:+821024150563"
          className="flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-lg border border-border/50"
          onClick={() => setOpen(false)}
        >
          <Phone className="h-4 w-4" />
          {t("call")}
        </a>
      </div>

      {/* FAB toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200",
          open
            ? "bg-card text-foreground border border-border/50 rotate-0"
            : "bg-primary text-primary-foreground rotate-0",
        )}
        aria-label={open ? "닫기" : t("openChat")}
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
