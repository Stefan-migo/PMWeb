import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

let currentPath = "/tatuajes";

vi.mock("next/navigation", () => ({
  usePathname: () => currentPath,
}));

import TattooLayout from "../app/(tattoo)/layout";

describe("TattooLayout", () => {
  beforeEach(() => {
    currentPath = "/tatuajes";
  });

  it("renders the landing with a single header and no duplicated layout footer", () => {
    render(
      <TattooLayout>
        <p>landing content</p>
      </TattooLayout>,
    );

    expect(screen.getByText("landing content")).toBeInTheDocument();
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  });

  it("renders a section page with the same single header plus the layout footer", () => {
    currentPath = "/tatuajes/cotizar";
    render(
      <TattooLayout>
        <p>section content</p>
      </TattooLayout>,
    );

    expect(screen.getByText("section content")).toBeInTheDocument();
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
