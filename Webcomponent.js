(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '<br> <style> select { width: 100%; min-width: 15ch; max-width: 300ch; border: 1px solid ; border-radius: 0.25em; padding: 0.25em 0.5em; font-size: 1.25rem; cursor: pointer; line-height: 1.1; background-color: #fff; background-image: linear-gradient(to top, #f9f9f9, #fff 33%);position: relative; } </style> <select id="dimDropDownSel" > <option>Loading...</option> </select>';

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
        fireChanged() {
			this.selectedKey();
		}
		get selectedKey(){
			var e = this.shadowRoot.getElementById("dimDropDownSel");
            return e.options[e.selectedIndex].text; 
		}
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = {
                ...this._props,
                ...changedProperties
            };
        }

    }

    customElements.define('custom-button', PerformanceHelp);
})();
