import { logout } from "@/app/admin/actions";
import { requireAdmin } from "@/app/_lib/supabase/auth";

export default async function AdminPage() {
  const user = await requireAdmin();
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Administración</h1>
          <p className="mt-2 text-sm text-neutral-600">Sesión iniciada como {user.email}</p>
        </div>
        <form action={logout}>
          <button type="submit" className="rounded border px-4 py-2">Cerrar sesión</button>
        </form>
      </div>
    </main>
  );
}
