import Swiper from "swiper";
import { FreeMode, Keyboard, Navigation, } from "swiper/modules";

/** @type {HTMLDivElement} */
const clientsSliderBlock = document.querySelector(".clients-slider");

if (clientsSliderBlock) {
  const slider = clientsSliderBlock.querySelector(".swiper");
  const prev = clientsSliderBlock.querySelector(".slider-arrows__button--prev");
  const next = clientsSliderBlock.querySelector(".slider-arrows__button--next");

  const swiper = new Swiper(slider, {
    modules: [FreeMode, Keyboard, Navigation,],
    freeMode: {
      enabled: true,
    },
    keyboard: {
      enabled: true,
      pageUpDown: false,
    },
    navigation: {
      enabled: true,
      nextEl: next,
      prevEl: prev,
    },
    breakpoints: {
      "1024.1": {
        freeMode: {
          enabled: false,
        },
        slidesPerView: 6,
      },
    },
    slidesPerView: "auto",
    spaceBetween: 8,
    rewind: true,
  });
}
