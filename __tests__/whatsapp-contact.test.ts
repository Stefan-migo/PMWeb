import { afterEach, describe, expect, it, vi } from "vitest";
import { getWhatsAppNumber, whatsAppLink } from "@/app/_lib/tattoo/contact";

describe("whatsapp contact", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses the configured number", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "56929280024");

    expect(getWhatsAppNumber()).toBe("56929280024");
    expect(whatsAppLink("hola")).toBe("https://wa.me/56929280024?text=hola");
  });

  it("falls back to the documented placeholder when the variable is absent", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "");

    expect(getWhatsAppNumber()).toBe("56912345678");
  });

  it("encodes the prefilled message", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "56929280024");

    expect(whatsAppLink("Hola, quiero\ncotizar")).toBe(
      "https://wa.me/56929280024?text=Hola%2C%20quiero%0Acotizar",
    );
  });
});
