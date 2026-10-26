// The site's zigzag wipe, shared by the page transition and the heading reveals so both always
// look the same.
//
// The shape is a band with a toothed edge on both sides. It is drawn once (a static clip-path)
// and then only moved with a transform, which the GPU handles without repainting. Animating the
// clip-path itself, frame by frame, was what made the wipe stutter on phones.
//
//   - at rest the band covers the whole surface:        x = -depth
//   - the cover sweep brings it in from the left:        x = -bandWidth  ->  -depth
//   - the reveal sweep carries it on out to the right:   x = -depth      ->  width
//
// The ink layer trails the blue one by this many seconds.
export const lag = 0.1;

export type Band = {
  // Width of the band element: the surface plus a tooth's depth on each side.
  bandWidth: number;
  depth: number;
  clip: string;
  // Where the band's x sits before the cover, when covering, and after the reveal.
  start: number;
  rest: number;
  end: number;
};

export function makeBand(width: number, height: number, teeth: number, maxDepth: number): Band {
  // Depth follows the tooth height, so the angle stays the same whatever the screen size, but
  // never goes deeper than `maxDepth` (a small surface or a narrow phone).
  const depth = Math.min((height / teeth) * 1.1, maxDepth);
  const bandWidth = width + depth * 2;
  const y = (i: number) => `${(i * height) / teeth}px`;
  const left = Array.from({ length: teeth + 1 }, (_, i) => `${(i % 2) * depth}px ${y(i)}`);
  const right = Array.from({ length: teeth + 1 }, (_, k) => {
    const i = teeth - k;
    return `${width + depth + (i % 2) * depth}px ${y(i)}`;
  });
  return {
    bandWidth,
    depth,
    clip: `polygon(${[...left, ...right].join(",")})`,
    start: -bandWidth,
    rest: -depth,
    end: width,
  };
}
