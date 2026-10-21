class DialogElement extends HTMLElement {
  /** @type {HTMLDialogElement} */
  dialog;
  /** @type {AbortController} */
  abortController;

  constructor() {
    super();
  }

  connectedCallback() {
    this.dialog = this.querySelector("dialog");

    if (this.dialog) this.init();
  }

  disconnectedCallback() {
    this.dialog = null;
    this.abortController?.abort();
  }

  init() {
    this.abortController = new AbortController();

    this.dialog.addEventListener("toggle", event => {
      const { newState } = event;

      if (newState === "open") {
        /** @type {NodeListOf<HTMLElement>} */
        const inertElements = document.querySelectorAll("body > *");

        inertElements.forEach(element => {
          element.inert = element !== this;
        });
      } else {
        /** @type {NodeListOf<HTMLElement>} */
        const inertElements = document.querySelectorAll("[inert]");

        inertElements.forEach(element => {
          element.inert = false;
        });
      }
    }, { signal: this.abortController.signal });

    this.dialog.addEventListener("click", event => {
      /** @type {{target: HTMLElement}} */
      const { target } = event;

      if (target.closest("[popovertargetaction=\"show\"]")) {
        this.dialog.hidePopover();

        return;
      }

      if (!target.closest(".dialog__inner")) {
        this.dialog.hidePopover();

        return;
      }
    }, { signal: this.abortController.signal });
  }
}

customElements.define("dialog-element", DialogElement);
