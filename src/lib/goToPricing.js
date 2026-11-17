/**
 * Sends a visitor to the pricing section on the home page.
 * On the home page it scrolls there smoothly; anywhere else it loads "/#pricing".
 */
export function goToPricing(e) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  const path = window.location.pathname.replace(/\/+$/, "");
  const isHome = path === "" || path === "/Home";

  if (isHome) {
    const el = document.getElementById("pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }

  window.location.href = "/#pricing";
}