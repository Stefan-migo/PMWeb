import Image from "next/image";
import type { TattooImage } from "@/app/_lib/tattoo/designs";

export function PortfolioGallery({
  items,
  allItems,
  onOpen,
}: {
  items: TattooImage[];
  allItems: TattooImage[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="tp-grid">
      {items.map((item, index) => (
        <button
          key={`${item.src}-${item.title ?? item.alt}`}
          type="button"
          className="tp-piece"
          aria-label={`Ampliar ${item.title ?? item.alt}`}
          onClick={() => onOpen(index)}
        >
          <span className="tp-piece-image">
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 47vw, (max-width: 1000px) 30vw, 390px" />
            <span className="tp-piece-open" aria-hidden="true">↗</span>
            <span className="tp-piece-number" aria-hidden="true">{String(allItems.indexOf(item) + 1).padStart(2, "0")}</span>
          </span>
          <span className="tp-piece-caption">
            <span className="tp-piece-title">{item.title ?? item.alt}</span>
            {item.tags?.length ? <span className="tp-piece-tags">{item.tags.join(" · ")}</span> : null}
          </span>
        </button>
      ))}
    </div>
  );
}
