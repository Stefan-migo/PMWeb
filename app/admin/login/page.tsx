import { login } from "@/app/admin/actions";

type LoginPageProps = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6">
      <div>
        <h1 className="text-3xl font-semibold">Administración</h1>
        <p className="mt-2 text-sm text-neutral-600">Acceso privado para la artista.</p>
      </div>
      {error === "unauthorized" && (
        <p role="alert" className="text-sm text-red-700">No tienes autorización para acceder.</p>
      )}
      <form action={login} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm">
          Correo electrónico
          <input name="email" type="email" required autoComplete="email" className="rounded border p-3" />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Contraseña
          <input name="password" type="password" required autoComplete="current-password" className="rounded border p-3" />
        </label>
        <button type="submit" className="rounded bg-black px-4 py-3 text-white">Iniciar sesión</button>
      </form>
    </main>
  );
}
