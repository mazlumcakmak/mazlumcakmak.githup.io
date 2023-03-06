
(function () {
    let template = document.createElement("template");
    template.innerHTML = '<button type="button" id="myBtn">Helper Button</button>';
    class customComboboxBuilderPanel extends HTMLElement {
        constructor() {
            super();
            this.init();

        }
        init() {

            let shadowRoot = this.attachShadow({
                mode: "open"
            });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.fireChanged();
                this.dispatchEvent(event);
            });
        }
         async connectedCallback() {
      this.initMain();
    }
    async initMain() {
      const date = this._props.date;
      const caption = this._props.captionaftercountdown;
      const countdownEl = this.shadowRoot.querySelector("#countdown");
      const divEl = this.shadowRoot.querySelector("#time_div");
      const updateCountdown = () => {
        const timeRemaining = Date.parse(date) - Date.parse(new Date());
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeRemaining < 0) {
          countdownEl.innerHTML = caption;
        }
      };
        customElements.define("custom-button",
            customComboboxBuilderPanel);
    })();
