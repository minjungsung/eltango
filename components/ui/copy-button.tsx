"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";

export function CopyButton({
  text,
  label = "복사",
  className,
  variant = "outline",
  size = "sm",
}: {
  text: string;
  label?: string;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "lg" | "default" | "icon";
}) {
  const [copied, setCopied] = useState(false);
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
        } catch (e) {
          // ignore
        }
      }}
      className={`inline-flex items-center gap-1 ${className ?? ""}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
      {copied ? "복사됨" : label}
    </Button>
  );
}
