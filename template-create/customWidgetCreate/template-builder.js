(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        
            <style>
            fieldset {
                margin-bottom: 10px;
                border: 1px solid #afafaf;
                border-radius: 3px;
            }
            table {
                width: 100%;
            }
            input, textarea, select {
                font-family: "72",Arial,Helvetica,sans-serif;
                width: 100%;
                padding: 4px;
                box-sizing: border-box;
                border: 1px solid #bfbfbf;
            }
            input[type=checkbox] {
                width: inherit;
                margin: 6px 3px 6px 0;
                vertical-align: middle;
            }
        </style>
        <form id="form" autocomplete="off">
        <fieldset> 
            <legend>General</legend>
            <table>
            <tr>
                <td><label for="widget ID">Widget ID</label></td>
                <td><input id="widgetId" name="widgetId" type="text"></td>
            </tr>
            <tr>
                <td><label for="JSON">JSON</label></td>
                <td><input id="json" name="json" type="text"></td>
            </tr>
            <tr>
                <td><label for="Main JS">Main JS</label></td>
                <td><input id="main-js" name="main-js" type="text"></td>
            </tr>
            <tr>
                <td><label for="Builder JS">Builder JS</label></td>
                <td><input id="builder-js" name="builder-js" type="text"></td>
            </tr>
           
            </table>
        </fieldset>
        <button type="submit" hidden>Submit</button>
        </form>
    `;
    class templateBuilder extends HTMLElement {
        constructor() {
            super();

            this._shadowRoot = this.attachShadow({
                mode: "open",
            });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            // get form variable
            let form = this._shadowRoot.getElementById("form");
            form.addEventListener("change", this._change.bind(this));


        }

        _change(e) {
            this._changeProperty(e.target.name);
        }

        _changeProperty(name) {
            let properties = {};
            properties[name] = this[name];
            this._firePropertiesChanged(properties);

        }

        _firePropertiesChanged(properties) {
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: properties
                }
            }));

        }
        
        get widgetId(){
            return this.getValue("widgetId");
        }

        set widgetId(value){
            this.setValue("widgetId",value);
        }

        get json() {
            return this.getValue("json");
        }

        set json(value) {
            this.setValue("json", value);
        }

        get mainJs() {
            return this.getValue("main-js");
        }

        set mainJs(value) {
            this.setValue("main-js", value);
        }

        get builderJs() {
            return this.getValue("builder-js");
        }

        set builderJs(value) {
            this.setValue("builder-js", value);
        }

        getValue(id) {
            return this._shadowRoot.getElementById(id).value;
        }

        setValue(id, value) {
            this._shadowRoot.getElementById(id).value = value;
        }
    }
    customElements.define("template-create-builder", templateBuilder);
})();