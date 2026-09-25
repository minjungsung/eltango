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

export async function POST(request: Request) {
  let body: RegisterPayload;
  try {
    body = (await request.json()) as RegisterPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const name = (body.name ?? "").trim();
  const phone = sanitizePhone(body.phone ?? "");
  const memo = (body.memo ?? "").trim().slice(0, 500);
  const source = (body.source ?? "web").trim().slice(0, 50);
  const consent = body.consent === true;

  if (!name || name.length < 1 || name.length > 50) {
    return NextResponse.json(
      { ok: false, error: "INVALID_NAME" },
      { status: 400 }
    );
  }
  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "INVALID_PHONE" },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "CONSENT_REQUIRED" },
      { status: 400 }
    );
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const openChatUrl = process.env.NEXT_PUBLIC_KAKAO_OPENCHAT_URL ?? "";

  if (!scriptUrl) {
    return NextResponse.json(
      { ok: false, error: "SERVER_NOT_CONFIGURED" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, memo, source }),
      redirect: "follow",
    });

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
