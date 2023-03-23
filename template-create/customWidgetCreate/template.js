(function () {
  let widgetId = "";
  var jsonFile = {
    "name": "",
    "description": "",
    "newInstancePrefix": "",
    "eula": "",
    "vendor": "",
    "license": "",
    "id": "",
    "version": "",
    "icon": "",
    "webcomponents": [{
        "kind": "main",
        "tag": "",
        "url": "",
        "integrity": "",
        "ignoreIntegrity": true
      }

    ]
  };
  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
        <style> 
        select {
          width: 100%;  
          height: 100%;  
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
      //this.fireChanged();

    }

    // get file
    async getFile() {

     // widgetId = this.customWidgetName;
      // cw
      var cwrequest = new XMLHttpRequest();
      var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWMaster?$filter=ID%20eq%20%27" + widgetId + "%27";

      cwrequest.open("GET", url, false);
      cwrequest.send(null);
      if (cwrequest.status != 200) {

        return;
      }
      var lt_cw = JSON.parse(cwrequest.responseText).value;
      console.log("cw", lt_cw);

      // cw
      var cwprequest = new XMLHttpRequest();
      var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWMaster";

      cwprequest.open("GET", url, false);
      cwprequest.send(null);
      if (cwprequest.status != 200) {
        return;
      }
      var lt_cwp = JSON.parse(cwprequest.responseText).value;
      jsonFile.name = lt_cw[0].ID;
      jsonFile.description = lt_cw[0].Description;
      jsonFile.newInstancePrefix = lt_cw[0].NEWINSTANCEPREFIX;
      jsonFile.eula = lt_cw[0].EULA;
      jsonFile.vendor = lt_cw[0].VENDOR;
      jsonFile.license = lt_cw[0].LICENSE;
      jsonFile.version = lt_cw[0].VERSION;
      jsonFile.webcomponents[0].url = "enter url....";
      jsonFile.webcomponents[0].tag = lt_cw[0].ID + "-main";
      var jsonse = JSON.stringify(jsonFile);
      var fileName = lt_cw[0].ID + ".json";
      this.download(jsonse, fileName, "application/json");

    }

    download(content, fileName, contentType) {
      var a = document.createElement("a");
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
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
              jsonText: this.jsonText,
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
      debugger;
      widgetId = _custId;
      this.getFile();
    }
    get jsonFile() {
      this.getFile();
      return String(jsonFile);
    } 
  }



  customElements.define("template-create-main", templateCreate);
})();