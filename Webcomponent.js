(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '<br> <style> #form { font-family: Arial, sans-serif;width: 400px; margin: 0 audimensionType; } a { text-decoration: none; } #table { width: 100%; border-collapse: collapse; margin-botdimensionTypem: 10px;} #td { padding: 15px; text-align: left; font-size: 13px; } input { width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 5px; font-size: 13px; box-sizing: border-box; margin-botdimensionTypem: 10px;} #tdFilter { width: 80%; padding: 15px; text-align: left; font-size: 13px; } input[type="color"] { -webkit-appearance: none; border: none; width: 32px; height: 32; } input[type="color"]::-webkit-color-swatch-wrapper {padding: 0; } input[type="color"]::-webkit-color-swatch {border: none; } select { width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 5px; font-size: 13px; box-sizing: border-box; margin-botdimensionTypem: 10px;} input[type="submit"] { background-color: #487cac; color: white; padding: 10px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer; width: 100%; } input[type="button"] { background-color: #487cac; color: white; padding: 10px; border: none; border-radius: 5px; font-size: 14px; cursor: pointer; width: 100%; } #label { width: 140px; } #tableFilter { font-family: arial, sans-serif;border-collapse: collapse; width: 100%; } td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; } tr:nth-child(even) { background-color: #dddddd; } #tr:nth-child(even) { background-color: #FFFFFF; } select { width: 100%; min-width: 15ch; max-width: 300ch; border: 1px solid; border-radius: 0.25em; padding: 0.25em 0.5em; font-size: 1.25rem; cursor: pointer; line-height: 1.1; background-color: #fff; background-image: linear-gradient(to top, #f9f9f9, #fff 33%);position: relative; } </style> <form id="form"> <table id="table"> <tr id="tr"> <td id="td"> <p>Dimension Type</p> <input id="builder_dimensionType" type="text" placeholder="Master Data / Transaction Data"></td> </tr> <tr id="tr"> <td id="td"> <p>Dimension Name</p> <input id="builder_dimension" type="text" placeholder="Dimension Name"></td> </tr> <tr id="tr"> <td id="td"> <p>URL</p> <input id="builder_url" type="text" placeholder="URL"></td> </tr> <tr id="tr"> <td id="td"> <p>Provider</p> <input id="builder_provider" type="text" placeholder="Provider"></td> </tr> <tr id="tr"> <td id="td"> <p>Display Option</p> <select id = "builder_displayOpt"><option>Description</option> <option>ID</option> <option>ID - Description</option><option>Description - ID</option></select> </td> </tr> </table> <table id="table"> <tr id="tr"> <td id="td"> <p>Filter Name</p> <input style="width: 70%;" id="filterName" class="filterName" type="text" placeholder="Filter Name"><input id="addBtn" style="width: 20%;" value="Add" type="button" onclick="myFunction()"></td> </tr> </table> <br> <br> <table id="tableFilter" class="tableFilter"><tr> <th>Filter Value</th> </tr> <tr> <td></td> </tr> </table> <br> <br> <br> <input value="Update Settings" type="submit"><br> </form>';

    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();
            this._props = {};
            this.getData();

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
        getData() {
            const dimension = this._props.dimension;
            const dimensionType = this._props.dimensionType;
            const url = this._props.url;
            const prodiver = this._props.prodiver;
            const displayOpt = this._props.displayOpt;
            if (dimension != "" && dimension != undefined && url != "" && url != undefined && prodiver != "" && prodiver != undefined) {
                var xmlHttp = new XMLHttpRequest();
                var lvUrl = url + "/api/v1/dataexport/providers/sac/" + prodiver + "/" + dimension + "Master";
                //"https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C9Z996O1NC1N4P3AWYHVPEXP8G/" + dimension + "Master";
                //https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C9Z996O1NC1N4P3AWYHVPEXP8G/FactData?$filter=contains(Version,%27public.Plan%27)
                xmlHttp.open("GET", lvUrl, true); // false for synchronous request
                xmlHttp.onload = (e) => {
                    if (xmlHttp.readyState === 4) {
                        if (xmlHttp.status === 200) {
                            var lt_parser = JSON.parse(xmlHttp.responseText);
                            var lt_values = lt_parser.value;

                            this.shadowRoot.getElementById("dimDropDownSel").innerHTML = "";
                            var select = this.shadowRoot.getElementById("dimDropDownSel");
                            for (var i = 0; i < lt_values.length; i++) {
                                var option = document.createElement("OPTION");
                                if (dimension == "Date") {
                                    option.innerHTML = lt_values[i].YEAR + " - " + lt_values[i].MONTHDESC;
                                    option.value = lt_values[i].CALMONTH;
                                } else {
                                    switch (displayOpt) {
                                    case "Description":
                                        option.value = lt_values[i].ID;
                                        option.innerHTML = lt_values[i].Description;
                                        break;
                                    case "ID":
                                        option.value = lt_values[i].ID;
                                        option.innerHTML = lt_values[i].ID;
                                    case "ID - Description":
                                        option.value = lt_values[i].ID;
                                        option.innerHTML = lt_values[i].ID + " - " + lt_values[i].Description;
                                        break;
                                    case "Description - ID":
                                        option.value = lt_values[i].ID;
                                        option.innerHTML = lt_values[i].Description + " - " + lt_values[i].ID;
                                        break;
                                    }

                                }
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
        onCustomWidgetAfterUpdate(changedProperties) {
            this.getData();
        }
        fireChanged() {}
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = {
                ...this._props,
                ...changedProperties
            };
        }

    }

    customElements.define('custom-button', PerformanceHelp);
})();
