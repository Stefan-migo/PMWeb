export type StyleTagged = {
  style?: string | null;
};

/** Styles are free text from the CMS, so casing never splits the same style in two. */
function styleKey(style: string): string {
  return style.trim().toLocaleLowerCase("es");
}

/**
 * Styles that actually exist in the collection, so a filter can only offer
 * options that will return something. Derived from the data instead of a
 * hardcoded list: with no style metadata there is no filter, rather than a row
 * of buttons that do nothing.
 */
export function collectStyles<T extends StyleTagged>(items: T[]): string[] {
  const styles = new Map<string, string>();

  for (const item of items) {
    const style = item.style?.trim();
    if (style && !styles.has(styleKey(style))) {
      styles.set(styleKey(style), style);
    }
  }

  return [...styles.values()].sort((a, b) => a.localeCompare(b, "es"));
}

/** `null` means "all styles". Pieces without a style only show in that view. */
export function filterByStyle<T extends StyleTagged>(items: T[], style: string | null): T[] {
  if (!style) return items;

  const wanted = styleKey(style);
  return items.filter((item) => {
    const candidate = item.style?.trim();
    return candidate ? styleKey(candidate) === wanted : false;
  });
}
