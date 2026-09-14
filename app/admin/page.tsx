import { deleteArtwork, logout, saveArtwork } from "@/app/admin/actions";
import { requireAdmin } from "@/app/_lib/supabase/auth";
import { getSupabaseAdmin } from "@/app/_lib/supabase/admin";
import type { Artwork } from "@/app/_lib/queries/artworks";

function ArtworkForm({ artwork }: { artwork?: Artwork }) {
  return (
    <form action={saveArtwork} className="grid gap-3 rounded border border-neutral-200 bg-white p-4">
      {artwork && <input type="hidden" name="id" value={artwork.id} />}
      <h2 className="text-lg font-medium">{artwork ? "Editar obra" : "Nueva obra"}</h2>
      <label className="grid gap-1 text-sm">Título<input name="title" required defaultValue={artwork?.title} className="rounded border p-2" /></label>
      <label className="grid gap-1 text-sm">Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={artwork?.slug} className="rounded border p-2" /></label>
      <label className="grid gap-1 text-sm">Imagen (URL o ruta)<input name="image_path" required defaultValue={artwork?.image_path} className="rounded border p-2" /></label>
      <label className="grid gap-1 text-sm">Miniatura (URL o ruta)<input name="thumbnail_path" defaultValue={artwork?.thumbnail_path ?? ""} className="rounded border p-2" /></label>
      <label className="grid gap-1 text-sm">Medio<input name="medium" defaultValue={artwork?.medium ?? ""} className="rounded border p-2" /></label>
      <label className="grid gap-1 text-sm">Descripción<textarea name="description" defaultValue={artwork?.description ?? ""} className="rounded border p-2" /></label>
      <div className="grid grid-cols-3 gap-3">
        <label className="grid gap-1 text-sm">Año<input name="year" type="number" min="0" defaultValue={artwork?.year ?? ""} className="rounded border p-2" /></label>
        <label className="grid gap-1 text-sm">Orden<input name="sort_order" type="number" min="0" required defaultValue={artwork?.sort_order ?? 0} className="rounded border p-2" /></label>
        <label className="grid gap-1 text-sm">Precio (centavos)<input name="price_cents" type="number" min="0" defaultValue={artwork?.price_cents ?? ""} className="rounded border p-2" /></label>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <label><input name="is_published" type="checkbox" defaultChecked={artwork?.is_published} /> Publicado</label>
        <label><input name="is_featured" type="checkbox" defaultChecked={artwork?.is_featured} /> Destacado</label>
        <label><input name="is_for_sale" type="checkbox" defaultChecked={artwork?.is_for_sale} /> En venta</label>
      </div>
      <button type="submit" className="rounded bg-black px-4 py-2 text-white">Guardar obra</button>
    </form>
  );
}

export default async function AdminPage() {
  const user = await requireAdmin();
  const { data: artworks, error } = await getSupabaseAdmin().from("artworks").select("*").order("sort_order");
  if (error) throw new Error("No se pudieron cargar las obras");
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 bg-[#fafaf9] px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Administración</h1>
          <p className="mt-2 text-sm text-neutral-600">Sesión iniciada como {user.email}</p>
        </div>
        <form action={logout}>
          <button type="submit" className="rounded border px-4 py-2">Cerrar sesión</button>
        </form>
      </div>
      <ArtworkForm />
      <section aria-labelledby="artworks-heading" className="grid gap-4">
        <h2 id="artworks-heading" className="text-2xl font-semibold">Obras ({artworks.length})</h2>
        {artworks.map((artwork) => (
          <div key={artwork.id} data-artwork-id={artwork.id} className="grid gap-3 rounded border border-neutral-200 p-4 md:grid-cols-[1fr_2fr]">
            <div><h3 className="font-medium">{artwork.title}</h3><p className="text-sm text-neutral-600">{artwork.is_published ? "Publicado" : "Borrador"} · orden {artwork.sort_order}</p></div>
            <div className="flex flex-wrap gap-2"><ArtworkForm artwork={artwork} /><form action={deleteArtwork}><input type="hidden" name="id" value={artwork.id} /><button type="submit" className="rounded border border-red-300 px-3 py-2 text-sm text-red-700">Eliminar</button></form></div>
          </div>
        ))}
      </section>
    </main>
  );
}
