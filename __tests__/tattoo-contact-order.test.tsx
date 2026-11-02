import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  getContactEmail,
  mailtoLink,
  tattooInstagramDmUrl,
  tattooInstagramUrl,
} from "@/app/_lib/tattoo/contact";
import CotizarPage from "../app/(tattoo)/tatuajes/cotizar/page";

describe("tattoo contact channels", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("publishes the Instagram profile and its direct messages", () => {
    expect(tattooInstagramUrl).toBe("https://instagram.com/pajaro_maca");
    expect(tattooInstagramDmUrl).toBe("https://ig.me/m/pajaro_maca");
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

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText(/Qué te gustaría tatuarte/), {
    target: { value: "Una rama de lavanda en el antebrazo" },
  });
  fireEvent.change(screen.getByLabelText(/En qué parte del cuerpo/), {
    target: { value: "antebrazo izquierdo" },
  });
  fireEvent.change(screen.getByLabelText(/Qué tamaño imaginas/), {
    target: { value: "10 × 15 cm" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Preparar mi mensaje/ }));
}

describe("cotizar composer", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("prepares the message from the three fields without sending anything", () => {
    render(<CotizarPage />);

    expect(screen.queryByText(/Así empieza la conversación/)).not.toBeInTheDocument();

    fillAndSubmit();

    expect(screen.getByText(/Así empieza la conversación/)).toBeInTheDocument();
    expect(screen.getByText(/Una rama de lavanda en el antebrazo/)).toBeInTheDocument();
    expect(screen.getByText(/antebrazo izquierdo/)).toBeInTheDocument();
    expect(screen.getByText(/10 × 15 cm/)).toBeInTheDocument();
  });

  it("leads with Instagram, then WhatsApp, then the published email", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "hola@pajaromaca.test");
    render(<CotizarPage />);

    fillAndSubmit();

    const actions = document.querySelector(".tp-cotizar__actions") as HTMLElement;

    expect(within(actions).getByRole("button", { name: /Abrir Instagram/ })).toBeInTheDocument();

    const links = within(actions).getAllByRole("link");

    expect(links).toHaveLength(2);
    expect(links[0].getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
    expect(links[1].getAttribute("href")).toMatch(/^mailto:hola@pajaromaca\.test\?/);
    expect(links[1]).toHaveTextContent("hola@pajaromaca.test");
  });

  it("offers the Instagram destination pointed at the profile's direct messages", async () => {
    render(<CotizarPage />);

    fillAndSubmit();

    expect(tattooInstagramDmUrl).toBe("https://ig.me/m/pajaro_maca");
    expect(screen.getByText(/Instagram no admite texto precargado/)).toBeInTheDocument();
  });
});
