import { Scrolling } from "../../modules/scrolling.js";

/** @type {HTMLDivElement} */
const headerCatalog = document.querySelector(".header-catalog");

if (headerCatalog) {
  const inertElements = document.querySelectorAll("[data-wrapper] > *:not(#header-catalog)");
  const max1024 = matchMedia("(max-width: 1024px)");

  max1024.addEventListener("change", (event) => {
    const { matches } = event;

    if (!matches) document.dispatchEvent(new CustomEvent("close-header-catalog"));
  });

  document.addEventListener("keydown", (event) => {
    const { key } = event;

    if (key === "Escape") {
      document.dispatchEvent(new CustomEvent("close-header-catalog"));
    }
  });

  document.addEventListener("click", (event) => {
    /** @type {{ target: HTMLElement}} */
    const { target } = event;

    if (target.closest(".catalog-button")) {
      document.dispatchEvent(new CustomEvent("open-header-catalog"));

      return;
    }

    if (target.closest(".header-catalog__close")) {
      document.dispatchEvent(new CustomEvent("close-header-catalog"));

      return;
    }

    if (!target.closest(".header-catalog") && !target.closest(".catalog-button")) {
      document.dispatchEvent(new CustomEvent("close-header-catalog"));

      return;
    }
  });

  document.addEventListener("open-header-catalog", () => {
    headerCatalog.classList.add("header-catalog--active");
    Scrolling.lock();

    inertElements.forEach((element) => {
      element.inert = true;
    });

    document.addEventListener("close-header-catalog", () => {
      headerCatalog.classList.remove("header-catalog--active");
      Scrolling.unlock();

      inertElements.forEach((element) => {
        element.inert = false;
      });
    }, { once: true });
  });


}
