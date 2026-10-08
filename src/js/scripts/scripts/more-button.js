class MoreButton extends HTMLElement {
  /** @type {HTMLFieldSetElement} */
  fieldset;
  /** @type {HTMLButtonElement} */
  button;
  /** @type {string} */
  showText;
  /** @type {string} */
  hideText;
  /** @type {HTMLSpanElement} */
  textElement;
  /** @type {AbortController} */
  abortController;

  constructor() {
    super();
  }

  connectedCallback() {
    this.fieldset = this.closest("fieldset");
    this.button = this.querySelector("button");
    this.showText = this.getAttribute("show-text") || "Показать ещё";
    this.hideText = this.getAttribute("hide-text") || "Скрыть";
    this.textElement = this.querySelector(".filter-more__label");

    if (this.fieldset && this.button && this.textElement) this.init();
  }

  disconnectedCallback() {
    this.fieldset = null;
    this.button = null;
    this.showText = null;
    this.hideText = null;
    this.textElement = null;
    this.abortController.abort();
  }

  init() {
    this.abortController = new AbortController();

    this.changeText();

    this.button.addEventListener("click", () => {
      this.fieldset.classList.toggle("filter-field--expanded");
      this.changeText();
    }, { signal: this.abortController.signal });
  }

  changeText() {
    this.textElement.textContent = this.fieldset.classList.contains("filter-field--expanded") ? this.hideText : this.showText;
  }
}

customElements.define("more-button", MoreButton);
