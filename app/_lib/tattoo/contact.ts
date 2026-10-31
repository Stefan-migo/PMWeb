/**
 * The number publishes as-is in every `wa.me` link. The fallback keeps local and
 * CI screens rendering something clickable, but it is not a real number: any
 * environment that publishes the site must set `NEXT_PUBLIC_WHATSAPP_NUMBER`.
 * CI does not set it today, so the e2e suite depends on this fallback.
 */
const FALLBACK_WHATSAPP_NUMBER = "56912345678";

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_WHATSAPP_NUMBER;
}

export function whatsAppLink(message: string): string {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
