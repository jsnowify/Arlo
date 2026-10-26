// Fictional technology behind the five concepts. Nothing here exists or has been tested.
// Each system is grouped under one of the three ideas from the homepage: Sense, Alert, Respond.

export type Stage = "Sense" | "Alert" | "Respond";

export type Technology = {
  id: string;
  stage: Stage;
  name: string;
  summary: string;
  how: string;
  notes: string[];
  // Product ids from data/products.ts.
  usedIn: string[];
  // An illustrative figure only, never a specification.
  figure: [label: string, value: string];
};

// Anchor id of a system's detail row, e.g. "T–01" becomes "t-01".
export const systemAnchor = (id: string) => id.toLowerCase().replace("–", "-");

export const technologyPage = {
  eyebrow: "Technology",
  title: "What's inside the idea.",
  description:
    "Six imagined systems that the five concepts share. They are a way to test whether the design language holds up around the things a wearable would have to do.",
  matrixTitle: "Where each one shows up.",
  listTitle: "The six systems.",
  note: "Everything on this page is fictional. No sensors, radios or batteries exist, and the figures are illustrative, not specifications.",
} as const;

export const technologies: Technology[] = [
  {
    id: "T–01",
    stage: "Sense",
    name: "Contact sensing",
    summary: "Reading from the skin, through the underside of the object.",
    how: "A small cluster of windows and contacts sits on the side that touches the body: a round sensor window under the wrist piece, three domes and two contacts inside the ring. The idea is to keep every reading point on the inside, so the outside stays as quiet as the rest of the collection.",
    notes: [
      "Sensor window under the wrist piece",
      "Contacts set into the ring's metal interior",
      "Nothing on the visible face",
    ],
    usedIn: ["AR–01", "AR–02"],
    figure: ["Sensor points", "4 to 5"],
  },
  {
    id: "T–02",
    stage: "Sense",
    name: "Environmental sensing",
    summary: "Noticing the surroundings, not just the wearer.",
    how: "The eyewear and the vest imagine awareness of what is around you: temperature, air and the state of the object itself. It is the least literal of the six, and the reason the readout in the lens shows a few short lines instead of a screen.",
    notes: [
      "Camera and sensor housing on the frame",
      "A module on the vest's chest panel",
      "Short readouts, never a dashboard",
    ],
    usedIn: ["AR–03", "AR–04"],
    figure: ["Readout lines", "3"],
  },
  {
    id: "T–03",
    stage: "Alert",
    name: "Signal light",
    summary: "One thin line of blue, and what it could say.",
    how: "Every object carries a single point of light: an edge on the ring, a strip on the vest module, a dot in the lens, a highlight on the clip. A tiny vocabulary of steady, pulsing and off is enough. Keeping it rare is what makes it readable from across a room.",
    notes: [
      "One light per object",
      "Three states: off, steady, pulse",
      "Always the same blue",
    ],
    usedIn: ["AR–01", "AR–02", "AR–03", "AR–04", "AR–05"],
    figure: ["Light states", "3"],
  },
  {
    id: "T–04",
    stage: "Alert",
    name: "Lens readout",
    summary: "Information placed low in the field of view.",
    how: "A transparent readout sits in the lower part of the lens, where it can be read with a small drop of the eyes and ignored with a small lift. It explores how information could be present without being in the way, using the same mono type as the rest of the site.",
    notes: [
      "Placed low in the lens",
      "Mono type, three short lines",
      "Illustrative values only",
    ],
    usedIn: ["AR–03"],
    figure: ["Field of view used", "Lower third"],
  },
  {
    id: "T–05",
    stage: "Respond",
    name: "Short-range link",
    summary: "How the five objects would talk to each other.",
    how: "A short-range wireless link joins the objects into one system, so the wrist piece, the ring and the vest could agree on what is happening. It is the quietest idea in the collection: nothing on any object shows it, and the only sign it exists is that they behave as a family.",
    notes: [
      "One link shared by all five",
      "No pairing screen or app",
      "Objects work alone or together",
    ],
    usedIn: ["AR–01", "AR–02", "AR–03", "AR–04", "AR–05"],
    figure: ["Link", "BT 5.3"],
  },
  {
    id: "T–06",
    stage: "Respond",
    name: "Power and sealing",
    summary: "The practical layer that lets the rest keep working.",
    how: "Charging contacts on the underside of the wrist piece and ring, a battery pocket in the vest, and sealed shells all round. Field work means water, dust and long days, so the concept treats power and ingress protection as part of the shape instead of something added later.",
    notes: [
      "Charging contacts on the wrist piece and ring",
      "A battery pocket in the vest lining",
      "Sealed shells, rated by object",
    ],
    usedIn: ["AR–01", "AR–02", "AR–03", "AR–04", "AR–05"],
    figure: ["Sealing, illustrative", "IP65 to IP68"],
  },
];
