import Choices from "choices.js";

/** @type {NodeListOf<HTMLSelectElement>} */
const selects = document.querySelectorAll("select:not([data-default])");

selects.forEach(select => {
  const choices = new Choices(select, {
    allowHTML: false,
    searchEnabled: false,
    position: "bottom",
    shouldSort: false,
    itemSelectText: "",
  });
});
