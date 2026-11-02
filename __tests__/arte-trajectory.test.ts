import { describe, expect, it } from "vitest";
import {
  awards,
  currentShows,
  education,
  pastShows,
  trajectoryShows,
} from "../app/_lib/arte/trajectory";

describe("arte trajectory", () => {
  it("features the show that is currently on view", () => {
    expect(currentShows).toHaveLength(1);
    expect(currentShows[0].current).toBe(true);
    expect(currentShows[0].date).toBeTruthy();
    expect(currentShows[0].venue).toBeTruthy();
  });

  it("keeps the past shows from newest to oldest", () => {
    const years = pastShows.map((show) => Number(show.year));

    expect(pastShows).toHaveLength(5);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    expect(new Set(pastShows.map((show) => show.title)).size).toBe(pastShows.length);
  });

  it("puts the current show first in the whole trajectory", () => {
    expect(trajectoryShows[0]).toBe(currentShows[0]);
    expect(trajectoryShows).toHaveLength(currentShows.length + pastShows.length);
  });

  it("keeps the education and award entries the old page carried", () => {
    expect(education).toEqual([
      { title: "Licenciatura en Artes Visuales", meta: "2015 - 2019 · Universidad de Chile" },
    ]);
    expect(awards).toEqual([
      { title: "Premio Artes Visuales", meta: "2024 · Institución" },
    ]);
  });
});
