import Image from "next/image";
import "./TattooMark.css";

type TattooMarkProps = {
  /** `light` is the white silhouette for dark surfaces; `dark` is the ink one. */
  tone?: "light" | "dark";
  className?: string;
};

const SOURCES = {
  light: "/design/logo/pajaro-maca-silhouette-white.png",
  dark: "/design/logo/pajaro-maca-silhouette-dark.png",
} as const;

/**
 * The decorative mark of the tattoo design, where the approved bundle used an
 * asterisk. It is a monochrome silhouette from the logo pack, so the section
 * repeats the brand instead of a typographic glyph.
 */
export function TattooMark({ tone = "light", className }: TattooMarkProps) {
  return (
    <Image
      src={SOURCES[tone]}
      alt=""
      aria-hidden="true"
      width={120}
      height={188}
      className={className ? `tattoo-mark ${className}` : "tattoo-mark"}
    />
  );
}

export default TattooMark;
