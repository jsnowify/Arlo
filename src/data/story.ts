import { site } from "@/config/site";

// Long-form homepage sections. All copy is a design exercise: nothing described here exists.
// Each section has one job: Shift = where and when, Details = look, Maker = who and why.

export const shiftData = {
  title: "One imagined day.",
  description:
    "A storyboard of a day in the field, told through where each object sits on the body and why it sits there.",
  moments: [
    {
      time: "06:00",
      title: "Layer up.",
      object: "Layer / 04",
      copy: "Before the first task, decide where everything lives. A vest is a map of the body: chest, hip, shoulder, each with a job.",
    },
    {
      time: "06:20",
      title: "Eyes up.",
      object: "Frame / 03",
      copy: "The head is the most crowded place to put anything. This one asks what the smallest useful thing in your line of sight could be.",
    },
    {
      time: "09:40",
      title: "Heads down.",
      object: "Wrist / 01",
      copy: "Mid-task there is only time for a glance. The wrist is where the eyes already go when the hands are busy.",
    },
    {
      time: "13:15",
      title: "Hands full.",
      object: "Ring / 02",
      copy: "Gloves, tools, no spare fingers. How much can an object say when you can't spare a hand to touch it?",
    },
    {
      time: "17:30",
      title: "Clip on.",
      object: "Clip / 05",
      copy: "End of the day, one more thing to move from jacket to bag. Can an object travel as easily as a set of keys?",
    },
  ],
} as const;

export const detailsData = {
  title: "Look a little closer.",
  items: [
    {
      src: "/imgs/PRODUCT-2.3.png",
      alt: "Demo ring seen from the inside, with a brushed metal interior and a blue line on the outer shell",
      object: "Ring / 02",
      title: "Inside the loop.",
    },
    {
      src: "/imgs/PRODUCT-3.3.png",
      alt: "Demo wraparound eyewear with an illustrative readout in the lens",
      object: "Frame / 03",
      title: "Low in the lens.",
    },
    {
      src: "/imgs/PRODUCT-1.3.png",
      alt: "Underside of the demo wrist device with a round sensor window and a blue crown",
      object: "Wrist / 01",
      title: "Underneath.",
    },
    {
      src: "/imgs/PRODUCT-4.3.png",
      alt: "Demo vest laid open, showing light panels, pockets and attached modules",
      object: "Layer / 04",
      title: "Opened up.",
    },
  ],
} as const;

export const makerData = {
  title: "A study in saying less.",
  copy: [
    "Arlo is an upskilling project by " + site.author.name + ", built to practise design, motion and front-end development. The question behind it was simple: could five very different objects feel related at a glance?",
    "Everything here, from the objects to the words around them, was drawn to answer that one question.",
  ],
  credit: [
    ["Concept and design", site.author.name],
    ["Objects", "AR–01 to AR–05"],
  ],
} as const;
