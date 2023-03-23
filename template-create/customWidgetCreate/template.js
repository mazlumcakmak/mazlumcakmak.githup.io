(function () { 
  let widgetId = "";
  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
        <style> 
        select {
          width: 100%;  
          border: 1px solid;
          border-radius: 0.25em;
          padding: 0.25em 0.5em;
          font-size: 0.9rem;  
          border: 2px solid #ccc;
          border-radius: 5px;
        }
      </style>
      <select id="builder_displayOpt">
        <option value="json">JSON</option>
        <option value="main">Main js</option>
        <option value="builder">Builder</option>
      </select>
    `;

  class templateCreate extends HTMLElement {
    constructor() {
      super();
      this.init();
      this._props = {}; 
    }

    init() {
      let shadowRoot = this.attachShadow({
        mode: "open",
      });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));

    }

    // get file
    getFile() {

      widgetId = this.widgetId;
      // cw
      var cwrequest = new XMLHttpRequest();
      var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWMaster?$filter=ID%20eq%20%27widgetId%27";

      cwrequest.open("GET", url, false);
      cwrequest.send(null);
      var lt_cw = JSON.parse(cwrequest.responseText).value;

      // cw
      var cwprequest = new XMLHttpRequest();
      var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWMaster";

      cwprequest.open("GET", url, false);
      cwprequest.send(null);
      var lt_cwp = JSON.parse(cwprequest.responseText).value;
      jsonText = "test json string";
      
    }







    // after update
    onCustomWidgetAfterUpdate(changedProperties) {

    }
    // getter setter
    fireChanged() {
      this.dispatchEvent(
        new CustomEvent("propertiesChanged", {
          detail: {
            properties: {
              customWidgetName: this.customWidgetName,
              jsonText: this.jsonText 
            },
          },
        })
      );
    }
    // before update


    // getter setter
    get customWidgetName() {
      return widgetId;
    }
    set customWidgetName(_custId) {
      widgetId = _custId;
    }
    get jsonText(){
      return jsonText;
    }
  }



  customElements.define("template-create-main", templateCreate);
})();