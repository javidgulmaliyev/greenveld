class SortButton extends HTMLElement {
  /** @type {HTMLFormElement} */
  form;
  /** @type {AbortController} */
  abortController;

  constructor() {
    super();
  }

  connectedCallback() {
    this.form = document.querySelector(".sort-form");

    if (this.form) this.init();
  }

  disconnectedCallback() {
    this.form = null;
    this.abortController?.abort();
  }

  init() {
    this.abortController = new AbortController();

    document.addEventListener("click", (event) => {
      /** @type {{target: HTMLElement}} */
      const { target } = event;

      if (target.closest(".sort-button")) {
        this.toggle();

        return;
      }

      if (target.closest(".sort-form__close")) {
        this.close();

        return;
      }

      if (!target.closest(".catalog-sort")) {
        this.close();

        return;
      }
    }, { signal: this.abortController.signal });

    document.addEventListener("keydown", (event) => {
      const { key } = event;

      if (key === "Escape") {
        this.close();
      }
    }, { signal: this.abortController.signal });
  }

  toggle() {
    this.form.classList.toggle("sort-form--show");
  }

  open() {
    this.form.classList.add("sort-form--show");
  }

  close() {
    this.form.classList.remove("sort-form--show");
  }
}

customElements.define("sort-button", SortButton);
