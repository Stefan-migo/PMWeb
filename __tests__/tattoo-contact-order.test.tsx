import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import {
  getContactEmail,
  mailtoLink,
  tattooInstagramUrl,
} from "@/app/_lib/tattoo/contact";
import CotizarPage from "../app/(tattoo)/tatuajes/cotizar/page";

describe("tattoo contact channels", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("publishes the Instagram profile as the primary channel", () => {
    expect(tattooInstagramUrl).toBe("https://instagram.com/pajaro_maca");
  });

  it("publishes the configured email address", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "hola@pajaromaca.test");

    expect(getContactEmail()).toBe("hola@pajaromaca.test");
  });

  it("falls back to the artist address when no email is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");

    expect(getContactEmail()).toBe("pajaro.maca.arte@gmail.com");
  });

  it("builds a mailto link whose subject is encoded", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "hola@pajaromaca.test");

    expect(mailtoLink("Cotización de tatuaje")).toBe(
      "mailto:hola@pajaromaca.test?subject=Cotizaci%C3%B3n%20de%20tatuaje",
    );
  });
});

describe("cotizar page contact order", () => {
  it("offers Instagram first, then WhatsApp, then the published email", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "hola@pajaromaca.test");
    render(<CotizarPage />);

    const contact = screen.getByRole("region", { name: "Contacto para cotizar" });
    const links = within(contact).getAllByRole("link");

    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", tattooInstagramUrl);
    expect(links[1].getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
    expect(links[2].getAttribute("href")).toMatch(/^mailto:hola@pajaromaca\.test\?/);

    vi.unstubAllEnvs();
  });

  it("publishes the email address as readable text instead of a form", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "hola@pajaromaca.test");
    const { container } = render(<CotizarPage />);

    const contact = screen.getByRole("region", { name: "Contacto para cotizar" });

    expect(within(contact).getByText("hola@pajaromaca.test")).toBeInTheDocument();
    expect(container.querySelector("form")).toBeNull();

    vi.unstubAllEnvs();
  });
});
