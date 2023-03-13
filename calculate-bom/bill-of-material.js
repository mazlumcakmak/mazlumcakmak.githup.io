(function () {
  let tmpl = document.createElement("template");
  tmpl.innerHTML = "";

  class classname extends HTMLElement {
    constructor() {
      super();
      this.init();
      this._props = {};
      this._select = {}; 
    }

    init() {
      let shadowRoot = this.attachShadow({
        mode: "open",
      });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));

      // click event
      this.addEventListener("click", (event) => {
        var event = new Event("onClick");
        this.fireChanged();
        this.dispatchEvent(event);
      });
    }

    // after update
    onCustomWidgetAfterUpdate(changedProperties) {
      this.getData();
    }
    // getter setter
    fireChanged() {
      this.dispatchEvent(
        new CustomEvent("propertiesChanged", {
          detail: {
            properties: {
              selectedKey: this.selectedKey,
              selectedValue: this.selectedValue,
            },
          },
        })
      );
    }
    // before update
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = {
        ...this._props,
        ...changedProperties,
      };
    }
  }

  customElements.define("widget-tag", classname);
})();
