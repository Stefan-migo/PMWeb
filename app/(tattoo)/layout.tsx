"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@/app/_components/shared/PageTransition";
import { TattooFooter } from "@/app/_components/tattoo/TattooFooter";
import "@/app/_components/tattoo/TattooShell.css";
import { TATTOO_LANDING_PATH, TattooHeader } from "@/app/_components/tattoo/TattooHeader";

export default function TattooLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname === TATTOO_LANDING_PATH;

  return (
    <div className="tattoo-section">
      {/* One header and one footer for the whole section: the landing renders
          its own full-bleed hero, and every page closes with the same red
          block. */}
      <TattooHeader />

      <main id="contenido">
        {isLanding ? children : <PageTransition variant="fadeScale">{children}</PageTransition>}
      </main>

      {isLanding ? null : <TattooFooter />}
    </div>
  );
}
