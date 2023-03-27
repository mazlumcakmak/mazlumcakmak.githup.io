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

    ],
    "properties": {},
    "methods": {}
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
      this._props.widgetId = "";
      this._props.json = "";
      this._props.mainJs = "";
      this._props.builderJs = "";

    }

    init() {
      let shadowRoot = this.attachShadow({
        mode: "open",
      });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));

      //this.fireChanged();

    }
    // create json file
    async getJsonFile() {
      this._firePropertiesChanged();
      widgetId = this._props.widgetId;
      if (widgetId == "") return;

      var cwrequest = new XMLHttpRequest();
      var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWMaster?$filter=ID%20eq%20%27" + widgetId + "%27";

      cwrequest.open("GET", url, false);
      cwrequest.send(null);
      if (cwrequest.status != 200) {

        return;
      }
      var lt_cw = JSON.parse(cwrequest.responseText).value;

      // cw
      var cwprequest = new XMLHttpRequest();
      var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWPMaster?$filter=CUSTOMWIDGET%20eq%20%27" + widgetId + "%27";

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

      for (let i = 0; i < lt_cwp.length; i++) {
        var methodName = lt_cwp[i].ORIGINALCWPID;
        var memberId = lt_cwp[i].ORIGINALCWPID;
        jsonFile.properties[memberId] = {
          "description": lt_cwp[i].Description,
          "type": lt_cwp[i].TYPE
        }

        // getter 
        jsonFile.methods["get" + methodName] = {
          "returnType": lt_cwp[i].TYPE,
          "description": lt_cwp[i].Description,
          "body": "return  this." + methodName + ";"
        }

        // setter
        jsonFile.methods["set" + methodName] = {
          "description": lt_cwp[i].Description,
          "parameters": [{
            "name": methodName,
            "type": lt_cwp[i].TYPE,
            "description": lt_cwp[i].Description
          }],
          "body": "this." + methodName + " = " + methodName + ";"
        }

      }
      var fileName = lt_cw[0].ID;
      var jsonFormater = JSON.stringify(jsonFile, null, 4);

      this.json = jsonFormater;
      console.log("jsonFormater", this.json);
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
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWPMaster?$filter=CUSTOMWIDGET%20eq%20%27" + widgetId + "%27";

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

      for (let i = 0; i < lt_cwp.length; i++) {
        var methodName = lt_cwp[i].ORIGINALCWPID;
        var memberId = lt_cwp[i].ORIGINALCWPID;
        jsonFile.properties[memberId] = {
          "description": lt_cwp[i].Description,
          "type": lt_cwp[i].TYPE
        }

        // getter 
        jsonFile.methods["get" + methodName] = {
          "returnType": lt_cwp[i].TYPE,
          "description": lt_cwp[i].Description,
          "body": "return  this." + methodName + ";"
        }

        // setter
        jsonFile.methods["set" + methodName] = {
          "description": lt_cwp[i].Description,
          "parameters": [{
            "name": methodName,
            "type": lt_cwp[i].TYPE,
            "description": lt_cwp[i].Description
          }],
          "body": "this." + methodName + " = " + methodName + ";"
        }

      }
      var fileName = lt_cw[0].ID;
      var jsonFormater = JSON.stringify(jsonFile, null, 4);
      await this.download(fileName, jsonFormater);
      this.customWidgetName = '';

    }

    async download(filename, text) {


      var myblob = new Blob([text], {
        type: 'application/json'
      });
      let fileHandle;
      const opts = {
        types: [{
          description: filename,
          accept: {
            'application/json': ['.json']
          },
        }],
        suggestedName: filename,
      };
      fileHandle = await window.showSaveFilePicker(opts);
      const writable = await fileHandle.createWritable();
      console.log("fileHandle", fileHandle);
      console.log("writable", writable);
      await writable.write(myblob);
      await writable.close();
    }

    // after update
    async onCustomWidgetAfterUpdate(changedProperties) {
      if ("widgetId" in changedProperties) {
        async function loadFile() {
          try {
            await this.getJsonFile();
          } catch (e) {
            console.log(e);
          } finally {
            await this.getJsonFile();
          }
        }
        loadFile();

      }
    }

    onCustomWidgetBeforeUpdate(changedProperties) {

    }

    _firePropertiesChanged() {
      this.json = "";
      this.mainJs = "";
      this.builderJs = "";
      this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
          properties: {
            json: this.json,
            mainJs: this.mainJs,
            builderJs: this.builderJs
          }
        }
      }));
    }



    // getter setter
    get widgetId() {
      return this._props.widgetId;
    }

    set widgetId(value) {
      this._props.widgetId = value;
    }

    get json() {
      return this._props.json;
    }

    set json(value) {
      this._props.json = value;
    }

    get mainJs() {
      return this._props.mainJs;
    }

    set mainJs(value) {
      this._props.mainJs = value;
    }

    get builderJs() {
      return this._props.builderJs;
    }

    set builderJs(value) {
      this._props.builderJs = value;
    }
  }



  customElements.define("template-create-main", templateCreate);
})();