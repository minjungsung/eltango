"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigateToSection } from "@/components/full-page-scroll";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { hash: "about", label: t("about") },
    { hash: "beginner", label: t("classes") },
    { hash: "director", label: t("instructors") },
    { hash: "reviews", label: t("reviews") },
    { hash: "sns", label: t("sns") },
    { hash: "location", label: t("directions") },
  ];

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, hash: string) {
    e.preventDefault();
    window.history.pushState(null, "", `#${hash}`);
    navigateToSection(hash);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a
          href={`/${locale}`}
          onClick={(e) => handleClick(e, "hero")}
          className="flex items-center gap-2"
        >
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
              key={link.hash}
              href={`#${link.hash}`}
              onClick={(e) => handleClick(e, link.hash)}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="rounded-sm px-5">
            <a
              href="#register"
              onClick={(e) => handleClick(e, "register")}
            >
              {t("cta")}
            </a>
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

      <div
        className={cn(
          "lg:hidden border-t border-border/30",
          open ? "block" : "hidden",
        )}
      >
        <div className="container grid gap-3 py-4 text-sm">
          {links.map((link) => (
            <a
              key={link.hash}
              href={`#${link.hash}`}
              onClick={(e) => {
                setOpen(false);
                handleClick(e, link.hash);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-2">
            <a
              href="#register"
              onClick={(e) => {
                setOpen(false);
                handleClick(e, "register");
              }}
            >
              {t("cta")}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
