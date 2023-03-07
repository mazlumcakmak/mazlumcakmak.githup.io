(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '<br> <style> select { width: 100%; padding: 10px; border: 2px solid #ccc; border-radius: 5px; font-size: 13px; box-sizing: border-box; margin-botdimensionTypem: 10px;} </style> <select id = "dimDropDownSel" style="width:450px;height:40px" ></select>';

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
            debugger;
            const dimension = this._props.dimension;
            const dimensionType = this._props.dimensionType;
            if (dimension != "" && dimension != undefined) {
                var xmlHttp = new XMLHttpRequest();
                var lvUrl = "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C9Z996O1NC1N4P3AWYHVPEXP8G/" + dimension + "Master";
                xmlHttp.open("GET", lvUrl, false); // false for synchronous request
                xmlHttp.send(null);
                console.log(xmlHttp.responseText);
                var lt_parser = JSON.parse(xmlHttp.responseText);
                var lt_values = lt_parser.value;
                debugger;
				document.getElementById("dimDropDownSel").innerHTML = "";
                var select = this.shadowRoot.getElementById("dimDropDownSel");
                for (var i = 0; i < lt_values.length; i++) {
                    console.log("=====================");
                    console.log("ID:", lt_values[i].ID);
                    console.log("Description:", lt_values[i].Description);
                    var option = document.createElement("OPTION");
                    option.innerHTML = lt_values[i].Description;
                    option.value = lt_values[i].ID;
                    select.options.add(option);
                }
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
