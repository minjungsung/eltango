import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RegisterPayload = {
  name?: string;
  phone?: string;
  memo?: string;
  source?: string;
  consent?: boolean;
};

function sanitizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, "");
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

/**
 * Resolve the Google Forms submission endpoint.
 * Accepts either:
 *   - GOOGLE_FORM_ID = "1FAIpQLSdq..." (just the long form ID), or
 *   - GOOGLE_FORM_URL = a full .../viewform or .../formResponse URL
 */
function resolveFormResponseUrl(): string | null {
  const direct = process.env.GOOGLE_FORM_URL;
  if (direct) {
    if (direct.includes("/formResponse")) return direct;
    return direct.replace(/\/(viewform|prefill)(\?.*)?$/i, "/formResponse");
  }
  const id = process.env.GOOGLE_FORM_ID;
  if (id) return `https://docs.google.com/forms/d/e/${id}/formResponse`;
  return null;
}

export async function POST(request: Request) {
  let body: RegisterPayload;
  try {
    body = (await request.json()) as RegisterPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = sanitizePhone(body.phone ?? "");
  const memo = (body.memo ?? "").trim().slice(0, 500);
  const source = (body.source ?? "web").trim().slice(0, 50);
  const consent = body.consent === true;

  if (!name || name.length < 1 || name.length > 50) {
    return NextResponse.json({ ok: false, error: "INVALID_NAME" }, { status: 400 });
  }
  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "INVALID_PHONE" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ ok: false, error: "CONSENT_REQUIRED" }, { status: 400 });
  }

  const formUrl = resolveFormResponseUrl();
  const openChatUrl = process.env.NEXT_PUBLIC_KAKAO_OPENCHAT_URL ?? "";

  if (!formUrl) {
    return NextResponse.json(
      { ok: false, error: "SERVER_NOT_CONFIGURED" },
      { status: 500 }
    );
  }

  const nameEntry = process.env.GOOGLE_FORM_ENTRY_NAME;
  const phoneEntry = process.env.GOOGLE_FORM_ENTRY_PHONE;
  const memoEntry = process.env.GOOGLE_FORM_ENTRY_MEMO;
  const sourceEntry = process.env.GOOGLE_FORM_ENTRY_SOURCE;
  const consentEntry = process.env.GOOGLE_FORM_ENTRY_CONSENT;

  if (!nameEntry || !phoneEntry) {
    return NextResponse.json(
      { ok: false, error: "SERVER_NOT_CONFIGURED" },
      { status: 500 }
    );
  }

  const formData = new URLSearchParams();
  formData.append(`entry.${nameEntry}`, name);
  formData.append(`entry.${phoneEntry}`, phone);
  if (memo && memoEntry) formData.append(`entry.${memoEntry}`, memo);
  if (sourceEntry) formData.append(`entry.${sourceEntry}`, source);
  if (consentEntry) formData.append(`entry.${consentEntry}`, consent ? "Y" : "N");

  try {
    const res = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          request.headers.get("user-agent") ?? "eltango-register/1.0",
      },
      body: formData.toString(),
      cache: "no-store",
      redirect: "follow",
    });

    // Google Forms returns 200 on success (with the "response recorded" HTML
    // page). Anything else means the form ID or an entry ID is wrong.
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "UPSTREAM_ERROR", status: res.status },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, redirectUrl: openChatUrl });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "NETWORK_ERROR", message: (err as Error).message },
      { status: 502 }
    );
  }
}
