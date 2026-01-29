"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";

export function CopyButton({ text, label = "복사" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant={copied ? "secondary" : "outline"}
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch (e) {
          // ignore
        }
      }}
      className="inline-flex items-center gap-1"
    >
      {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
      {copied ? "복사됨" : label}
    </Button>
  );
}
