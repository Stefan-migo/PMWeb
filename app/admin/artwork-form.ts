import { z } from "zod";

const numberField = z.preprocess((value) => Number(value), z.number().int().min(0));
const optionalNumber = z.preprocess(
  (value) => (value === "" || value === undefined ? null : Number(value)),
  z.number().int().min(0).nullable(),
);

export const artworkInputSchema = z.object({
  title: z.string().trim().min(1).max(255),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(5000).nullable().default(null),
  image_path: z.string().trim().refine((value) => value.startsWith("/") || URL.canParse(value)),
  thumbnail_path: z
    .string()
    .trim()
    .refine((value) => value.startsWith("/") || URL.canParse(value))
    .nullable()
    .default(null),
  medium: z.string().trim().max(255).nullable().default(null),
  year: optionalNumber,
  sort_order: numberField,
  is_published: z.coerce.boolean().default(false),
  is_featured: z.coerce.boolean().default(false),
  is_for_sale: z.coerce.boolean().default(false),
  price_cents: optionalNumber,
});

export type ArtworkInput = z.infer<typeof artworkInputSchema>;

export function selectPublishedArtworks<T extends { is_published: boolean; sort_order: number }>(records: T[]) {
  return records.filter((record) => record.is_published).sort((a, b) => a.sort_order - b.sort_order);
}

export function artworkFormData(formData: FormData) {
  return artworkInputSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description") || null,
    image_path: formData.get("image_path"),
    thumbnail_path: formData.get("thumbnail_path") || null,
    medium: formData.get("medium") || null,
    year: formData.get("year") || "",
    sort_order: formData.get("sort_order") || "0",
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
    is_for_sale: formData.get("is_for_sale") === "on",
    price_cents: formData.get("price_cents") || "",
  });
}
