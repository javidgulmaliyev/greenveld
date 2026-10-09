class FilterButton extends HTMLElement {
  /** @type {HTMLButtonElement} */
  button;
  /** @type {HTMLButtonElement} */
  close;
  /** @type {HTMLElement} */
  filter;
  /** @type {MediaQueryList} */
  media;
  /** @type {AbortController} */
  popoverAbortController;
  /** @type {AbortController} */
  abortController;

  constructor() {
    super();
  }

  connectedCallback() {
    this.button = this.querySelector("button");
    this.close = document.querySelector(".filter__close");
    this.filter = document.querySelector(".filter");
    this.media = matchMedia("(max-width: 1024px)");

    if (this.button && this.close && this.filter) this.init();
  }

  disconnectedCallback() {
    this.button = null;
    this.filter = null;
    this.media = null;
    this.popoverAbortController?.abort();
    this.abortController?.abort();
  }

  init() {
    if (this.media.matches) {
      this.activate();
    }

    this.media.addEventListener("change", (media) => {
      const { matches } = media;

      if (matches) {
        this.activate();
      } else {
        this.disable();
      }
    });
  }

  activate() {
    this.filter.popover = "auto"
    this.button.popoverTargetElement = this.filter;
    this.button.popoverTargetAction = "show";
    this.close.popoverTargetElement = this.filter;
    this.close.popoverTargetAction = "hide";
    this.popoverAbortController = new AbortController();

    this.filter.addEventListener("toggle", (event) => {
      const { newState } = event;

      if (newState === "open") {
        /** @type {NodeListOf<HTMLElement>} */
        const inertElements = document.querySelectorAll(".wrapper > *:not(#filter)");

        inertElements.forEach(inertElement => {
          inertElement.inert = true;
        });
      } else {
        /** @type {NodeListOf<HTMLElement>} */
        const inertElements = document.querySelectorAll("[inert]");

        inertElements.forEach(inertElement => {
          inertElement.inert = false;
        });
      }
    }, { signal: this.popoverAbortController.signal });
  }

  disable() {
    /** @type {NodeListOf<HTMLElement>} */
    const inertElements = document.querySelectorAll("[inert]");

    this.filter.popover = null;
    this.button.popoverTargetElement = null;
    this.button.popoverTargetAction = null;
    this.close.popoverTargetElement = null;
    this.close.popoverTargetAction = null;
    this.popoverAbortController?.abort();

    inertElements.forEach(inertElement => {
      inertElement.inert = false;
    });

  }
}

customElements.define("filter-button", FilterButton);
