import { LandingTriSplitDistinct } from "@/app/_components/blocks/LandingTriSplitDistinct/LandingTriSplitDistinct";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <LandingTriSplitDistinct
          hrefTattoo="/tatuajes"
          hrefStage="/escenico"
          hrefArt="/arte"
        />
      </div>
    </main>
  );
}
