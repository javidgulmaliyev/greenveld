import { Burger } from "../../modules/burger.js";

const burger = new Burger({
  breakpoint: 1024,
  a11y: {
    inertElementsSelectors: "[data-wrapper] > *:not([data-burger=\"menu\"])",
    moveMenu: true,
  }
});
