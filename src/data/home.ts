export const homeData = {
  navigation: [
    { label: "Product", target: "product" },
    { label: "Technology", target: "technology" },
    { label: "Specs", target: "specs" },
  ],
  earlyAccessLabel: "Explore the demo",
  hero: {
    wordmark: "ARL",
    product: {
      image: "/imgs/PRODUCT  IN TEXT.png",
      width: 1254,
      height: 1254,
    },
    tagline: "Built for the work.",
    description:
      "Rugged wearable concepts imagined for long days in the field. For display only.",
    capabilities: ["Sense", "Alert", "Respond"],
  },
  panels: {
    technology: {
      title: "One system. Five devices.",
      description:
        "Sense. Alert. Respond. Three ideas behind a fictional wearable system. Each device explores how clear information and a shared visual language could come together.",
      note: "A design demonstration only. No working sensors, alerts, or connected services are provided.",
    },
    specs: {
      title: "Concept design notes",
      description:
        "Dark surfaces. Angular forms. A single electric-blue accent. Explore the collection for a closer look at each device’s shape, details, and place in the system.",
      note: "All devices are fictional display concepts. Image readouts and markings are illustrative, not verified specifications or certifications.",
    },
    earlyAccess: {
      title: "Take a closer look.",
      description:
        "Explore five fictional device concepts, view alternate images, and discover the details that tie the collection together. Everything here is for demonstration.",
      note: "There is no waitlist, launch, or sale. Browse at your own pace.",
    },
  },
  collection: {
    label: "01 / The collection",
    title: "Five forms. One language.",
    description:
      "From wrist to outer layer, a family of fictional devices imagined for field work and shaped by one idea: less noise, more clarity.",
  },
  questions: {
    label: "02 / Good to know",
    title: "FAQs",
    items: [
      {
        question: "What is this website?",
        answer:
          "Arlo is a fictional wearable concept showcase and a personal upskilling project by Joshua \u201cSnowi\u201d Cambronero. It was built to practise design, motion and front-end development, and it is not a real company or product.",
      },
      {
        question: "Can I buy these products?",
        answer:
          "No. This is a demo website. Every device is a fictional concept shown for display purposes only and is not for sale. There are no orders, reservations, or payments.",
      },
      {
        question: "What does Sense. Alert. Respond. mean?",
        answer:
          "It is the creative direction for this collection: noticing information, making it clear, and imagining a response. It describes a design idea rather than a working service.",
      },
      {
        question: "Are the readouts and specifications real?",
        answer:
          "No. Numbers, display readouts, and technical markings in the imagery are illustrative. They do not establish performance, safety ratings, certifications, or medical capabilities.",
      },
      {
        question: "How can I explore the collection?",
        answer:
          "Choose View details on any device to open its design notes and image gallery. Select a thumbnail to switch views, then use the close button or Escape to return to the collection.",
      },
    ],
  },
} as const;

export type HeroPanel = keyof typeof homeData.panels;
