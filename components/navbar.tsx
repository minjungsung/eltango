"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigateToSection } from "@/components/full-page-scroll";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { hash: "about", label: t("about") },
    { hash: "beginner", label: t("classes") },
    { hash: "director", label: t("instructors") },
    { hash: "reviews", label: t("reviews") },
    { hash: "sns", label: t("sns") },
    { hash: "location", label: t("directions") },
    { hash: "blog", label: t("blog"), href: "/blog" },
  ];

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, hash: string) {
    if (
      pathname !== "/" ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    e.preventDefault();
    window.history.pushState(null, "", `#${hash}`);
    navigateToSection(hash);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={(e) => handleClick(e, "hero")}
          className="flex items-center gap-2"
        >
          <span className="font-serif text-lg font-bold text-primary">
            {t("brand")}
          </span>
          <span className="hidden text-[10px] text-muted-foreground sm:block">
            {t("tagline")}
          </span>
        </Link>

        <nav className="hidden gap-5 text-[13px] lg:flex">
          {links.map((link) => (
            <Link
              key={link.hash}
              href={link.href || `/#${link.hash}`}
              onClick={(e) => {
                if (link.href) return;
                handleClick(e, link.hash);
              }}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="rounded-sm px-5">
            <Link href="/#register" onClick={(e) => handleClick(e, "register")}>
              {t("cta")}
            </Link>
          </Button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("menu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden border-t border-border/30",
          open ? "block" : "hidden",
        )}
      >
        <div className="container grid gap-3 py-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.hash}
              href={link.href || `/#${link.hash}`}
              onClick={(e) => {
                setOpen(false);
                if (link.href) return;
                handleClick(e, link.hash);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-2">
            <Link
              href="/#register"
              onClick={(e) => {
                setOpen(false);
                handleClick(e, "register");
              }}
            >
              {t("cta")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
