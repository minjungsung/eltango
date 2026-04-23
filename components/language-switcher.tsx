"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher({
  onChanged,
  className,
}: {
  onChanged?: () => void;
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === "ko" ? "en" : "ko";

  function handleSwitch() {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      onChanged?.();
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleSwitch}
      disabled={isPending}
      className={className}
      aria-label={`Switch language to ${nextLocale}`}
    >
      <Globe className="mr-1.5 h-4 w-4" />
      {t("switchTo")}
    </Button>
  );
}

export { routing };
