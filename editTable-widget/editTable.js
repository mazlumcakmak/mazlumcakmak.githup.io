function functionName() {

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
    token = response.access_token;
    var requestMatMaster = new XMLHttpRequest();
    var url =
        "https://itelligencegroup-4.eu10.hcs.cloud.sap/api/v1/dataexport/providers/sac/Cg7geq0sgrstd2l1o5subvs16n/NTT_CW_MATERIALMaster";

    requestMatMaster.open("GET", url, false);
    requestMatMaster.setRequestHeader("Authorization", "Bearer " + token);
    requestMatMaster.send(null);
    var matList = JSON.parse(requestMatMaster.responseText).value;
    console.log("matList", matList);
    var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    var thead = document.createElement('thead');
    document.getElementById('myTable').appendChild(thead);
    debugger;
    var headerList = Object.keys(matList[0]);
    console.log("headerList",headerList);

    

    for (let i = 0; i < matList.length; i++) {
        var newRow = tbodyRef.insertRow();


        var newCell = newRow.insertCell();
        var newText = document.createTextNode(matList[i].ID);
        var newCell2 = newRow.insertCell();
        var newText2 = document.createTextNode(matList[i].Description);
        var newCell3 = newRow.insertCell();
        var newText3 = document.createTextNode(matList[i].NTT_CW_MATGRP);
        newCell2.setAttribute('contenteditable', 'true');
        newCell3.setAttribute('contenteditable', 'true');
        newCell.appendChild(newText);
        newCell2.appendChild(newText2);
        newCell3.appendChild(newText3);


    }

    for (let j = 0; j < headerList.length; j++) {

        thead.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(headerList[j]));

    }

}