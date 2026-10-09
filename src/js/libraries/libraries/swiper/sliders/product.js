import Swiper from "swiper";
import { Keyboard, Pagination } from "swiper/modules";

class ProductSlider extends HTMLElement {
  /** @type {Swiper} */
  swiper;
  /** @type {HTMLDivElement} */
  slider;
  /** @type {HTMLDivElement} */
  pagination;

  constructor() {
    super();
  }

  connectedCallback() {
    this.slider = this.querySelector(".swiper");
    this.pagination = this.querySelector(".slider-pagination");

    if (this.slider) this.init();
  }

  disconnectedCallback() {
    this.swiper?.destroy(this.swiper);
    this.swiper = null;
    this.slider = null;
    this.pagination = null;
  }

  init() {
    this.swiper = new Swiper(this.slider, {
      modules: [Keyboard, Pagination],
      keyboard: {
        enabled: true,
        pageUpDown: false,
      },
      pagination: {
        clickable: true,
        el: this.pagination,
        enabled: true,
      },
      spaceBetween: 8,
      rewind: true,
    });
  }
}

customElements.define("product-slider", ProductSlider);
