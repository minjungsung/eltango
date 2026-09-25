"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t("about") },
    { href: `/${locale}/classes`, label: t("classes") },
    { href: `/${locale}/instructors`, label: t("instructors") },
    { href: `/${locale}/community`, label: t("community") },
    { href: `/${locale}/faq`, label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold text-primary">
            {t("brand")}
          </span>
          <span className="hidden text-[10px] text-muted-foreground sm:block">
            Argentine Tango Studio
          </span>
        </a>

        <nav className="hidden gap-5 text-[13px] lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="rounded-sm px-5">
            <a href="#register">{t("cta")}</a>
          </Button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("menu")}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn("lg:hidden border-t border-border/30", open ? "block" : "hidden")}>
        <div className="container grid gap-3 py-4 text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-2">
            <a href="#register" onClick={() => setOpen(false)}>
              {t("cta")}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
