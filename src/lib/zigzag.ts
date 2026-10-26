// The site's zigzag wipe: one toothed edge that sweeps left to right. Shared by the page
// transition and the heading reveals so both always look the same.
export const teeth = 10;
export const depth = 8;
// The ink layer trails the blue one by this many seconds.
export const lag = 0.14;

function edgePoints(edge: number) {
  return Array.from(
    { length: teeth + 1 },
    (_, i) => `${edge + (i % 2) * depth}% ${(i * 100) / teeth}%`,
  );
}

// Covers everything left of the edge.
export const covering = (edge: number) =>
  `polygon(-1% 0%,${edgePoints(edge).join(",")},-1% 100%)`;

// Covers everything right of the edge.
export const uncovering = (edge: number) =>
  `polygon(101% 0%,${edgePoints(edge).join(",")},101% 100%)`;
