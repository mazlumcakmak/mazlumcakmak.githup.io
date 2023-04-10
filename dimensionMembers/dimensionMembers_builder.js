(function () {

        let tmpl = document.createElement("template");
        tmpl.innerHTML = '';
    
        class className extends HTMLElement {
            constructor() {
                super();
                this._props = {};
                this.dimension = '';
this.factData = '';
this.filter = '';

                this.init();
    
            }
    
            init() {
                let shadowRoot = this.attachShadow({
                    mode: "open",
                });
                shadowRoot.appendChild(tmpl.content.cloneNode(true));
    
            }
    
            // after update
            onCustomWidgetAfterUpdate(changedProperties) {
                this._firePropertiesChanged();
            }
    
            onCustomWidgetBeforeUpdate(changedProperties) {}
    
            _firePropertiesChanged() {
                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                        detail: {
                            properties: {
                              dimension : this.dimension,
factData : this.factData,
filter : this.filter,

                            }
                        }
                    }));
            }
    
            // getter setter
             get dimension() {
 return this._props.dimension;
}
 set dimension(value) {
 this._props.dimension = value;
}
 get factData() {
 return this._props.factData;
}
 set factData(value) {
 this._props.factData = value;
}
 get filter() {
 return this._props.filter;
}
 set filter(value) {
 this._props.filter = value;
}

           
        }
    
        customElements.define("dimensionMembers-builder", className);
        async function masterDataService(tenant,provider,dimension) {
var masterDataReq = new XMLHttpRequest();
var url = "https://"+tenant+"/api/v1/dataexport/providers/sac/"+provider+"/"+dimension+"Master";masterDataReq.open("GET", url, false);
masterDataReq.send(null);
if (masterDataReq.status != 200) {
  return;
 }
return JSON.parse(masterDataReq.responseText).value
}
    
    })();