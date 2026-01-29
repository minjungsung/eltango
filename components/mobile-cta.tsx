"use client";

import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, CheckCircle } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/80 backdrop-blur md:hidden">
      <div className="container grid grid-cols-3 gap-2 p-3">
        <Button asChild size="sm">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdqxyTy_5SwYwzzmRQC3-nyWK0kmvQr8ue6MVLbYXeUdp57vQ/viewform?usp=send_form" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
            <CheckCircle className="h-4 w-4" /> 신청
          </a>
        </Button>
        <Button asChild variant="secondary" size="sm" className="inline-flex items-center gap-1">
          <a href="tel:+821024150563">
            <Phone className="h-4 w-4" /> 전화
          </a>
        </Button>
        <CopyButton text="@fishlove0" label="카톡ID" className="w-full" size="sm" variant="outline" />
      </div>
    </div>
  );
}
