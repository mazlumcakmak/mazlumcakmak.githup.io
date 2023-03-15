(function () {
  'use strict';
  let _costList;
  var costList = [];
  var bomlist;
  var matList;
  var compList;
  var purList;
  var salesList;
  var versionList;
  var costListFinal = [];

  let tmpl = document.createElement("template");
  tmpl.innerHTML =
    "<style>#buttonStyle {background-color: #487cac; color: white;padding: 20px;border: none;border-radius: 5px;font-size: 14px;cursor: pointer;width: 100%;}</style>";
  tmpl.innerHTML =
    tmpl.innerHTML + "<button id='buttonStyle' type='button'>Hesapla</button>";

  class bomExp extends HTMLElement {
    constructor() {
      super();
      costList = [];
      costListFinal = [];
      bomlist = [];
      matList = [];
      compList = [];
      purList = [];
      salesList = [];
      this.init();
    }

    init() {
      let shadowRoot = this.attachShadow({
        mode: "open",
      });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));

      // click event
      this.addEventListener("click", async (event) => {
        var event = new Event("onClick");
        await this.serviceRun();
        this.fireChanged();
        this.dispatchEvent(event);

        //console.log(costListFinal);
      });
    }

    // getter setter
    fireChanged() {
      this.dispatchEvent(
        new CustomEvent("propertiesChanged", {
          detail: {
            properties: {
              costList: this.costList,
            },
          },
        })
      );
    }

    async serviceRun() {
      debugger;
    /*  await (await this.$$.tblCost.getPlanning()).setUserInput({
        "@MeasureDimension": "[Measure].[parentId].&[amount]",
        "Date": "[Date].[YQM].&[202302]",
        "NTT_CW_COMPONENT":  "10000012",
        "NTT_CW_MATERIAL": "95000294",
        "Version": "public.2023V01"
      }, "9999900");
      await (await this.$$.tblCost.getPlanning()).submitData();*/
      
      // get token
      // var token = this.getToken();

      // get bom service
      let bomPromise = new Promise(function (resolve, reject) {
        var requestBom = new XMLHttpRequest();
        var url =
          "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/Cc5keq0sgrh7u1h1dnbh4nnn365/FactData";
        requestBom.open("GET", url, true);
        //requestBom.setRequestHeader("Authorization", "Bearer " + token);
        requestBom.onload = (e) => {
          bomlist = JSON.parse(requestBom.responseText).value;
          resolve(true);
        };
        requestBom.onerror = (e) => {
          reject(requestBom.statusText);
        };
        requestBom.send(null);
      });

      // get purchase
      let purchasePromise = new Promise(function (resolve, reject) {
        var requestPurchase = new XMLHttpRequest();
        var url =
          "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/Cjr8ha0sgruok39qjnvdni5k11r/FactData";
        requestPurchase.open("GET", url, true);
        //requestPurchase.setRequestHeader("Authorization", "Bearer " + token);
        requestPurchase.onload = (e) => {
          purList = JSON.parse(requestPurchase.responseText).value;
          resolve(true);
        };
        requestPurchase.onerror = (e) => {
          reject(requestPurchase.statusText);
        };
        requestPurchase.send(null);
      });

      // get material master data service
      let materialPromise = new Promise(function (resolve, reject) {
        var requestMatMaster = new XMLHttpRequest();
        var url =
          "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/Cg7geq0sgrstd2l1o5subvs16n/NTT_CW_MATERIALMaster";

        requestMatMaster.open("GET", url, true);
        //requestMatMaster.setRequestHeader("Authorization", "Bearer " + token);
        requestMatMaster.onload = (e) => {
          matList = JSON.parse(requestMatMaster.responseText).value;
          resolve(true);
        };
        requestMatMaster.onerror = (e) => {
          reject(requestMatMaster.statusText);
        };
        requestMatMaster.send(null);
      });

      // get component master data service
      let componentPromise = new Promise(function (resolve, reject) {
        var requestComponentMaster = new XMLHttpRequest();
        var url =
          "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/Cc5keq0sgrh7u1h1dnbh4nnn365/NTT_CW_COMPONENTMaster";
        requestComponentMaster.open("GET", url, true);
        //requestComponentMaster.setRequestHeader("Authorization", "Bearer " + token);
        requestComponentMaster.onload = (e) => {
          resolve(true);
          compList = JSON.parse(requestComponentMaster.responseText).value;
        };
        requestComponentMaster.onerror = (e) => {
          reject(requestComponentMaster.statusText);
        };
        requestComponentMaster.send(null);
      });

      // get sales service
      let salesPromise = new Promise(function (resolve, reject) {
        var requestSales = new XMLHttpRequest();
        var url =
          "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/Cg7geq0sgrstd2l1o5subvs16n/FactData";
        requestSales.open("GET", url, true);
        //requestSales.setRequestHeader("Authorization", "Bearer " + token);
        requestSales.onload = (e) => {
          salesList = salesList = JSON.parse(requestSales.responseText).value;
          resolve(true);
        };

        requestSales.onerror = (e) => {
          creject(onsole.error(requestSales.statusText));
        };
        requestSales.send(null);
      });

      // get version master data service

      let versionPromise = new Promise(function (resolve, reject) {
        var requestVersionMaster = new XMLHttpRequest();
        var url =
          "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/Cg7geq0sgrstd2l1o5subvs16n/VersionMaster";
        requestVersionMaster.open("GET", url, true);
        //requestVersionMaster.setRequestHeader( "Authorization", "Bearer " + token );
        requestVersionMaster.onload = (e) => {
          versionList = JSON.parse(requestVersionMaster.responseText).value;
          resolve(true);
        };
        requestVersionMaster.onerror = (e) => {
          reject(requestVersionMaster.statusText);
        };
        requestVersionMaster.send(null);
      });

      await Promise.all([
        bomPromise,
        materialPromise,
        componentPromise,
        purchasePromise,
      ]).then(async (values) => {
        await this.setBomExp(salesPromise);
      });
    }

    async setSalesMerge() {
      //const formatter = new Intl.NumberFormat("de-DE", {  style: "currency", currency: "USD", });
      //const formatterNumber = new Intl.NumberFormat("de-DE");
      for (let i = 0; i < salesList.length; i++) {
        var lt_cost_list = costList.filter(
          (cost) => cost.NTT_CW_MAIN_MATERIAL == salesList[i].NTT_CW_MATERIAL
        );

        for (let j = 0; j < lt_cost_list.length; j++) {
          var lv_price = 0;
          var cost_amount = 0;
          if (lt_cost_list[j].Mattype != "Z013") {
            var ls_pur = purList.filter(
              (e) =>
                e.NTT_CW_COMPONENT == lt_cost_list[j].NTT_CW_COMPONENT &&
                e.Date == salesList[i].Date
            );
            if (ls_pur.length != 0) {
              lv_price = ls_pur[0].SignedData;
              cost_amount =
                salesList[i].SignedData * lt_cost_list[j].SignedData * lv_price;
                cost_amount = Math.round(cost_amount * 100) / 100;
            }
          }
          costListFinal.push({
            NTT_CW_MAIN_MATERIAL: lt_cost_list[j].NTT_CW_MAIN_MATERIAL,
            NTT_CW_MATERIAL: lt_cost_list[j].NTT_CW_MATERIAL,
            NTT_CW_MATERIALDESC: lt_cost_list[j].NTT_CW_MATERIALDESC,
            NTT_CW_COMPONENT: lt_cost_list[j].NTT_CW_COMPONENT,
            NTT_CW_COMPONENTDESC: lt_cost_list[j].NTT_CW_COMPONENTDESC,
            Mattype: lt_cost_list[j].Mattype,
            VersionMbr: "public.2023V01",
            DateMonth: salesList[i].Date,
            SalesQuantity: salesList[i].SignedData ,
            bomQuantity: lt_cost_list[j].SignedData,
            quantiy: Math.round(salesList[i].SignedData * lt_cost_list[j].SignedData*100)/ 100,
            SignedData: cost_amount,
            purchase: lv_price,
          });
        }
      }
    }

    async setBomExp(salesPromise) {
      for (let i = 0; i < matList.length; i++) {
        var materialId = matList[i].ID;
        if (materialId == "#") continue;
        // bom level
        this.getLevelBom(materialId, materialId, matList[i].Description, 1);
      }

      await Promise.all([salesPromise]).then(async (values) => {
        await this.setSalesMerge();
      });

      //this.setSalesMerge();
    }
    getLevelBom(mainMat, materialId, desc, bomQuantity) {
      // get bom component
      var lt_bom_list = bomlist.filter(
        (bom) =>
          bom.Version == "public.Actual" && bom.NTT_CW_MATERIAL == materialId
      );

      for (let i = 0; i < lt_bom_list.length; i++) {
        var componentId = lt_bom_list[i].NTT_CW_COMPONENT;
        var quantity = lt_bom_list[i].SignedData;
        var ls_comp = compList.filter((e) => e.ID == componentId);

        if (ls_comp == undefined) continue;
        var mattype = ls_comp[0].NTT_CW_MATTYPE;

        costList.push({
          NTT_CW_MAIN_MATERIAL: mainMat,
          NTT_CW_MATERIAL: materialId,
          NTT_CW_MATERIALDESC: desc,
          NTT_CW_COMPONENT: componentId,
          NTT_CW_COMPONENTDESC: ls_comp[0].Description,
          SignedData: bomQuantity * quantity,
          Mattype: mattype,
        });
        // semi material
        if (mattype == "Z013") {
          this.getLevelBom(
            mainMat,
            componentId,
            ls_comp[0].Description,
            quantity
          );
        }
        // push variable
      }
    }

    get costList() {
      return costListFinal;
    }
  }

  customElements.define("calculate-bom", bomExp);

})();
