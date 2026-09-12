import { z } from "zod";

const numberField = z.preprocess((value) => Number(value), z.number().int().min(0));

export const tattooInputSchema = z.object({
  title: z.string().trim().min(1).max(255),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(5000).nullable().default(null),
  image_path: z.string().trim().refine((value) => value.startsWith("/") || URL.canParse(value)),
  sort_order: numberField,
  is_published: z.coerce.boolean().default(false),
  is_featured: z.coerce.boolean().default(false),
});

export function tattooFormData(formData: FormData) {
  return tattooInputSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description") || null,
    image_path: formData.get("image_path"),
    sort_order: formData.get("sort_order") || "0",
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
  });
}
