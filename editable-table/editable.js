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
            height="500px"
            controllerName="sap.m.sample.TableEditable.Table"
            xmlns:mvc="sap.ui.core.mvc"
            xmlns="sap.m">

            <Page showHeader="false" enableScrolling="true" class="sapUiContentPadding"
                showNavButton="false">

                <content>
                    <Table id="idProductsTable" growing="true" growingThreshold="10" paste="onPaste">
                        <headerToolbar>
                            <OverflowToolbar id="otbSubheader">
                                <Title text="Products" level="H2" />
                                <ToolbarSpacer />
                                <Button id="editButton" text="Edit" type="Transparent"
                                    press="onEdit" />
                                <Button id="saveButton" text="Save" type="Transparent"
                                    press="onSave" visible="false" />
                                <Button id="cancelButton" text="Cancel" type="Transparent"
                                    press="onCancel" visible="false" />
                            </OverflowToolbar>
                        </headerToolbar>
                        <columns>
                            <Column width="12em">
                                <Text text="Product" />
                            </Column>
                            <Column minScreenWidth="Tablet" demandPopin="true" hAlign="End">
                                <Text text="Quantity" />
                            </Column>
                            <Column minScreenWidth="Tablet" demandPopin="true" hAlign="Center">
                                <Text text="Weight" />
                            </Column>
                            <Column hAlign="End">
                                <Text text="Price" />
                            </Column>
                        </columns>
                        <items>
                            <ColumnListItem vAlign="Middle">
                                <cells>
                                    <ObjectIdentifier title="{Name}" text="{ProductId}" />
                                    <ObjectNumber
                                        number="{
                                        path:'Quantity',
                                        type: 'sap.ui.model.type.String',
                                        formatOptions: {showMeasure: false}
                                    }"
                                        unit="{UoM}" />
                                    <ObjectNumber number="{WeightMeasure}" unit="{WeightUnit}"
                                        state="{
                                    path: 'WeightMeasure',
                                    formatter: 'sap.m.sample.TableEditable.Formatter.weightState'
                                }" />
                                    <ObjectNumber
                                        number="{
                                        parts:[{path:'Price'},{path:'CurrencyCode'}],
                                        type: 'sap.ui.model.type.Currency',
                                        formatOptions: {showMeasure: false}
                                    }"
                                        unit="{CurrencyCode}" />
                                </cells>
                            </ColumnListItem>
                        </items>
                    </Table>
                </content>
                <footer>
                    <OverflowToolbar id="otbFooter">
                        <ToolbarSpacer />
                        <Button text="Order" press="onOrder">
                            <layoutData>
                                <OverflowToolbarLayoutData
                                    moveToOverflow="false" />
                            </layoutData>
                        </Button>
                    </OverflowToolbar>
                </footer>

            </Page>
        </mvc:View>
        </script>        
    `;

    class editTableWidget extends HTMLElement {
        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

            _id = createGuid();

            _shadowRoot.querySelector("#oView").id = _id + "_oView";

            this._export_settings = {};
            this._export_settings.password = "";

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
                'sap/base/util/deepExtend',
                'sap/ui/core/mvc/Controller',
                'sap/ui/model/json/JSONModel',
                'sap/m/ColumnListItem',
                'sap/m/Input',
                'sap/m/MessageToast'
            ], function (deepExtend, Formatter, Controller, JSONModel, ColumnListItem, Input, MessageToast) {
                "use strict";

                var TableController = Controller.extend("sap.m.sample.TableEditable.Table", {

                    onInit: function (evt) {
                        var lv_json = {
                            "ProductCollection": [{
                                    "ProductId": "HT-1000",
                                    "Category": "Laptops",
                                    "MainCategory": "Computer Systems",
                                    "TaxTarifCode": "1",
                                    "SupplierName": "Very Best Screens",
                                    "WeightMeasure": 4.2,
                                    "WeightUnit": "KG",
                                    "Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                                    "Name": "Notebook Basic 15",
                                    "DateOfSale": "2017-03-26",
                                    "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
                                    "Status": "Available",
                                    "Quantity": 10,
                                    "UoM": "PC",
                                    "CurrencyCode": "EUR",
                                    "Price": 956,
                                    "Width": 30,
                                    "Depth": 18,
                                    "Height": 3,
                                    "DimUnit": "cm"
                                },
                                {
                                    "ProductId": "HT-1001",
                                    "Category": "Laptops",
                                    "MainCategory": "Computer Systems",
                                    "TaxTarifCode": "1",
                                    "SupplierName": "Very Best Screens",
                                    "WeightMeasure": 4.5,
                                    "WeightUnit": "KG",
                                    "Description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                                    "Name": "Notebook Basic 17",
                                    "DateOfSale": "2017-04-17",
                                    "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
                                    "Status": "Available",
                                    "Quantity": 20,
                                    "UoM": "PC",
                                    "CurrencyCode": "EUR",
                                    "Price": 1249,
                                    "Width": 29,
                                    "Depth": 17,
                                    "Height": 3.1,
                                    "DimUnit": "cm"
                                }
                            ]
                        };
                        this.oModel = new JSONModel(lv_json);
                        this.oTable = this.byId("idProductsTable");
                        this.getView().setModel(this.oModel);
                        this.oReadOnlyTemplate = this.byId("idProductsTable").removeItem(0);
                        this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                        this.oEditableTemplate = new ColumnListItem({
                            cells: [
                                new Input({
                                    value: "{Name}"
                                }), new Input({
                                    value: "{Quantity}",
                                    description: "{UoM}"
                                }), new Input({
                                    value: "{WeightMeasure}",
                                    description: "{WeightUnit}"
                                }), new Input({
                                    value: "{Price}",
                                    description: "{CurrencyCode}"
                                })
                            ]
                        });
                    },

                    rebindTable: function (oTemplate, sKeyboardMode) {
                        this.oTable.bindItems({
                            path: "/ProductCollection",
                            template: oTemplate,
                            templateShareable: true,
                            key: "ProductId"
                        }).setKeyboardMode(sKeyboardMode);
                    },

                    onEdit: function () {
                        this.aProductCollection = deepExtend([], this.oModel.getProperty("/ProductCollection"));
                        this.byId("editButton").setVisible(false);
                        this.byId("saveButton").setVisible(true);
                        this.byId("cancelButton").setVisible(true);
                        this.rebindTable(this.oEditableTemplate, "Edit");
                    },

                    onSave: function () {
                        this.byId("saveButton").setVisible(false);
                        this.byId("cancelButton").setVisible(false);
                        this.byId("editButton").setVisible(true);
                        this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                    },

                    onCancel: function () {
                        this.byId("cancelButton").setVisible(false);
                        this.byId("saveButton").setVisible(false);
                        this.byId("editButton").setVisible(true);
                        this.oModel.setProperty("/ProductCollection", this.aProductCollection);
                        this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                    },

                    onOrder: function () {
                        MessageToast.show("Order button pressed");
                    },

                    onExit: function () {
                        this.aProductCollection = [];
                        this.oEditableTemplate.destroy();
                        this.oModel.destroy();
                    },

                    onPaste: function (oEvent) {
                        var aData = oEvent.getParameter("data");
                        MessageToast.show("Pasted Data: " + aData);
                    }
                });

                return TableController;

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