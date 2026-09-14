import { z } from "zod";

const numberField = z.preprocess((value) => Number(value), z.number().int().min(0));
const optionalNumber = z.preprocess(
  (value) => (value === "" || value === undefined ? null : Number(value)),
  z.number().int().min(0).nullable(),
);
const mediaReference = z.string().trim().refine((value) => value.startsWith("/") || URL.canParse(value));

export const scenicInputSchema = z.object({
  title: z.string().trim().min(1).max(255),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(5000).nullable().default(null),
  media_kind: z.enum(["image", "video"]),
  media_key: z.string().trim().min(1),
  media_url: mediaReference,
  poster_url: mediaReference.nullable().default(null),
  thumbnail_path: mediaReference.nullable().default(null),
  year: optionalNumber,
  project_label: z.string().trim().max(255).nullable().default(null),
  sort_order: numberField,
  is_published: z.coerce.boolean().default(false),
  is_featured: z.coerce.boolean().default(false),
});

export type ScenicInput = z.infer<typeof scenicInputSchema>;

export function selectPublishedScenicWorks<T extends { is_published: boolean; sort_order: number }>(records: T[]) {
  return records.filter((record) => record.is_published).sort((a, b) => a.sort_order - b.sort_order);
}

export function scenicFormData(formData: FormData): ScenicInput {
  return scenicInputSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description") || null,
    media_kind: formData.get("media_kind"),
    media_key: formData.get("media_key"),
    media_url: formData.get("media_url"),
    poster_url: formData.get("poster_url") || null,
    thumbnail_path: formData.get("thumbnail_path") || null,
    year: formData.get("year") || "",
    project_label: formData.get("project_label") || null,
    sort_order: formData.get("sort_order") || "0",
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
  });
}
