import { NextResponse } from "next/server";

export const runtime = "nodejs";

function normalizedEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function envState(key: string): "SET" | "MISSING" {
  return normalizedEnv(process.env[key]) ? "SET" : "MISSING";
}

function isAuthorized(request: Request): boolean {
  const expectedToken = normalizedEnv(process.env.DEBUG_ENV_TOKEN);
  if (!expectedToken) {
    return true;
  }

  const url = new URL(request.url);
  const tokenFromQuery = normalizedEnv(url.searchParams.get("token") ?? undefined);
  const tokenFromHeader = normalizedEnv(request.headers.get("x-debug-token") ?? undefined);

  return tokenFromQuery === expectedToken || tokenFromHeader === expectedToken;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    SMTP_HOST: envState("SMTP_HOST"),
    SMTP_USER: envState("SMTP_USER"),
    SMTP_PORT: normalizedEnv(process.env.SMTP_PORT) ?? "MISSING",
    SMTP_SECURE: normalizedEnv(process.env.SMTP_SECURE) ?? "MISSING",
    ACCESS_FROM_EMAIL: envState("ACCESS_FROM_EMAIL"),
    ACCESS_TO_EMAIL: envState("ACCESS_TO_EMAIL"),
    EMAIL_SERVER: envState("EMAIL_SERVER"),
    EMAIL_USER: envState("EMAIL_USER"),
    SES_SMTP_HOST: envState("SES_SMTP_HOST"),
    SES_SMTP_USER: envState("SES_SMTP_USER"),
  });
}

