(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '<select name="dimDropDownSel"> <option value="A">A</option> <option value="B">B</option> <option value="-">Other</option> </select>';

    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();
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

        fireChanged() {
            console.log("OnClick Triggered");
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C9Z996O1NC1N4P3AWYHVPEXP8G/SAP_FI_IFP_GLACCOUNTMaster", false); // false for synchronous request
            xmlHttp.send(null);
            console.log(xmlHttp.responseText);
            var lt_parser = JSON.parse(xmlHttp.responseText);
            var lt_values = lt_parser.value;
            for (var i = 0; i < lt_values.length; i++) {
                console.log("=====================");
                console.log("ID:", lt_values[i].ID);
                console.log("Description:", lt_values[i].Description);  
				var select = document.getElementById("dimDropDownSel");
				var option = document.createElement('option');
				option.text = lt_values[i].Description;
				option.value  = lt_values[i].ID;
				select.add(option, 0);
            }

        }

    }

    customElements.define('custom-button', PerformanceHelp);
})();
