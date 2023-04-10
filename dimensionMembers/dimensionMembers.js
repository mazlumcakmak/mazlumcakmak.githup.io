(function () {

    let tmpl = document.createElement("template");
    tmpl.innerHTML = '<br> <style> </style> ';

    class dimMembers extends HTMLElement {
        constructor() {
            super();
            this._props = {};
            this.dimension = [];
            this.factData = '';
            this.masterData = {};
            this.filter = '';
            this.dimData = '';
            this.provider = '';

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
            if ("dimension" in changedProperties || "provider" in changedProperties) {
                debugger;
                if (this.provider == "" || this.provider) {
                    return;
                }

                var lt_dim = this.dimension.value();
                for (const dim of lt_dim) {
                    this.masterDataService(this.provider, dim);
                }
            }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {}

        _firePropertiesChanged() {
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        dimension: this.dimension,
                        factData: this.factData,
                        filter: this.filter,
                        dimData: this.dimData,
                        provider: this.provider,

                    }
                }
            }));
        }



        // getter setter
        get dimData() {
            return this._props.dimData;
        }
        set dimData(value) {
            this._props.dimData = value;
        }
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
        get provider() {
            return this._props.provider;
        }
        set provider(value) {
            this._props.provider = value;
        }
        get masterData() {
            return this._props.masterData;
        }
        set masterData(value) {
            this._props.masterData = value;
        }


    }

    customElements.define("dimensionMembers-main", dimMembers);
    async function masterDataService(provider, dimension) {
        var url = new XMLHttpRequest();
        var url = "https://" + window.location.host + "/api/v1/dataexport/providers/sac/" + provider + "/" + dimension + "Master";
        masterDataReq.open("GET", url, true);
        masterDataReq.onload = (e) => {
            if (masterDataReq.readyState === 4) {
                if (masterDataReq.status === 200) {
                    masterData[dimension].push(JSON.parse(masterDataReq.responseText).value);
                }
            }
        }
        masterDataReq.onerror = (e) => {
            console.error(xhr.statusText);
        };
        masterDataReq.send(null);
    }



})();