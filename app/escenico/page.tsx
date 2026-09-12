import type { Metadata } from "next";
import Image from "next/image";
import { getScenicWorks } from "@/app/_lib/queries/scenic";

export const metadata: Metadata = {
  title: "Escénico",
  description: "Performance, dirección escénica y montajes de PajaroMaca.",
};

export default async function EscenicoPage() {
  const works = await getScenicWorks();

  return (
    <main className="min-h-screen bg-[#17120f] px-6 py-12 text-[#f7f0e8] sm:px-10 lg:px-16">
      <header className="mx-auto max-w-6xl border-b border-[#8f7764] pb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-[#e5a85b]">PajaroMaca</p>
        <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-5xl font-semibold sm:text-7xl">Escénico</h1>
        <p className="mt-4 max-w-2xl text-lg text-[#d8c9bd]">Performance, dirección escénica y montajes: arte vivo que se despliega en el espacio y el tiempo.</p>
      </header>
      <section aria-labelledby="works-heading" className="mx-auto max-w-6xl py-12">
        <h2 id="works-heading" className="sr-only">Obras escénicas</h2>
        {works.length ? <div className="grid gap-10 md:grid-cols-2">{works.map((work) => <article key={work.id} className="overflow-hidden border border-[#8f7764] bg-[#211a16]"><div className="relative aspect-video bg-black">{work.media_kind === "video" ? <video controls preload="metadata" poster={work.poster_url ?? undefined} className="h-full w-full" aria-label={work.title}><source src={work.media_url} /></video> : <Image src={work.media_url} alt={work.title} fill unoptimized className="object-cover" />}</div><div className="p-5"><h3 className="text-2xl font-medium">{work.title}</h3>{work.description && <p className="mt-2 text-[#d8c9bd]">{work.description}</p>}<p className="mt-4 text-sm text-[#e5a85b]">{[work.project_label, work.year].filter(Boolean).join(" · ")}</p></div></article>)}</div> : <p className="text-[#d8c9bd]">Pronto compartiré nuevas obras escénicas.</p>}
      </section>
    </main>
  );
}
