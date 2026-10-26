import { site } from "@/config/site";

export type DemoProduct = {
  id: string;
  name: string;
  format: string;
  description: string;
  detail: string;
  designNotes: string[];
  images: { src: string; alt: string }[];
};

export const demoProducts: DemoProduct[] = [
  {
    id: "AR–01",
    name: "Wrist / 01",
    format: "Wrist-worn concept",
    description:
      "A bold face. A clear point of focus. The system, imagined at a glance.",
    detail:
      "The wrist concept brings the collection’s angular forms into a familiar silhouette. An uncluttered display, exposed fasteners, and a blue side control set its visual rhythm.",
    designNotes: [
      "Angular display housing",
      "Perforated strap",
      "Blue control accent",
    ],
    images: [
      {
        src: "/imgs/PRODUCT-1.png",
        alt: "Demo wrist device with a black strap and angular display",
      },
      {
        src: "/imgs/PRODUCT-1.1.png",
        alt: "Alternate view of the demo wrist device",
      },
      {
        src: "/imgs/PRODUCT-1.2.png",
        alt: "Detail view of the demo wrist device",
      },
    ],
  },
  {
    id: "AR–02",
    name: "Ring / 02",
    format: "Ring concept",
    description:
      "A smaller form with the same presence. Quiet detail, all the way around.",
    detail:
      "A faceted outer shell meets a smooth metallic interior. The ring concept distills the collection’s design language into a compact loop, marked by a single line of blue.",
    designNotes: [
      "Faceted outer profile",
      "Metallic inner surface",
      "Linear blue accent",
    ],
    images: [
      {
        src: "/imgs/PRODUCT-2.png",
        alt: "Demo black ring with a metallic interior and blue accent",
      },
      { src: "/imgs/PRODUCT-2.1.png", alt: "Alternate view of the demo ring" },
      { src: "/imgs/PRODUCT-2.2.png", alt: "Detail view of the demo ring" },
    ],
  },
  {
    id: "AR–03",
    name: "Frame / 03",
    format: "Eyewear concept",
    description:
      "A new point of view. Open lenses meet the collection’s distinct geometry.",
    detail:
      "The eyewear concept carries the same dark frame and blue detailing into a wraparound form. The lens readout explores how information could sit within a field of view.",
    designNotes: [
      "Wraparound lens shape",
      "Sculpted dark frame",
      "Illustrative lens readout",
    ],
    images: [
      {
        src: "/imgs/PRODUCT-3.png",
        alt: "Demo wraparound eyewear with an illustrative lens readout",
      },
      {
        src: "/imgs/PRODUCT-3.1.png",
        alt: "Alternate view of the demo eyewear",
      },
      { src: "/imgs/PRODUCT-3.2.png", alt: "Detail view of the demo eyewear" },
    ],
  },
  {
    id: "AR–04",
    name: "Layer / 04",
    format: "Vest concept",
    description:
      "The system takes shape. Contrast panels and considered placement, layer by layer.",
    detail:
      "A utility-inspired silhouette gives the collection a larger canvas. Light and dark panels, front pockets, and visible modules create a study in placement and proportion.",
    designNotes: [
      "Utility-inspired silhouette",
      "Contrasting front panels",
      "Visible module placement",
    ],
    images: [
      {
        src: "/imgs/PRODUCT-4.png",
        alt: "Demo black vest with light contrast panels and attached modules",
      },
      { src: "/imgs/PRODUCT-4.1.png", alt: "Alternate view of the demo vest" },
      { src: "/imgs/PRODUCT-4.2.png", alt: "Detail view of the demo vest" },
    ],
  },
  {
    id: "AR–05",
    name: "Clip / 05",
    format: "Clip-on concept",
    description:
      "A compact finishing touch. The same visual language in a form that sits alongside.",
    detail:
      "The clip concept brings the collection’s fasteners, geometric shell, and blue highlight into one small module. Its illustrated attachment explores another way to wear the system.",
    designNotes: [
      "Compact geometric shell",
      "Illustrated clip attachment",
      "Shared blue highlight",
    ],
    images: [
      {
        src: "/imgs/PRODUCT-5.png",
        alt: "Demo black clip-on module attached to a dark brim",
      },
      {
        src: "/imgs/PRODUCT-5.1.png",
        alt: "Alternate view of the demo clip-on module",
      },
      {
        src: "/imgs/PRODUCT-5.2.png",
        alt: "Detail view of the demo clip-on module",
      },
    ],
  },
];

// Copy for the Products section. Figures are illustrative display values, not specifications.
export type ProductShowcase = {
  tag: string;
  tagline: string;
  stats: [string, string, string];
  info: string;
  file: [label: string, value: string][];
  gallery: { src: string; alt: string }[];
};

// Every view of a device, from the front shot to the last detail.
function gallery(n: number, extra: number, label: string) {
  return Array.from({ length: extra + 1 }, (_, view) => ({
    src: view === 0 ? `/imgs/PRODUCT-${n}.png` : `/imgs/PRODUCT-${n}.${view}.png`,
    alt: view === 0 ? `Front view of the demo ${label}` : `View ${view + 1} of the demo ${label}`,
  }));
}

const designer = site.author.name;
const status = "Display concept / Not for sale";

export const productShowcase: Record<string, ProductShowcase> = {
  "AR–01": {
    tag: "BAND",
    tagline: "Every shift, measured.",
    stats: ["IP68", "5 DAYS", "BT 5.3"],
    info: "The wrist piece is where the whole collection begins. An angular display housing sits over a perforated strap, and a single blue side control marks the one place your thumb is meant to land. The face is deliberately sparse: a few lines of information set in mono, with plenty of dark space around them. Exposed fasteners and a brushed metal keeper carry the same hard-edged language down the strap, so the object reads as one machined piece rather than a screen on a band.",
    file: [
      ["Design", designer],
      ["Materials", "Matte graphite shell, perforated strap, brushed metal keeper"],
      ["Finish", "Matte black with a single blue accent"],
      ["Colourway", "Graphite / Silver / Signal blue"],
      ["Fit", "Adjustable strap, one size range"],
      ["Edition", "Concept 01 of 05"],
      ["Status", status],
    ],
    gallery: gallery(1, 4, "wrist device"),
  },
  "AR–02": {
    tag: "RING",
    tagline: "Small form. Same presence.",
    stats: ["IP68", "7 DAYS", "BT 5.3"],
    info: "The smallest object in the family, with the same presence. A faceted outer shell wraps a smooth, bare-metal interior, so the contrast you see on the wrist piece is compressed here into a single loop. One thin line of blue runs along an edge and is the only colour on the object. The small dimples on the inner surface are there for visual rhythm. Nothing on it is functional; it exists to show how far the design language can be reduced.",
    file: [
      ["Design", designer],
      ["Materials", "Faceted dark shell, polished metal interior"],
      ["Finish", "Matte exterior, mirror-finished interior"],
      ["Colourway", "Graphite / Silver / Signal blue"],
      ["Fit", "Illustrative size markings only"],
      ["Edition", "Concept 02 of 05"],
      ["Status", status],
    ],
    gallery: gallery(2, 6, "ring"),
  },
  "AR–03": {
    tag: "FRAME",
    tagline: "Eyes up. Information in view.",
    stats: ["IP67", "8 HRS", "BT 5.3"],
    info: "Eyewear is where the system gets personal. A wraparound lens and a sculpted dark frame keep the silhouette wide and calm, while a small illustrative readout sits low in the field of view to explore how information might be present without being in the way. Blue appears only on the temple control and the readout line. The aim is a pair of glasses that looks like the rest of the collection first, and like technology second.",
    file: [
      ["Design", designer],
      ["Materials", "Sculpted frame, tinted wraparound lens, vented temples"],
      ["Finish", "Matte frame, clear-to-smoke lens"],
      ["Colourway", "Graphite / Smoke / Signal blue"],
      ["Fit", "Wraparound, one frame size"],
      ["Edition", "Concept 03 of 05"],
      ["Status", status],
    ],
    gallery: gallery(3, 6, "eyewear"),
  },
  "AR–04": {
    tag: "LAYER",
    tagline: "Built into what you wear.",
    stats: ["IP65", "3 DAYS", "BT 5.3"],
    info: "The vest gives the collection a larger canvas, and the design leans into it. Light and dark panels break up the front, pockets and visible modules are placed with care, and every attachment point is shown rather than hidden. It is a study in placement and proportion: where an object sits on the body matters as much as what it looks like. The silhouette is utility-inspired, built for the work and not for show.",
    file: [
      ["Design", designer],
      ["Materials", "Dark outer panels, light contrast panels, exposed hardware"],
      ["Finish", "Matte fabric with metal fasteners"],
      ["Colourway", "Graphite / Chalk / Signal blue"],
      ["Fit", "Adjustable sides, layered over clothing"],
      ["Edition", "Concept 04 of 05"],
      ["Status", status],
    ],
    gallery: gallery(4, 5, "vest"),
  },
  "AR–05": {
    tag: "CLIP",
    tagline: "Clip on. Carry on.",
    stats: ["IP68", "10 DAYS", "BT 5.3"],
    info: "The clip is the smallest idea in the collection and the most flexible one. Fasteners, a geometric shell and the shared blue highlight come together in one compact module that attaches to a brim, a strap or a pocket edge. It is designed to sit alongside the other four objects, not replace them, and it shows the visual language working at the scale of a thumb. Simple to look at, easy to place, and recognisable from across the room.",
    file: [
      ["Design", designer],
      ["Materials", "Compact geometric shell, spring clip, metal fasteners"],
      ["Finish", "Matte black with a blue highlight"],
      ["Colourway", "Graphite / Silver / Signal blue"],
      ["Fit", "Clips to brims, straps and pocket edges"],
      ["Edition", "Concept 05 of 05"],
      ["Status", status],
    ],
    gallery: gallery(5, 6, "clip-on module"),
  },
};
