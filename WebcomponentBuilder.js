
(function () {
    let template = document.createElement("template");
    template.innerHTML = '
        <br>
        <style>
        #form {
        font-family: Arial, sans-serif;
        width: 400px;
        margin: 0 audimensionType;
        }

        a {
        text-decoration: none;
        }

        table {
        width: 100%;
        border-collapse: collapse;
        margin-botdimensionTypem: 10px;
        }

        td {
        padding: 1px;
        text-align: left;
        font-size: 13px; 
        }

        input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-botdimensionTypem: 10px;
        }


        input[type="color"] {
        -webkit-appearance: none;
        border: none;
        width: 32px;
        height: 32px;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
        }
        input[type="color"]::-webkit-color-swatch {
        border: none;
        }


        select {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-botdimensionTypem: 10px;
        }

        input[type="submit"] {
        background-color: #487cac;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        width: 100%;
        }

        #label {
        width: 140px;
        }
        </style>
        <form id="form">
        <table>
        <tr>
        <td>
        <p>Source Currency Code</p>
        <input id="builder_dimensionType" type="text" placeholder="Master Data / Transaction Data">
        </td>
        </tr>
        <tr>
        <td>
        <p>Target Currency Code</p>
        <input id="builder_dimension" type="text" placeholder="Dimension Name">
        </td>
        </tr>
        </table>
        <input value="Update Settings" type="submit">
        <br>
        </form>
        ';
    class DimensionWidgetBuilderPanel extends HTMLElement {
        construcdimensionTyper() {
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
