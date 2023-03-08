(function () {
    let _shadowRoot;
    let _id;
    let _dropDown;

    let tmpl = document.createElement("template");
    tmpl.innerHTML = '<style> </style> <div id="ui5_content" name="ui5_content"><slot name="content"></slot> </div> <script id="oView" name="oView" type="sapui5/xmlview"><mvc:View height="100%" controllerName="sap.m.sample.ComboBoxSearchBoth.controller.ComboBoxSearchBoth" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns:l="sap.ui.layout" xmlns="sap.m"> <Page showHeader="false" class="sapUiContentPadding"><content> <l:VerticalLayout> <ComboBox id="idComboBox" showSecondaryValues= "true" filterSecondaryValues= "true" value="{/comboBoxValue}" selectedKey="{/comboBoxKey}"';
    tmpl.innerHTML = tmpl.innerHTML + 'items="{ path: ';
    tmpl.innerHTML = tmpl.innerHTML + "/'/";
    tmpl.innerHTML = tmpl.innerHTML + " CountriesCollection/'";
    tmpl.innerHTML = tmpl.innerHTML + ", sorter: { path: 'text' } }";
    tmpl.innerHTML = tmpl.innerHTML + '"> <core:ListItem key="{key}" text="{text}" additionalText="{key}"/></ComboBox> <Label text="Formatted value (text and key):" labelFor="idComboBox"/><Text text="{parts: [{path:';
    tmpl.innerHTML = tmpl.innerHTML + "	'/comboBoxValue'}";
    tmpl.innerHTML = tmpl.innerHTML + ", {path: '/comboBoxKey'}]";
    tmpl.innerHTML = tmpl.innerHTML + ', formatter: '.fnFormatter '}"';
    tmpl.innerHTML = tmpl.innerHTML + ' /></l:VerticalLayout> </content> </Page> </mvc:View> </script>';

    class InputPassword extends HTMLElement {

        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

            _id = createGuid();

            _shadowRoot.querySelector("#oView").id = _id + "_oView";

            this._export_settings = {};
            this._export_settings.dropDown = "";

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
            this.dropDown = "";
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            dropDown: this.dropDown
                        }
                    }
                }));
        }

        // SETTINGS
        get dropDown() {
            return this._export_settings.dropDown;
        }
        set dropDown(value) {
            value = _dropDown;
            this._export_settings.dropDown = value;
        }

        static get observedAttributes() {
            return [
                "dropDown"
            ];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }

    }
    customElements.define("custom-dropDownWidget", InputPassword);

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
                    "jquery.sap.global",
                    "sap/ui/core/mvc/Controller"
                ], function (jQuery, Controller) {
                "use strict";

                return Controller.extend("myView.Template", {
                    onButtonPress: function (oEvent) {
                        _dropDown = oView.byId("idComboBox").getValue();
                        that._firePropertiesChanged();
                        console.log(_dropDown);

                        this.settings = {};
                        this.settings.dropDown = "";

                        that.dispatchEvent(new CustomEvent("onStart", {
                                detail: {
                                    settings: this.settings
                                }
                            }));
                    }
                });
            });

            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
            });
            oView.placeAt(content);

            if (that_._designMode) {
                oView.byId("idComboBox").setEnabled(false);
            }
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
