import "server-only";
import { DeleteObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif",
  "video/mp4": "mp4", "video/webm": "webm",
};
const defaults = { image: 5_000_000, video: 50_000_000 };

export function mediaConfig() {
  return {
    publicUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "",
    imageMaxBytes: Number(process.env.R2_MAX_IMAGE_BYTES ?? defaults.image),
    videoMaxBytes: Number(process.env.R2_MAX_VIDEO_BYTES ?? defaults.video),
  };
}

export function validateMediaInput(contentType: string, size: number) {
  const max = contentType.startsWith("video/") ? mediaConfig().videoMaxBytes : mediaConfig().imageMaxBytes;
  if (!MIME_EXTENSIONS[contentType]) return { ok: false as const, error: "Unsupported media type" };
  if (!Number.isInteger(size) || size < 0 || size > max) return { ok: false as const, error: "Media exceeds size limit" };
  return { ok: true as const };
}

export function buildMediaKey(domain: string, recordId: string, slug: string, contentType: string, random = () => crypto.randomUUID()) {
  const extension = MIME_EXTENSIONS[contentType];
  if (!extension) throw new Error("Unsupported media type");
  if (!/^[a-z0-9_-]+$/i.test(domain) || !/^[a-z0-9_-]+$/i.test(recordId)) throw new Error("Invalid media scope");
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "media";
  return `${domain}/${recordId}/${safeSlug}-${random()}.${extension}`;
}

function client() {
  const account = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET;
  if (!account || !accessKeyId || !secretAccessKey || !bucket) throw new Error("R2 is not configured");
  return { bucket, s3: new S3Client({ region: "auto", endpoint: `https://${account}.r2.cloudflarestorage.com`, credentials: { accessKeyId, secretAccessKey } }) };
}

export async function createPresignedUpload(input: { domain: string; recordId: string; slug: string; contentType: string; size: number }) {
  const valid = validateMediaInput(input.contentType, input.size);
  if (!valid.ok) throw new Error(valid.error);
  const { bucket, s3 } = client();
  const key = buildMediaKey(input.domain, input.recordId, input.slug, input.contentType);
  const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: input.contentType }), { expiresIn: 300 });
  return { key, url, publicUrl: `${mediaConfig().publicUrl.replace(/\/$/, "")}/${key}` };
}

export async function verifyUploadedObject(head: (key: string) => Promise<{ contentLength?: number; contentType?: string } | null>, key: string, size: number, contentType: string) {
  const object = await head(key);
  return object?.contentLength === size && object.contentType?.split(";")[0].trim().toLowerCase() === contentType.toLowerCase()
    ? { ok: true as const } : { ok: false as const, error: "Uploaded object does not match its manifest" };
}

export async function verifyR2Object(key: string, size: number, contentType: string) {
  const { bucket, s3 } = client();
  return verifyUploadedObject(async (exactKey) => {
    try {
      const result = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: exactKey }));
      return { contentLength: result.ContentLength, contentType: result.ContentType };
    } catch { return null; }
  }, key, size, contentType);
}

export async function deleteR2Object(key: string) {
  const { bucket, s3 } = client();
  await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
