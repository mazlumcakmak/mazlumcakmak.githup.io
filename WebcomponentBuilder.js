
(function () {
    let template = document.createElement("template");
    template.innerHTML = '';
    class DimensionWidgetBuilderPanel extends HTMLElement {
        constructor() {
            super();
			debugger;
            this._shadowRoot = this.attachShadow({
                mode: "open"
            });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot
            .getElementById("form")
            .addEventListener("submit", this._submit.bind(this));
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(
                new CusdimensionTypemEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            dimension: this.dimension,
                            dimensionType: this.dimensionType
                        },
                    },
                }));
        }

        set dimension(_dimension) {
            this._shadowRoot.getElementById("builder_dimension").value = _dimension;
        }
        get dimension() {
            return this._shadowRoot.getElementById("builder_dimension").value;
        }

        set dimensionType(_dimensionType) {
            this._shadowRoot.getElementById("builder_dimensionType").value = _dimensionType;
        }
        get dimensionType() {
            return this._shadowRoot.getElementById("builder_dimensionType").value;
        }

    }
    cusdimensionTypemElements.define("custom-button-builder",
        DimensionWidgetBuilderPanel);
})();
