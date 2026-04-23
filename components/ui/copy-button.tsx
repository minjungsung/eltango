"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";

export function CopyButton({
  text,
  label,
  copiedLabel,
  className,
  variant = "outline",
  size = "sm",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "lg" | "default" | "icon";
}) {
  const t = useTranslations("contact.kakao");
  const [copied, setCopied] = useState(false);
  const resolvedLabel = label ?? t("copy");
  const resolvedCopied = copiedLabel ?? t("copied");
  return (
    <Button
      type="button"
      variant={copied ? "secondary" : variant}
      size={size}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // ignore
        }
      }}
      className={`inline-flex items-center gap-1 ${className ?? ""}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
      {copied ? resolvedCopied : resolvedLabel}
    </Button>
  );
}
