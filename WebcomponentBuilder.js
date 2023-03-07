
(function () {
    let template = document.createElement("template");
    template.innerHTML = '<br> <style> #form { font-family: Arial, sans-serif;width: 400px; margin: 0 audimensionType; } a { text-decoration: none; } #table { width: 100%; border-collapse: collapse; margin-botdimensionTypem: 10px;} #td { padding: 15px; text-align: left; font-size: 13px; } input { width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 5px; font-size: 13px; box-sizing: border-box; margin-botdimensionTypem: 10px;} #tdFilter { width: 80%; padding: 15px; text-align: left; font-size: 13px; } input[type="color"] { -webkit-appearance: none; border: none; width: 32px; height: 32px; } input[type="color"]::-webkit-color-swatch-wrapper {padding: 0; } input[type="color"]::-webkit-color-swatch {border: none; } select { width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 5px; font-size: 13px; box-sizing: border-box; margin-botdimensionTypem: 10px;} input[type="submit"] { background-color: #487cac; color: white; padding: 10px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer; width: 100%; } input[type="button"] { background-color: #487cac; color: white; padding: 10px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer; width: 100%; } #label { width: 140px; } #tableFilter { font-family: arial, sans-serif;border-collapse: collapse; width: 100%; } td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; } tr:nth-child(even) { background-color: #dddddd; } #tr:nth-child(even) { background-color: #FFFFFF; } </style> <form id="form"> <table id="table"> <tr id="tr"> <td id="td"> <p>Dimension Type</p> <input id="builder_dimensionType" type="text" placeholder="Master Data / Transaction Data"></td> </tr> <tr id="tr"> <td id="td"> <p>Dimension Name</p> <input id="builder_dimension" type="text" placeholder="Dimension Name"></td> </tr> </table> <table id="table"> <tr id="tr"> <td id="td"> <p>Filter Name</p> <input style="width: 70%;" id="filterName" class = "filterName" type="text" placeholder="Filter Name"><input  id = "addBtn"  style="width: 20%;" value="Add" type="button" onclick="myFunction()"></td> </tr> </table> <br> <br> <table id = "tableFilter" class = "tableFilter"> <tr> <th>Filter Value</th> </tr> <tr> <td></td> </tr> </table> <br> <br> <br> <input value="Update Settings" type="submit"><br> </form> ';
    class DimensionWidgetBuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({
                mode: "open"
            });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot
            .getElementById("form")
            .addEventListener("submit", this._submit.bind(this));
            const element = this._shadowRoot.getElementById("addBtn");
            element.addEventListener("click", function (e) {
                debugger;
                var table = template.getElementsByClassName("tableFilter");
				var lvFilterClass = template.getElementsByClassName("filterName");
				
                if (lvFilterClass[0].value == "" || lvFilterClass[0].value == undefined) {
                    return;
                }
                var row = table[0].insertRow(table[0].length);
                var cell1 = row.insertCell(0);
                cell1.innerHTML = lvFilterClass[0].value;
            });
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(
                new CustomEvent("propertiesChanged", {
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
    customElements.define("custom-button-builder",
        DimensionWidgetBuilderPanel);
})();
