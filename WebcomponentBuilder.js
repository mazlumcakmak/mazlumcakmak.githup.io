
(function () {
    let template = document.createElement("template");
    template.innerHTML = '<br> <style> #form { font-family: Arial, sans-serif;width: 400px; margin: 0 audimensionType; } a { text-decoration: none; } #table { width: 100%; border-collapse: collapse; margin-botdimensionTypem: 10px;} #td { padding: 15px; text-align: left; font-size: 13px; } input { width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 5px; font-size: 13px; box-sizing: border-box; margin-botdimensionTypem: 10px;} #tdFilter { width: 80%; padding: 15px; text-align: left; font-size: 13px; } input[type="color"] { -webkit-appearance: none; border: none; width: 32px; height: 32; } input[type="color"]::-webkit-color-swatch-wrapper {padding: 0; } input[type="color"]::-webkit-color-swatch {border: none; } select { width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 5px; font-size: 13px; box-sizing: border-box; margin-botdimensionTypem: 10px;} input[type="submit"] { background-color: #487cac; color: white; padding: 10px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer; width: 100%; } input[type="button"] { background-color: #487cac; color: white; padding: 10px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer; width: 100%; } #label { width: 140px; } #tableFilter { font-family: arial, sans-serif;border-collapse: collapse; width: 100%; } td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; } tr:nth-child(even) { background-color: #dddddd; } #tr:nth-child(even) { background-color: #FFFFFF; } select { width: 100%; min-width: 15ch; max-width: 300ch; border: 1px solid; border-radius: 0.25em; padding: 0.25em 0.5em; font-size: 1.25rem; cursor: pointer; line-height: 1.1; background-color: #fff; background-image: linear-gradient(to top, #f9f9f9, #fff 33%);position: relative; } </style> <form id="form"> <table id="table"> <tr id="tr"> <td id="td"> <p>Dimension Type</p> <input id="builder_dimensionType" type="text" placeholder="Master Data / Transaction Data"></td> </tr> <tr id="tr"> <td id="td"> <p>Dimension Name</p> <input id="builder_dimension" type="text" placeholder="Dimension Name"></td> </tr> <tr id="tr"> <td id="td"> <p>URL</p> <input id="builder_url" type="text" placeholder="URL"></td> </tr> <tr id="tr"> <td id="td"> <p>Provider</p> <select id="builder_provider"><option>loading..</option> </select> </td> </tr> <tr id="tr"> <td id="td"> <p>Display Option</p> <select id="builder_displayOpt"><option>Description</option> <option>ID</option> <option>ID - Description</option><option>Description - ID</option></select> </td> </tr> </table> <table id="table"> <tr id="tr"> <td id="td"> <p>Filter Name</p> <input style="width: 70%;" id="filterName" class="filterName" type="text" placeholder="Filter Name"><input id="addBtn" style="width: 20%;" value="Add" type="button" onclick="myFunction()"></td> </tr> </table> <br> <br> <table id="tableFilter" class="tableFilter"><tr> <th>Filter Value</th> </tr> <tr> <td></td> </tr> </table> <br> <br> <br> <input value="Update Settings" type="submit"><br> </form>';
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
            if (url != "" && url != undefined) {
                var lvUrl = url + "/api/v1/dataexport/administration/Namespaces(NamespaceID='sac')/Providers";
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", lvUrl, true);
                xmlHttp.onload = (e) => {
                    if (xmlHttp.readyState === 4) {
                        if (xmlHttp.status === 200) {
                            var lt_parser = JSON.parse(xmlHttp.responseText);
                            var lt_values = lt_parser.value;

                            this.shadowRoot.getElementById("builder_provider").innerHTML = "";
                            var select = this.shadowRoot.getElementById("builder_provider");
                            for (var i = 0; i < lt_values.length; i++) {
                                var option = document.createElement("OPTION");
                                option.innerHTML = ProviderName;
                                option.value = lt_values[i].ProviderID;
                                select.options.add(option);
                            }
                        } else {
                            console.error(xmlHttp.statusText);
                        }
                    }
                };
                xmlHttp.onerror = (e) => {
                    console.error(xhr.statusText);
                };
                xmlHttp.send(null);
            }
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(
                new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            dimension: this.dimension,
                            dimensionType: this.dimensionType,
                            url: this.url,
                            prodiver: this.prodiver,
                            displayOpt: this.displayOpt
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
        set url(_url) {
            this._shadowRoot.getElementById("builder_url").value = _url;
        }
        get url() {
            return this._shadowRoot.getElementById("builder_url").value;
        }
        set prodiver(_prodiver) {
            this._shadowRoot.getElementById("builder_provider").value = _prodiver;
			
        }
        get prodiver() {
			var e = this._shadowRoot.getElementById("builder_provider");
			return e.options[e.selectedIndex].value;
            //return this._shadowRoot.getElementById("builder_provider").value;
        }
        get displayOpt() {
            var e = this._shadowRoot.getElementById("builder_displayOpt");
            
        }
    }
    customElements.define("custom-button-builder",
        DimensionWidgetBuilderPanel);
})();
