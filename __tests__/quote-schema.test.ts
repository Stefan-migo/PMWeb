import { describe, it, expect } from "vitest";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(8, "Ingresa un número válido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  description: z.string().min(10, "Cuéntame más sobre tu idea (mínimo 10 caracteres)"),
  placement: z.string().optional(),
  size_approx: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

describe("Quote Form Schema", () => {
  it("accepts valid quote data", () => {
    const data: QuoteFormData = {
      name: "Juan Pérez",
      phone: "+56912345678",
      email: "juan@ejemplo.com",
      description: "Quiero un tatuaje de un lobo en el brazo, estilo blackwork.",
      placement: "brazo",
      size_approx: "10x15 cm",
    };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts minimal valid data", () => {
    const data = {
      name: "Ana",
      phone: "12345678",
      description: "Un diseño floral para mi antebrazo derecho.",
    };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const data = { name: "", phone: "12345678", description: "Some description" };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("name");
    }
  });

  it("rejects short name", () => {
    const data = { name: "A", phone: "12345678", description: "Some description" };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects short phone", () => {
    const data = { name: "Juan", phone: "123", description: "Some description" };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects short description", () => {
    const data = { name: "Juan", phone: "12345678", description: "Corto" };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const data = {
      name: "Juan",
      phone: "12345678",
      email: "not-an-email",
      description: "A valid description with enough characters here.",
    };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts empty email", () => {
    const data = {
      name: "Juan",
      phone: "12345678",
      email: "",
      description: "A valid description with enough characters here.",
    };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects filled honeypot", () => {
    const data = {
      name: "Juan",
      phone: "12345678",
      description: "A valid description with enough characters here.",
      honeypot: "bot value",
    };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts undefined honeypot", () => {
    const data = {
      name: "Juan",
      phone: "12345678",
      description: "A valid description with enough characters here.",
    };
    const result = quoteSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
