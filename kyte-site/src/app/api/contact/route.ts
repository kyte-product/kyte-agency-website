import { NextRequest, NextResponse } from "next/server";

const services = new Set([
  "UX Research & Design Audits",
  "Website Design & Development",
  "Mobile App Design",
  "SaaS & Web App Design",
  "eCommerce & Shopify Websites",
  "Brand Strategy & Identity",
  "Graphic Design",
  "Video Production & Motion Graphics",
  "Social Media Marketing",
  "SEO & AI Search Optimisation",
  "More than one service",
  "Not sure yet",
]);

const timelines = new Set([
  "",
  "As soon as possible",
  "In the next 1–3 months",
  "Later this year",
  "Exploring options",
]);

function field(value: unknown, limit: number) {
  return typeof value === "string" && value.length <= limit ? value.trim() : null;
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 12000) {
    return NextResponse.json({ message: "Please shorten your message and try again." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ message: "This request could not be accepted." }, { status: 403 });
  }

  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 12000) throw new Error("Request too large");
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid request");
    input = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  if (input.website) return NextResponse.json({ ok: true });

  const name = field(input.name, 120);
  const email = field(input.email, 254);
  const company = field(input.company, 200);
  const service = field(input.service, 100);
  const timeline = field(input.timeline, 50);
  const project = field(input.project, 4000);
  const id = field(input.id, 36);

  if (!name || !email || company === null || !service || timeline === null || !project || !id ||
      !/^[0-9a-f-]{36}$/.test(id) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !services.has(service) || !timelines.has(timeline)) {
    return NextResponse.json({ message: "Please complete the required fields and try again." }, { status: 400 });
  }

  const endpoint = process.env.GOOGLE_CONTACT_WEBHOOK_URL;
  const secret = process.env.GOOGLE_CONTACT_WEBHOOK_SECRET;
  if (!endpoint || !secret) {
    return NextResponse.json({ message: "Online enquiries are temporarily unavailable. Please use the email address below." }, { status: 503 });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, id, name, email, company, service, timeline, project }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result: unknown = await response.json();
    if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
      throw new Error("Receiver did not confirm the submission");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ message: "We couldn't send your enquiry. Please try again or email Kyte directly." }, { status: 502 });
  }
}
