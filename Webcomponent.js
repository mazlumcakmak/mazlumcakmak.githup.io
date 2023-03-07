(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<button type="button" id="myBtn">Helper Button</button>` ;   
   
    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();           
        }

        init() {            
              
            let shadowRoot = this.attachShadow({mode: "open"});
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
            xmlHttp.open( "GET", "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C9Z996O1NC1N4P3AWYHVPEXP8G/FactData?deltaid=first-abad8f16-9ce9-4d1a-9b3e-39d5ca8cd4e5", false ); // false for synchronous request
            xmlHttp.send( null );
            console.log(xmlHttp.responseText);
            var lt_parser =  JSON.parse(xmlHttp.responseText);
            var lt_values = lt_parser.value;
            for(var i = 0; i < lt_values.length; i++ ){
                console.log(lt_values[i].PRICE);
            }
            
        }        
        
    }

    customElements.define('custom-button', PerformanceHelp);
})();
