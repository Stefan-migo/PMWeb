/**
 * The number publishes as-is in every `wa.me` link. The fallback keeps local and
 * CI screens rendering something clickable, but it is not a real number: any
 * environment that publishes the site must set `NEXT_PUBLIC_WHATSAPP_NUMBER`.
 * CI does not set it today, so the e2e suite depends on this fallback.
 */
const FALLBACK_WHATSAPP_NUMBER = "56912345678";

/**
 * Contact hierarchy for every tattoo surface: Instagram first, WhatsApp second,
 * email last. The email is published as an address, never behind a form.
 */
const FALLBACK_CONTACT_EMAIL = "pajaro.maca.arte@gmail.com";

export const tattooInstagramUrl = "https://instagram.com/pajaro_maca";

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_WHATSAPP_NUMBER;
}

export function whatsAppLink(message: string): string {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || FALLBACK_CONTACT_EMAIL;
}

export function mailtoLink(subject: string): string {
  return `mailto:${getContactEmail()}?subject=${encodeURIComponent(subject)}`;
}
