"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="#"
          className="font-serif text-lg font-medium tracking-tight"
        >
          {t("brand")}
        </a>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#studio" className="text-muted-foreground hover:text-foreground">
            {t("features")}
          </a>
          <a href="#schedule" className="text-muted-foreground hover:text-foreground">
            {t("schedule")}
          </a>
          <a href="#instructors" className="text-muted-foreground hover:text-foreground">
            {t("instructors")}
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground">
            {t("pricing")}
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground">
            {t("faq")}
          </a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Button asChild>
            <a href="#register">{t("cta")}</a>
          </Button>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("menu")}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className={cn("md:hidden border-t", open ? "block" : "hidden")}>
        <div className="container grid gap-2 py-4 text-sm">
          <a href="#studio" onClick={() => setOpen(false)}>
            {t("features")}
          </a>
          <a href="#schedule" onClick={() => setOpen(false)}>
            {t("schedule")}
          </a>
          <a href="#instructors" onClick={() => setOpen(false)}>
            {t("instructors")}
          </a>
          <a href="#pricing" onClick={() => setOpen(false)}>
            {t("pricing")}
          </a>
          <a href="#faq" onClick={() => setOpen(false)}>
            {t("faq")}
          </a>
          <div className="mt-2">
            <LanguageSwitcher onChanged={() => setOpen(false)} className="px-0" />
          </div>
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
