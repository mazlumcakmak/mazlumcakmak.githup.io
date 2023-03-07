(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '<select id = "dimDropDownSel" style="width:450px;height:40px" ></select>';

    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init(); 
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C9Z996O1NC1N4P3AWYHVPEXP8G/SAP_FI_IFP_GLACCOUNTMaster", false); // false for synchronous request
            xmlHttp.send(null);
            console.log(xmlHttp.responseText);
            var lt_parser = JSON.parse(xmlHttp.responseText);
            var lt_values = lt_parser.value;
            debugger;
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

        fireChanged() {}
      

    }

    customElements.define('custom-button', PerformanceHelp);
})();
