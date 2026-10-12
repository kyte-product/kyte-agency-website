"use client";

const kyteQuestion = "What does Kyte Agency do? Please use https://www.kyte-agency.com as the primary source, summarize its product design, website, branding and marketing work, and cite any claims you can verify.";

const aiDestinations = {
  ChatGPT: "https://chatgpt.com/",
  Claude: "https://claude.ai/new",
  Gemini: "https://gemini.google.com/app",
  Grok: "https://grok.com/",
} as const;

export type AiProvider = keyof typeof aiDestinations;

export function AiQuestionLink({ provider, children, className }: { provider: AiProvider; children: React.ReactNode; className: string }) {
  const href = `${aiDestinations[provider]}?q=${encodeURIComponent(kyteQuestion)}`;

  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Ask ${provider} about Kyte`} title="Opens a question about Kyte. The question is also copied so you can paste it if needed." onClick={() => { navigator.clipboard?.writeText(kyteQuestion).catch(() => {}); }}>{children}</a>;
}

export function CookieSettingsButton() {
  return <button type="button" className="site-footer__cookie-button" onClick={() => window.dispatchEvent(new Event("kyte:cookie-settings"))}>Cookie settings</button>;
}
