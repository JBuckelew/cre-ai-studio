// Module-level not-found flag shared between Layout and page components.
// Layout resets this to false on every render (before children render),
// then reads it in a pathname-change effect to set robots.
// Pages that are NOT inside Layout (e.g. NotFound) still get correct robots
// because setNotFoundFlag(true) also writes the robots meta directly.

let _flag = false;

export function getNotFoundFlag() {
  return _flag;
}

export function setNotFoundFlag(value) {
  _flag = value;
  if (value && typeof document !== "undefined") {
    let el = document.head.querySelector('meta[name="robots"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "robots");
      document.head.appendChild(el);
    }
    el.setAttribute("content", "noindex, nofollow");
  }
}