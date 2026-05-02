import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Palette } from "lucide-react";
import { getArtworkBySlug, getArtworks } from "@/app/_lib/queries/artworks";
import { ImageLightbox } from "@/app/_components/shared/ImageLightbox";
import { Reveal } from "@/app/_components/shared/Reveal";

export async function generateStaticParams() {
  const artworks = await getArtworks();
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    return { title: "Obra no encontrada" };
  }

  return {
    title: artwork.title,
    description: artwork.description || `${artwork.title} — ${artwork.medium || "Arte visual"}`,
    openGraph: {
      title: `${artwork.title} | PajaroMaca`,
      description: artwork.description || `${artwork.title} — ${artwork.medium || "Arte visual"}`,
      images: [{ url: artwork.image_path }],
    },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    return (
      <div className="py-24 px-4 text-center">
        <h1 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold mb-4">
          Obra no encontrada
        </h1>
        <Link href="/arte/galeria" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
          Volver a la galer&iacute;a
        </Link>
      </div>
    );
  }

  const relatedArtworks = (await getArtworks()).filter(
    (a) => a.id !== artwork.id
  ).slice(0, 4);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <Link
            href="/arte/galeria"
            className="inline-flex items-center gap-2 text-[#78716c] hover:text-[#1c1917] transition-colors mb-8 focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver a la galer&iacute;a
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-[4/3] bg-white border border-[#e7e5e4] rounded-xl overflow-hidden">
              <ImageLightbox
                images={[
                  { src: artwork.image_path, alt: artwork.title },
                ]}
                variant="art"
              />
            </div>

            <div>
              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl font-semibold mb-4">
                {artwork.title}
              </h1>

              <div className="space-y-4 mb-8">
                {artwork.medium && (
                  <div className="flex items-center gap-3 text-[#78716c]">
                    <Palette className="w-4 h-4" aria-hidden="true" />
                    <span>{artwork.medium}</span>
                  </div>
                )}
                {artwork.year && (
                  <div className="flex items-center gap-3 text-[#78716c]">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>{artwork.year}</span>
                  </div>
                )}
              </div>

              {artwork.description && (
                <p className="text-[#78716c] leading-relaxed mb-8">
                  {artwork.description}
                </p>
              )}

              {artwork.is_for_sale && artwork.price_cents && (
                <div className="p-6 bg-white border border-[#e7e5e4] rounded-xl">
                  <p className="text-2xl font-medium">
                    ${(artwork.price_cents / 100).toLocaleString("es-CL")} CLP
                  </p>
                  <p className="text-[#78716c] text-sm mt-1">
                    Obra original disponible
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {relatedArtworks.length > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-16">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold mb-6">
                Obras Relacionadas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedArtworks.map((related) => (
                  <Link
                    key={related.id}
                    href={`/arte/galeria/${related.slug}`}
                    className="block focus-visible:outline-2 focus-visible:outline-[#1c1917] focus-visible:outline-offset-2"
                  >
                    <div className="aspect-square bg-white border border-[#e7e5e4] rounded-lg flex items-center justify-center text-[#e7e5e4] hover:shadow-lg transition-shadow">
                      <span>{related.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
