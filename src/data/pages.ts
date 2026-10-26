export const menuPages = [
  { href: "/objects", label: "The objects", index: "05" },
  { href: "/thinking", label: "The thinking" },
  { href: "/technology", label: "Technology" },
  { href: "/good-to-know", label: "Good to know" },
] as const;

export const languageData = {
  title: "Three details you can spot from across the room.",
  description:
    "Every Arlo concept is drawn from the same short list of decisions. Learn to read them once and the whole family makes sense.",
  items: [
    {
      index: "01",
      title: "Form",
      copy: "Angular housings with hard, deliberate edges. Nothing is rounded off to be polite.",
    },
    {
      index: "02",
      title: "Material",
      copy: "Matte graphite shells set against bare, brushed metal. Texture does the talking.",
    },
    {
      index: "03",
      title: "Signal",
      copy: "A single electric-blue accent per object. When it appears, it means something.",
    },
  ],
  links: [
    { href: "/thinking", label: "Read the thinking" },
    { href: "/technology", label: "See the technology" },
  ],
} as const;

export const objectsPage = {
  eyebrow: "The objects / A family of five",
  title: "Five forms. One language.",
  description:
    "From wrist to outer layer, each concept explores the same idea in a different place on the body. Browse all five, side by side.",
  note: "All devices are fictional display concepts. Not for sale.",
} as const;

export const thinkingPage = {
  eyebrow: "The thinking",
  title: "Sense. Alert. Respond.",
  description:
    "Three ideas sit behind every object in the collection. They describe a creative direction, not a working service.",
  chapters: [
    {
      word: "Sense.",
      title: "Start with awareness.",
      copy: [
        "Most devices ask you to look at them. These concepts imagine the opposite: information that belongs with you and only surfaces when it matters.",
        "In the collection, that shows up as restraint. Uncluttered faces, no decoration for its own sake, and plenty of dark space to let a single detail read clearly.",
      ],
    },
    {
      word: "Alert.",
      title: "Make the important clear.",
      copy: [
        "A signal only works if you can't mistake it. Across the five objects, one thin line of blue does that job: a ring edge, a lens readout, a side control.",
        "Keeping the accent rare is the whole trick. If everything glows, nothing does.",
      ],
    },
    {
      word: "Respond.",
      title: "Leave room for instinct.",
      copy: [
        "Good tools get out of the way. The shared design language means the wrist piece, the ring and the vest feel related before you've learned how any of them work.",
        "Familiarity is the feature: the same angles, the same materials and the same accent, repeated across very different shapes.",
      ],
    },
  ],
  principles: [
    { title: "Less noise", copy: "Cut everything that doesn't carry meaning." },
    { title: "One accent", copy: "Reserve colour for what needs attention." },
    { title: "Shared DNA", copy: "Five shapes, one recognisable family." },
    { title: "Honest scope", copy: "A design study, clearly labelled as one." },
  ],
  note: "Nothing here senses, alerts or responds to anything. It is a design exercise.",
} as const;

export const goodToKnowPage = {
  eyebrow: "Good to know",
  title: "Curiosity looks good on you.",
  description:
    "Plain answers about what this site is, what it isn't, and how to get the most out of looking around.",
  extra: [
    {
      question: "Is there a waitlist or early access list?",
      answer:
        "No. The early access button simply opens a short note about the demo. The email field in the footer is for display only: nothing you type is sent or saved, and there is no launch date.",
    },
    {
      question: "Who made Arlo?",
      answer:
        "Arlo was designed and built by Joshua \u201cSnowi\u201d Cambronero as an upskilling project. The devices are fictional concepts: no company is manufacturing them and no prototypes exist.",
    },
    {
      question: "Can I use the images?",
      answer:
        "The imagery is part of this demonstration and shouldn't be presented as real products. If you're unsure, treat it as view-only.",
    },
  ],
  notice: {
    title: "The short version",
    items: [
      "This is a personal upskilling project.",
      "Everything here is a fictional concept.",
      "Nothing is for sale, reserved or pre-ordered.",
      "Readouts and markings are illustrative only.",
      "No sensors, alerts or services actually exist.",
    ],
  },
} as const;
