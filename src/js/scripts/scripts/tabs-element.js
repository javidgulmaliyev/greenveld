class TabsElement extends HTMLElement {
  /** @type {NodeListOf<HTMLButtonElement>} */
  buttons;
  /** @type {NodeListOf<HTMLDivElement>} */
  regions;
  /** @type {AbortController} */
  abortController;

  constructor() {
    super();
  }

  connectedCallback() {
    this.buttons = this.querySelectorAll("[data-tab]");
    this.regions = this.querySelectorAll("[data-region]");

    this.init();
  }

  disconnectedCallback() {
    this.buttons = null;
    this.regions = null;
    this.abortController?.abort();
  }

  init() {
    this.abortController = new AbortController();

    this.buttons.forEach(button => {
      const { dataset } = button;
      const { tab } = dataset;

      button.addEventListener("click", event => {
        this.buttons.forEach(button => {
          const { dataset } = button;
          const { tab: currentTab } = dataset;

          button.toggleAttribute("data-active", tab === currentTab);
        });


        this.regions.forEach(region => {
          const { dataset } = region;
          const { region: currentRegion } = dataset;

          region.toggleAttribute("data-active", currentRegion === tab);
        });
      }, { signal: this.abortController.signal });
    });
  }
}

customElements.define("tabs-element", TabsElement);
