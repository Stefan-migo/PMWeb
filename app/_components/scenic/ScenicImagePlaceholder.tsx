const aspectClasses = {
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
} as const;

type ScenicImagePlaceholderProps = {
  /** What the photograph should be, described as the source inventory describes it. */
  label: string;
  aspect?: keyof typeof aspectClasses;
  className?: string;
};

/**
 * Explicit slot for a photograph that the artist has not provided yet.
 * It states what is missing instead of borrowing an unrelated image.
 */
export function ScenicImagePlaceholder({
  label,
  aspect = "video",
  className = "",
}: ScenicImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Imagen pendiente: ${label}`}
      className={`flex items-center justify-center border border-dashed border-scenic-border/60 bg-scenic-surface p-6 text-center ${aspectClasses[aspect]} ${className}`}
    >
      <p className="max-w-xs text-[0.65rem] uppercase tracking-[0.25em] text-scenic-text-muted">
        Imagen pendiente
        <span className="mt-2 block text-xs normal-case tracking-normal">
          {label}
        </span>
      </p>
    </div>
  );
}
