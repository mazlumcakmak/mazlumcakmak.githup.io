(function () {
  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
  <br>
  <style>
    #form {
      font-family: Arial, sans-serif;
      width: 100%;
      margin: 0 audimensionType;
    }
  
    #table {
      min-width: 50px;
      width: 100%;
      border-collapse: collapse;
      margin-botdimensionTypem: 10px;
    }
  
    #td { 
      text-align: left;
      font-size: 13px;
    }
  
    td,
    th { 
      text-align: left;
      padding: 8px;
    }
  
    tr:nth-child(even) {
      background-color: #dddddd;
    }
  
    #tr:nth-child(even) {
      background-color: #FFFFFF;
    }
  
    select {
      width: 100%;
      min-width: 15ch;
      max-width: 300ch;
      border: 1px solid;
      border-radius: 0.25em;
      padding: 0.25em 0.5em;
      font-size: 0.9rem;
      cursor: pointer;
      line-height: 1.1;
      background-color: #fff;
      background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
      position: relative;
      border: 2px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      margin-botdimensionTypem: 10px;
    }
  </style>
  <form id="form">
    <table id="table">
      <tr id="tr" align="center">
        <td id="td" align="center"> 
          <select id="builder_displayOpt">
            <option value="json">JSON</option>
            <option value="main">Main js</option>
            <option value="builder">Builder</option>
          </select>
        </td>
      </tr>
    </table>
  </form>
    `;

  class templateCreate extends HTMLElement {
    constructor() {
      super();
      this.init();
      this._props = {};
      this._select = {};
    }

    init() {
      let shadowRoot = this.attachShadow({
        mode: "open",
      });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
 
    }

    // get file
    getFile() {
      const lv_fileType = this._props.fileType;
      // get token
      var lv_token = this.getToken();

      // cw
      var cwrequest = new XMLHttpRequest();
      var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWMaster";

      cwrequest.open("GET", url, false);
      cwrequest.setRequestHeader(
        "Authorization",
        "Bearer " + lv_token
      );
      cwrequest.send(null);
      var lt_cw = JSON.parse(cwrequest.responseText).value;



      // cw
      var cwprequest = new XMLHttpRequest();
      var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/C7mdde8dlqmog6pl6c85rpea2/CWMaster";

      cwprequest.open("GET", url, false);
      cwprequest.setRequestHeader(
        "Authorization",
        "Bearer " + lv_token
      );
      cwprequest.send(null);
      var lt_cwp = JSON.parse(cwprequest.responseText).value;



      console.log(lt_cw);

    }



    getToken() {
      var request = new XMLHttpRequest();
      // get token
      var token = "";
      var url =
        "https://itelligencegroup-4.authentication.eu10.hana.ondemand.com/oauth/token?grant_type=client_credentials";
      var username =
        "sb-5eef0586-d843-43bb-bcf4-b1469d4c9747!b51342|client!b3650";
      var password = "fzk0Cz/n3KZXWvHQ3kLLPWdcDuw=";
      var base64Credentials = btoa(username + ":" + password);

      request.open("GET", url, false);
      request.setRequestHeader("content-type", "application/json");
      request.setRequestHeader("Authorization", "Basic " + base64Credentials);
      request.send(null);
      if (request.status != 200) {
        return "";
      }
      var response = JSON.parse(request.responseText);
      return (token = response.access_token);
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
              jsonFile: this.jsonFile,
              mainFile: this.mainFile,
              builderFile: this.builderFile,
            },
          },
        })
      );
    }
    // before update
    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = {
        ...this._props,
        ...changedProperties,
      };
    }

    // getter setter
    get customWidgetName() {
      return jsonFile;
    } 
  }



  customElements.define("template-create-main", templateCreate);
})();