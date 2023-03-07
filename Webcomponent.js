(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML =
'<button type="button" id="myBtn">Helper Button</button>
<div class="combobox">
<select>
<option value="Select">Select....</option>
<option value="php">php</option>
<option value="html">html</option>
<option value="javascript">Javascript</option>
<option value="CPP">CPP</option>
<option value="Python">Python</option>
<option value="vue">Vue</option>
<option value="7">Cobobl</option>
<option value="9">TEXT 4</option>
<option value="CSS Text">CSS TEXT</option>
<option value="responsive">Responsive</option>
<option value="script">scripting</option>
<option value="preprocessors">Saas, Less</option>
<option value="csharp">C Sharp</option></select>
</div>
<style>
:root {--PANTONECOATED: #5075d0;}
select { 
  box-shadow: none;
  flex: 1;  padding: 0 1.2em;  color: #fff;
  background-color: var(--PANTONECOATED);
  cursor: pointer;}
  
select::-ms-expand { display: none;}
.combobox {
  position: relative;
  display: flex;  width: 20em;  height: 3em;
  border-radius: .25em;  overflow: hidden;
  color:#fff;}
  
.combobox::after {
  content: '\25BC';  position: absolute;
  top: 0;  right: 0;  padding: 1em;
  background-color: #b567c5;
  transition: .25s all ease;
  pointer-events: none;}
  
.combobox:hover::after {
  color: #f39c12;
}
</style>';

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
            xmlHttp.open("GET", "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C9Z996O1NC1N4P3AWYHVPEXP8G/FactData?deltaid=first-abad8f16-9ce9-4d1a-9b3e-39d5ca8cd4e5", false); // false for synchronous request
            xmlHttp.send(null);
            console.log(xmlHttp.responseText);
            var lt_parser = JSON.parse(xmlHttp.responseText);
            var lt_values = lt_parser.value;
            for (var i = 0; i < lt_values.length; i++) {
                console.log("=====================");
                console.log("Price:", lt_values[i].PRICE);
                console.log("QUANTITY:", lt_values[i].QUANTITY);
                console.log("COMPPRICE:", lt_values[i].COMPPRICE);
                console.log("LOTAMOUNT:", lt_values[i].LOTAMOUNT);
                console.log("SALESQUANTITY:", lt_values[i].SALESQUANTITY);
                console.log("AMOUNT:", lt_values[i].AMOUNT);
                console.log("COMPONENTQUANTITY:", lt_values[i].COMPONENTQUANTITY);
                console.log("LOTSIZE:", lt_values[i].LOTSIZE);
                console.log("SAP_FI_IFP_QUANTITY_UNIT:", lt_values[i].SAP_FI_IFP_QUANTITY_UNIT);
                console.log("SAP_FI_IFP_GLACCOUNT:", lt_values[i].SAP_FI_IFP_GLACCOUNT);
                console.log("Date:", lt_values[i].SAP_FI_IFP_GLACCOUNT);
                console.log("SAP_FI_IFP_GLACCOUNT:", lt_values[i].Date);
                console.log("SAP_FI_IFP_FIXVARIABLE:", lt_values[i].SAP_FI_IFP_FIXVARIABLE);
                console.log("Version:", lt_values[i].Version);
                console.log("SAP_FI_IFP_COMPONENTPLANT:", lt_values[i].SAP_FI_IFP_COMPONENTPLANT);
                console.log("SAP_ALL_COSTCENTER:", lt_values[i].SAP_ALL_COSTCENTER);
                console.log("SAP_FI_IFP_LOTSIZE_UNIT:", lt_values[i].SAP_FI_IFP_LOTSIZE_UNIT);
                console.log("SAP_ALL_PLANT:", lt_values[i].SAP_ALL_PLANT);
                console.log("SAP_ALL_MATERIAL:", lt_values[i].SAP_ALL_MATERIAL);
                console.log("SAP_FI_IFP_CCACTIVITYTYPE:", lt_values[i].SAP_FI_IFP_CCACTIVITYTYPE);
                console.log("SAP_ALL_PRODUCT:", lt_values[i].SAP_ALL_PRODUCT);
                console.log("SAP_FI_IFP_SALESQUANTITY_UNIT:", lt_values[i].SAP_FI_IFP_SALESQUANTITY_UNIT);
                console.log("=====================");
            }

        }

    }

    customElements.define('custom-button', PerformanceHelp);
})();
