import { LandingTriSplit } from "@/app/_components/blocks/LandingTriSplit/LandingTriSplit";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <LandingTriSplit
          hrefTattoo="/tatuajes"
          hrefStage="/escenico"
          hrefArt="/arte"
        />
      </div>
    </main>
  );
}
