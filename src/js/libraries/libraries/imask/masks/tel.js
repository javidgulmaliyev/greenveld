import imask from "imask";

/** @type {NodeListOf<HTMLInputElement>} */
const telInputs = document.querySelectorAll("input[type=\"tel\"]");

telInputs.forEach(input => {
  const telMask = imask(input, {
    mask: "+{7} (000) 000-00-00",
    lazy: false,
  });
});
