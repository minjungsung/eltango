"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

function formatKoreanPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.startsWith("02")) {
    if (digits.length < 6) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length < 10)
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length < 11)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

type Status = "idle" | "submitting" | "success" | "error";

export function RegisterForm({ source = "web" }: { source?: string }) {
  const t = useTranslations("registerForm");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [memo, setMemo] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setErrorMsg("");

    if (!name.trim()) {
      setStatus("error");
      setErrorMsg(t("errorName"));
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setStatus("error");
      setErrorMsg(t("errorPhone"));
      return;
    }
    if (!consent) {
      setStatus("error");
      setErrorMsg(t("errorConsent"));
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: digits,
          memo: memo.trim(),
          source,
          consent,
        }),
      });

      const data = (await res.json()) as {
        ok: boolean;
        redirectUrl?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          data.error === "SERVER_NOT_CONFIGURED"
            ? t("errorServer")
            : t("errorGeneric")
        );
        return;
      }

      setStatus("success");

      const redirectUrl = data.redirectUrl;
      if (redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 800);
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("errorNetwork"));
    }
  }

  const disabled = status === "submitting" || status === "success";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="space-y-2">
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          type="text"
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          autoComplete="name"
          required
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("phoneLabel")}</Label>
        <Input
          id="phone"
          type="tel"
          inputMode="numeric"
          placeholder={t("phonePlaceholder")}
          value={phone}
          onChange={(e) => setPhone(formatKoreanPhone(e.target.value))}
          autoComplete="tel"
          required
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="memo">{t("memoLabel")}</Label>
        <Textarea
          id="memo"
          placeholder={t("memoPlaceholder")}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          maxLength={500}
          rows={3}
          disabled={disabled}
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={disabled}
        />
        <span>{t("consent")}</span>
      </label>

      {status === "error" && errorMsg ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      ) : null}

      {status === "success" ? (
        <div className="flex items-start gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{t("success")}</span>
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={disabled}>
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("submitting")}
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {t("redirecting")}
          </>
        ) : (
          <>
            <MessageCircle className="mr-2 h-4 w-4" />
            {t("submit")}
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">{t("hint")}</p>
    </form>
  );
}
