// The first-load intro sets this flag when it has slid away. It stays set for the rest of the
// session, so reveals that wait for the intro run at once on later client-side navigations.
export const introDoneEvent = "arlo:intro-done";

export function isIntroDone() {
  return document.documentElement.dataset.introDone === "true";
}

export function markIntroDone() {
  document.documentElement.dataset.introDone = "true";
  window.dispatchEvent(new Event(introDoneEvent));
}
