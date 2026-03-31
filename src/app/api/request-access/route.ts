import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type AccessPayload = {
  email: string;
  fullName: string;
  organization: string;
  role: string;
  useCase: string;
};

type ParsedBody = Record<string, FormDataEntryValue | unknown>;
type MailConfig = {
  accessFromEmail?: string;
  accessToEmail?: string;
  awsRegion?: string;
  emailPassword?: string;
  emailPort?: string;
  emailSecure?: string;
  emailServer?: string;
  emailUser?: string;
  mailHost?: string;
  mailPass?: string;
  mailPort?: string;
  mailSecure?: string;
  mailUser?: string;
  sesSmtpHost?: string;
  sesSmtpPass?: string;
  sesSmtpUser?: string;
  smtpConnectionTimeoutMs?: string;
  smtpGreetingTimeoutMs?: string;
  smtpHost?: string;
  smtpPass?: string;
  smtpPassword?: string;
  smtpPort?: string;
  smtpSecure?: string;
  smtpSocketTimeoutMs?: string;
  smtpUser?: string;
  smtpUsername?: string;
};
type MailErrorCode =
  | "MAIL_AUTH_FAILED"
  | "MAIL_CONFIG_MISSING"
  | "MAIL_CONNECTION_FAILED"
  | "MAIL_SEND_FAILED"
  | "MAIL_TIMEOUT"
  | "MAIL_TLS_FAILED";

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function requestOrigin(request: Request): string {
  const origin = request.headers.get("origin");
  if (origin) {
    return origin;
  }

  const referer = request.headers.get("referer");
  if (referer) {
    return referer;
  }

  return "unknown";
}

async function parseBody(request: Request): Promise<AccessPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as ParsedBody;
    return {
      email: normalizeString(body.email),
      fullName: normalizeString(body.fullName),
      organization: normalizeString(body.organization),
      role: normalizeString(body.role),
      useCase: normalizeString(body.useCase),
    };
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData();
    return {
      email: normalizeString(form.get("email")),
      fullName: normalizeString(form.get("fullName")),
      organization: normalizeString(form.get("organization")),
      role: normalizeString(form.get("role")),
      useCase: normalizeString(form.get("useCase")),
    };
  }

  throw new Error("Unsupported content type");
}

function validatePayload(payload: AccessPayload): string | null {
  if (
    !payload.fullName ||
    !payload.organization ||
    !payload.role ||
    !payload.email ||
    !payload.useCase
  ) {
    return "All fields are required.";
  }

  if (payload.fullName.length > 120) {
    return "Full name is too long.";
  }
  if (payload.organization.length > 160) {
    return "Organization is too long.";
  }
  if (payload.role.length > 120) {
    return "Role is too long.";
  }
  if (payload.email.length > 254) {
    return "Email is too long.";
  }
  if (payload.useCase.length > 5000) {
    return "Use case is too long.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(payload.email)) {
    return "Please provide a valid email address.";
  }

  return null;
}

function normalizedEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function readMailConfig(): MailConfig {
  return {
    accessFromEmail:
      normalizedEnv(process.env.ACCESS_FROM_EMAIL) ??
      normalizedEnv(process.env.CONTACT_FROM_EMAIL),
    accessToEmail:
      normalizedEnv(process.env.ACCESS_TO_EMAIL) ??
      normalizedEnv(process.env.CONTACT_TO_EMAIL),
    awsRegion:
      normalizedEnv(process.env.AWS_REGION) ??
      normalizedEnv(process.env.AWS_DEFAULT_REGION),
    emailPassword: normalizedEnv(process.env.EMAIL_PASSWORD),
    emailPort: normalizedEnv(process.env.EMAIL_PORT),
    emailSecure: normalizedEnv(process.env.EMAIL_SECURE),
    emailServer: normalizedEnv(process.env.EMAIL_SERVER),
    emailUser: normalizedEnv(process.env.EMAIL_USER),
    mailHost: normalizedEnv(process.env.MAIL_HOST),
    mailPass:
      normalizedEnv(process.env.MAIL_PASS) ??
      normalizedEnv(process.env.MAIL_PASSWORD),
    mailPort: normalizedEnv(process.env.MAIL_PORT),
    mailSecure: normalizedEnv(process.env.MAIL_SECURE),
    mailUser: normalizedEnv(process.env.MAIL_USER),
    sesSmtpHost: normalizedEnv(process.env.SES_SMTP_HOST),
    sesSmtpPass:
      normalizedEnv(process.env.SES_SMTP_PASS) ??
      normalizedEnv(process.env.SES_SMTP_PASSWORD),
    sesSmtpUser:
      normalizedEnv(process.env.SES_SMTP_USER) ??
      normalizedEnv(process.env.SES_SMTP_USERNAME),
    smtpConnectionTimeoutMs: normalizedEnv(
      process.env.SMTP_CONNECTION_TIMEOUT_MS,
    ),
    smtpGreetingTimeoutMs: normalizedEnv(process.env.SMTP_GREETING_TIMEOUT_MS),
    smtpHost: normalizedEnv(process.env.SMTP_HOST),
    smtpPass: normalizedEnv(process.env.SMTP_PASS),
    smtpPassword: normalizedEnv(process.env.SMTP_PASSWORD),
    smtpPort: normalizedEnv(process.env.SMTP_PORT),
    smtpSecure: normalizedEnv(process.env.SMTP_SECURE),
    smtpSocketTimeoutMs: normalizedEnv(process.env.SMTP_SOCKET_TIMEOUT_MS),
    smtpUser: normalizedEnv(process.env.SMTP_USER),
    smtpUsername: normalizedEnv(process.env.SMTP_USERNAME),
  };
}

function parsePositiveInteger(rawValue: string, fieldName: string): number {
  const parsed = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${fieldName} must be a valid positive integer`);
  }

  return parsed;
}

function parseSmtpPort(rawPort: string): number {
  return parsePositiveInteger(rawPort, "SMTP_PORT or EMAIL_PORT");
}

function parseTimeoutMs(
  rawValue: string | undefined,
  fieldName: string,
  fallbackMs: number,
): number {
  if (!rawValue) {
    return fallbackMs;
  }

  return parsePositiveInteger(rawValue, fieldName);
}

function parseSmtpSecure(rawValue: string | undefined, port: number): boolean {
  if (!rawValue) {
    return port === 465;
  }

  const normalized = rawValue.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function buildSesHostFromRegion(region: string | undefined): string | undefined {
  return region ? `email-smtp.${region}.amazonaws.com` : undefined;
}

function classifyMailError(error: unknown): MailErrorCode {
  if (
    error instanceof Error &&
    error.message.startsWith("Missing required environment variable:")
  ) {
    return "MAIL_CONFIG_MISSING";
  }

  const code =
    typeof (error as { code?: unknown })?.code === "string"
      ? (error as { code: string }).code
      : "";

  if (code === "EAUTH") {
    return "MAIL_AUTH_FAILED";
  }
  if (code === "ETIMEDOUT") {
    return "MAIL_TIMEOUT";
  }
  if (
    code === "ESOCKET" ||
    code === "ECONNECTION" ||
    code === "ECONNREFUSED" ||
    code === "ECONNRESET" ||
    code === "ENETUNREACH" ||
    code === "ENOTFOUND" ||
    code === "EHOSTUNREACH"
  ) {
    return "MAIL_CONNECTION_FAILED";
  }
  if (error instanceof Error && /tls|ssl|certificate/i.test(error.message)) {
    return "MAIL_TLS_FAILED";
  }

  return "MAIL_SEND_FAILED";
}

function createRequestId(): string {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `${Date.now().toString(36)}-${randomPart}`;
}

function configSnapshot(config: MailConfig) {
  const host =
    config.smtpHost ??
    config.mailHost ??
    config.emailServer ??
    config.sesSmtpHost ??
    buildSesHostFromRegion(config.awsRegion);
  const user =
    config.smtpUser ??
    config.smtpUsername ??
    config.mailUser ??
    config.emailUser ??
    config.sesSmtpUser;
  const pass =
    config.smtpPass ??
    config.smtpPassword ??
    config.mailPass ??
    config.emailPassword ??
    config.sesSmtpPass;

  return {
    accessFromEmailSet: Boolean(config.accessFromEmail),
    accessToEmailSet: Boolean(config.accessToEmail),
    awsRegion: config.awsRegion ?? null,
    emailAliasSet: Boolean(
      config.emailServer ||
        config.emailUser ||
        config.emailPassword ||
        config.emailPort ||
        config.emailSecure,
    ),
    host: host ?? null,
    mailAliasSet: Boolean(
      config.mailHost ||
        config.mailUser ||
        config.mailPass ||
        config.mailPort ||
        config.mailSecure,
    ),
    portRaw: config.smtpPort ?? config.mailPort ?? config.emailPort ?? "587",
    secureRaw:
      config.smtpSecure ?? config.mailSecure ?? config.emailSecure ?? null,
    sesAliasSet: Boolean(
      config.sesSmtpHost || config.sesSmtpUser || config.sesSmtpPass,
    ),
    smtpAliasSet: Boolean(
      config.smtpHost ||
        config.smtpUser ||
        config.smtpUsername ||
        config.smtpPass ||
        config.smtpPassword ||
        config.smtpPort ||
        config.smtpSecure,
    ),
    userSet: Boolean(user),
    passSet: Boolean(pass),
  };
}

function buildMessageText(payload: AccessPayload, origin: string) {
  return [
    "New SoilSynth request-access submission",
    "",
    `Full Name: ${payload.fullName}`,
    `Organization: ${payload.organization}`,
    `Role: ${payload.role}`,
    `Email: ${payload.email}`,
    `Origin: ${origin}`,
    "",
    "Use Case:",
    payload.useCase,
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildInfoRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 10px 12px; background: #f8fafc; color: #334155; font-size: 14px; font-weight: 600; width: 180px; border-bottom: 1px solid #e2e8f0;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 10px 12px; color: #0f172a; font-size: 14px; border-bottom: 1px solid #e2e8f0;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function buildMessageHtml(payload: AccessPayload, origin: string): string {
  const submittedAt = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SoilSynth Access Request</title>
  </head>
  <body style="margin: 0; padding: 0; background: #f1f5f9; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f1f5f9; padding: 24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width: 640px; width: 100%; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0;">
            <tr>
              <td style="padding: 18px 24px; background: linear-gradient(90deg, #12201a 0%, #1f7a63 100%); color: #ffffff;">
                <h1 style="margin: 0; font-size: 20px; line-height: 1.3; font-weight: 700;">SoilSynth Access Request</h1>
                <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.95;">A new partner request has been submitted from the website.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  ${buildInfoRow("Full Name", payload.fullName)}
                  ${buildInfoRow("Organization", payload.organization)}
                  ${buildInfoRow("Role", payload.role)}
                  ${buildInfoRow("Email", payload.email)}
                  ${buildInfoRow("Origin", origin)}
                  ${buildInfoRow("Submitted At", submittedAt)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 24px 24px;">
                <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; background: #f8fafc;">
                  <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; color: #334155;">Use Case</p>
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #0f172a; white-space: pre-wrap;">${escapeHtml(payload.useCase)}</p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

async function sendAccessEmail(payload: AccessPayload, origin: string) {
  const config = readMailConfig();
  const host =
    config.smtpHost ??
    config.mailHost ??
    config.emailServer ??
    config.sesSmtpHost ??
    buildSesHostFromRegion(config.awsRegion);
  if (!host) {
    throw new Error(
      "Missing required environment variable: SMTP_HOST or EMAIL_SERVER (or MAIL_HOST / SES_SMTP_HOST / AWS_REGION)",
    );
  }

  const user =
    config.smtpUser ??
    config.smtpUsername ??
    config.mailUser ??
    config.emailUser ??
    config.sesSmtpUser;
  if (!user) {
    throw new Error(
      "Missing required environment variable: SMTP_USER or EMAIL_USER (or SMTP_USERNAME / MAIL_USER / SES_SMTP_USER)",
    );
  }

  const pass =
    config.smtpPass ??
    config.smtpPassword ??
    config.mailPass ??
    config.emailPassword ??
    config.sesSmtpPass;
  if (!pass) {
    throw new Error(
      "Missing required environment variable: SMTP_PASS or EMAIL_PASSWORD (or SMTP_PASSWORD / MAIL_PASS / SES_SMTP_PASS)",
    );
  }

  const port = parseSmtpPort(
    config.smtpPort ?? config.mailPort ?? config.emailPort ?? "587",
  );
  const secure = parseSmtpSecure(
    config.smtpSecure ?? config.mailSecure ?? config.emailSecure,
    port,
  );
  const connectionTimeout = parseTimeoutMs(
    config.smtpConnectionTimeoutMs,
    "SMTP_CONNECTION_TIMEOUT_MS",
    10_000,
  );
  const greetingTimeout = parseTimeoutMs(
    config.smtpGreetingTimeoutMs,
    "SMTP_GREETING_TIMEOUT_MS",
    10_000,
  );
  const socketTimeout = parseTimeoutMs(
    config.smtpSocketTimeoutMs,
    "SMTP_SOCKET_TIMEOUT_MS",
    20_000,
  );

  const to = config.accessToEmail ?? user;
  const from = config.accessFromEmail ?? config.emailUser ?? config.mailUser ?? user;

  const transporter = nodemailer.createTransport({
    auth: { pass, user },
    connectionTimeout,
    greetingTimeout,
    host,
    port,
    secure,
    socketTimeout,
  });

  await transporter.sendMail({
    from,
    html: buildMessageHtml(payload, origin),
    replyTo: payload.email,
    subject: `SoilSynth Request Access: ${payload.organization}`,
    text: buildMessageText(payload, origin),
    to,
  });
}

async function methodNotAllowed() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(request: Request) {
  let payload: AccessPayload;
  const requestId = createRequestId();

  try {
    payload = await parseBody(request);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Use JSON or form-encoded payload." },
      { status: 400 },
    );
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    await sendAccessEmail(payload, requestOrigin(request));
    return NextResponse.json({ ok: true, message: "Request received" });
  } catch (error) {
    const mailConfig = readMailConfig();
    const errorCode = classifyMailError(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown mail delivery error";

    console.error("Request access email error:", {
      errorCode,
      errorMessage,
      requestId,
      snapshot: configSnapshot(mailConfig),
    });

    const isDevelopment = process.env.NODE_ENV !== "production";

    return NextResponse.json(
      {
        error: "Unable to send request right now. Please try again shortly.",
        errorCode,
        requestId,
        ...(isDevelopment ? { debug: { errorMessage } } : {}),
      },
      { status: 500 },
    );
  }
}

export const DELETE = methodNotAllowed;
export const GET = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const PUT = methodNotAllowed;
