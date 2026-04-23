"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

export function MobileCTA() {
  const t = useTranslations("mobileCta");
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/80 backdrop-blur md:hidden">
      <div className="container grid grid-cols-3 gap-2 p-3">
        <Button asChild size="sm">
          <a href="#register" className="inline-flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> {t("openChat")}
          </a>
        </Button>
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="inline-flex items-center gap-1"
        >
          <a href="tel:+821024150563">
            <Phone className="h-4 w-4" /> {t("call")}
          </a>
        </Button>
        <CopyButton
          text="@fishlove0"
          label={t("kakaoId")}
          className="w-full"
          size="sm"
          variant="outline"
        />
      </div>
    </div>
  );
}
