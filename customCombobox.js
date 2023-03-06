(function() {
  let template = document.createElement("template");
  template.innerHTML = '
    <style>
      #time_div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        background-color: #333;
        padding: 10px;
        border-radius: 5px;
      }
    </style>
    <div id="time_div">
      <center><span id="countdown"></span></center>
    </div>
  ';
  class CountdownWidget extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
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
        countdownEl.innerHTML = '${days}d ${hours}h ${minutes}m ${seconds}s';

        if (timeRemaining < 0) {
          countdownEl.innerHTML = caption;
        }
      };

      updateCountdown();
      const countdownInterval = setInterval(updateCountdown, 1000);
    }
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }
    onCustomWidgetAfterUpdate(changedProperties) {
      this.initMain();
    }
  }
  customElements.define(
    "com-mazlum-sap-customCombobox",
    CountdownWidget
  );
})();