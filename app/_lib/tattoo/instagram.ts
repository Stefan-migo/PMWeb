// Server-only module. Never import this file from a client component.

import { portfolioImages, type TattooImage } from "./designs";

type InstagramMedia = {
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
};

type InstagramFeed = {
  data?: InstagramMedia[];
};

export async function getPortfolioImages(): Promise<TattooImage[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

  if (!token) {
    return portfolioImages;
  }

  const version = process.env.INSTAGRAM_API_VERSION?.trim() || "v26.0";
  const userId = process.env.INSTAGRAM_USER_ID?.trim() || "me";
  const url = new URL(`/${version}/${userId}/media`, "https://graph.instagram.com");
  url.search = new URLSearchParams({
    fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    limit: "48",
    access_token: token,
  }).toString();

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      return portfolioImages;
    }

    const feed = (await response.json()) as InstagramFeed;
    const images = (feed.data ?? [])
      .map((media) => {
        const src =
          media.media_type === "VIDEO"
            ? media.thumbnail_url || media.media_url
            : media.media_url || media.thumbnail_url;
        const alt = media.caption?.split(/\r?\n/)[0]?.trim().slice(0, 120);

        return src?.trim()
          ? {
              src: src.trim(),
              alt: alt || "Tatuaje de PajaroMaca",
            }
          : null;
      })
      .filter((image): image is TattooImage => image !== null);

    return images.length > 0 ? images : portfolioImages;
  } catch {
    return portfolioImages;
  }
}
