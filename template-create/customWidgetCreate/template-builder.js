(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        
            <style>
            #form {
                font-family: Arial, sans-serif;
                width: 400px;
                margin: 0 audimensionType;
            } 
            #table {
                width: 80%;
                border-collapse: collapse;
                margin-botdimensionTypem: 10px;
            } 
            #td {
                padding: 15px;
                text-align: left;
                font-size: 13px;
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
            input[type="submit"] {
                background-color: #487cac;
                color: white;
                padding: 10px;
                border: none;
                border-radius: 5px;
                font-size: 14px;
                cursor: pointer;
                width: 80%;
            }

            input[type="button"] {
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

            #tableFilter {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td,
            th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd; 
            }

            #tr:nth-child(even) {
                background-color: #FFFFFF;
            }

            select {
                width: 100%;
                min-width: 15ch;
                max-width: 300ch;
                border: 1px solid;
                border-radius: 0.25em;
                padding: 0.25em 0.5em;
                font-size: 0.9rem;
                cursor: pointer;
                line-height: 1.1;
                background-color: #fff;
                background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
                position: relative;
                border: 2px solid #ccc;
                border-radius: 5px;
                box-sizing: border-box;
                margin-botdimensionTypem: 10px;
            }
            </style>
            <form id="form">
            <table id="table">
                <tr id="tr" align="center">
                <td id="td" align="center">
                    <p>File Type</p>
                    <select id="fileType">
                    <option value="json">JSON</option>
                    <option value="main">Main js</option>
                    <option value="builder">Builder</option>
                    </select>
                </td>
                </tr>
            </table>
            <br>
            <br>
            <br>
            <input value="Update Settings" type="submit">
            <br>
            </form> 
    `;
    class templateBuilder extends HTMLElement {
        constructor() {
            super();

            this._shadowRoot = this.attachShadow({
                mode: "open",
            });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot
                .getElementById("form")
                .addEventListener("submit", this._submit.bind(this));

          
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(
                new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            fileType: this.fileType, 
                        },
                    },
                })
            );
        }
        fireChanged() {
            this.dispatchEvent(
                new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            fileType: this.fileType, 
                        },
                    },
                })
            );
        }

        get fileType () {
            var e = this._shadowRoot.getElementById("fileType");
            console.log(e.options[e.selectedIndex].value);
            return e.options[e.selectedIndex].value; 
        }
    }
    customElements.define("template-create-builder", templateBuilder);
})();