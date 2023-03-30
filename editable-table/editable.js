(function () {
    let _shadowRoot;
    let _id;
    let _password;

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
        <style>
        </style>
        <div id="ui5_content" name="ui5_content" style="width: 100%; height:500px;">
         <slot name="content"  style="width: 100%; height: 500px;"></slot>
        </div>

        <script id="oView" name="oView" type="sapui5/xmlview">
        <mvc:View
	xmlns="sap.m"
	xmlns:core="sap.ui.core"
	xmlns:mvc="sap.ui.core.mvc"
	xmlns:smartFilterBar="sap.ui.comp.smartfilterbar"
	xmlns:smartTable="sap.ui.comp.smarttable"
	xmlns:html="http://www.w3.org/1999/xhtml"
	xmlns:app="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"
	controllerName="sap.ui.comp.sample.smarttable.mtableCustomizeConfig.SmartTable"
	height="100%">

		<smartFilterBar:SmartFilterBar id="smartFilterBar" entitySet="LineItemsSet" persistencyKey="SmartFilter_Explored">
			<smartFilterBar:controlConfiguration>
				<smartFilterBar:ControlConfiguration key="Bukrs">
					<smartFilterBar:defaultFilterValues>
						<smartFilterBar:SelectOption low="0001">
						</smartFilterBar:SelectOption>
					</smartFilterBar:defaultFilterValues>
				</smartFilterBar:ControlConfiguration>
				<smartFilterBar:ControlConfiguration key="Gjahr">
					<smartFilterBar:defaultFilterValues>
						<smartFilterBar:SelectOption low="2014">
						</smartFilterBar:SelectOption>
					</smartFilterBar:defaultFilterValues>
				</smartFilterBar:ControlConfiguration>
			</smartFilterBar:controlConfiguration>
		</smartFilterBar:SmartFilterBar>
		<smartTable:SmartTable entitySet="LineItemsSet" smartFilterId="smartFilterBar"
			tableType="ResponsiveTable" useExportToExcel="true" beforeExport="onBeforeExport"
			app:useSmartField="true" customizeConfig="{
				'textInEditModeSource': {
					'*': 'ValueList',
					'Bukrs':'NavigationProperty'
				},
				'clientSideMandatoryCheck': {
					'*': true,
					'Bukrs': false
				}
			}"
			useVariantManagement="true" useTablePersonalisation="true" header="Line Items"
			showRowCount="true" persistencyKey="SmartTableAnalytical_Explored" enableAutoBinding="true"
			demandPopin="true" class="sapUiResponsiveContentPadding" enableAutoColumnWidth="true" editTogglable="true" app:useSmartToggle="true"/>
</mvc:View>
        </script>        
    `;

    class editTableWidget extends HTMLElement {
        constructor() {
            super();
            var table;

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

            _id = createGuid();

            _shadowRoot.querySelector("#oView").id = _id + "_oView";

            this._export_settings = {};
            this._export_settings.password = "";
            loadthis(this);
            this.addEventListener("click", event => {
                console.log('click');
            });
        }

        connectedCallback() {
            try {
                if (window.commonApp) {
                    let outlineContainer = commonApp.getShell().findElements(true, ele => ele.hasStyleClass && ele.hasStyleClass("sapAppBuildingOutline"))[0]; // sId: "__container0"

                    if (outlineContainer && outlineContainer.getReactProps) {
                        let parseReactState = state => {
                            let components = {};

                            let globalState = state.globalState;
                            let instances = globalState.instances;
                            let app = instances.app["[{\"app\":\"MAIN_APPLICATION\"}]"];
                            let names = app.names;

                            for (let key in names) {
                                let name = names[key];

                                let obj = JSON.parse(key).pop();
                                let type = Object.keys(obj)[0];
                                let id = obj[type];

                                components[id] = {
                                    type: type,
                                    name: name
                                };
                            }

                            for (let componentId in components) {
                                let component = components[componentId];
                            }

                            let metadata = JSON.stringify({
                                components: components,
                                vars: app.globalVars
                            });

                            if (metadata != this.metadata) {
                                this.metadata = metadata;

                                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                                    detail: {
                                        properties: {
                                            metadata: metadata
                                        }
                                    }
                                }));
                            }
                        };

                        let subscribeReactStore = store => {
                            this._subscription = store.subscribe({
                                effect: state => {
                                    parseReactState(state);
                                    return {
                                        result: 1
                                    };
                                }
                            });
                        };

                        let props = outlineContainer.getReactProps();
                        if (props) {
                            subscribeReactStore(props.store);
                        } else {
                            let oldRenderReactComponent = outlineContainer.renderReactComponent;
                            outlineContainer.renderReactComponent = e => {
                                let props = outlineContainer.getReactProps();
                                subscribeReactStore(props.store);

                                oldRenderReactComponent.call(outlineContainer, e);
                            }
                        }
                    }
                }
            } catch (e) {}
        }

        disconnectedCallback() {
            if (this._subscription) {
                this._subscription();
                this._subscription = null;
            }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            if ("designMode" in changedProperties) {
                this._designMode = changedProperties["designMode"];
            }
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            loadthis(this);
        }

        _firePropertiesChanged() {
            this.password = "";
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        password: this.password
                    }
                }
            }));
        }

        // SETTINGS
        get password() {
            return this._export_settings.password;
        }
        set password(value) {
            value = _password;
            this._export_settings.password = value;
        }

        static get observedAttributes() {
            return [
                "password"
            ];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }

    }
    customElements.define("edit-table-widget-main", editTableWidget);

    // UTILS
    function loadthis(that) {
        var that_ = that;

        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.getCore().attachInit(function () {
            "use strict";

            //### Controller ###
            sap.ui.define([
                'sap/ui/core/mvc/Controller',
                'sap/ui/model/odata/v2/ODataModel',
                'sap/ui/comp/sample/smarttable/mockserver/DemoMockServer'
            ], function (Controller, ODataModel, DemoMockServer) {
                "use strict";

                return Controller.extend("sap.ui.comp.sample.smarttable.mtableCustomizeConfig.SmartTable", {
                    onInit: function () {
                        var oModel, oView;

                        this._oMockServer = new DemoMockServer();

                        oModel = new ODataModel(this._oMockServer.getServiceUrl(), {
                            defaultCountMode: "Inline"
                        });

                        oView = this.getView();
                        oView.setModel(oModel);
                    },
                    onBeforeExport: function (oEvt) {
                        var mExcelSettings = oEvt.getParameter("exportSettings");

                        // Disable Worker as Mockserver is used in Demokit sample
                        mExcelSettings.worker = false;
                    },
                    onExit: function () {
                        this._oMockServer.stop();
                    }
                });
            });


            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
            });
            oView.placeAt(content);



        });
    }

    function createGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0,
                v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
})();