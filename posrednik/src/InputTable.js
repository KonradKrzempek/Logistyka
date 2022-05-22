let nOfSuppliers = 2;
let nOfRecipients = 3;

function spawnInputForm(containerId) {
    let divInputForm = document.createElement("div");

    let tableTransportCost = document.createElement("table");
    tableTransportCost.id = "tableTransportCost";

    /* ===================== Dostawcy ======================== */
    let tableSuppliers = document.createElement("table");
    tableSuppliers.id = "tableSuppliers";

    let bAddSupplier = document.createElement("button");
    bAddSupplier.innerHTML = "dodaj dostawcę";
    bAddSupplier.onclick = function() {
        addRowIntoTable(tableSuppliers, ["D" + nOfSuppliers, "Dpodaz" + nOfSuppliers, "Dkoszt" + nOfSuppliers], "input");
        nOfSuppliers++;
        updateTransportCostTable(tableTransportCost);
    }
    divInputForm.appendChild(bAddSupplier);

    let bRemoveSupplier = document.createElement("button");
    bRemoveSupplier.innerHTML = "usuń dostawcę";
    bRemoveSupplier.onclick = function() {
        removeLastEntryFromTable("tableSuppliers");
        nOfSuppliers--;
        if(nOfSuppliers < 0) nOfSuppliers = 0;
        updateTransportCostTable(tableTransportCost);
    }
    divInputForm.appendChild(bRemoveSupplier);

    addRowIntoTable(tableSuppliers, ["nr dostawcy", "podaż", "koszt zakupu"], "th");
    for(let i = 0; i < nOfSuppliers; i++) {
        addRowIntoTable(tableSuppliers, ["D" + i, "Dpodaz" + i, "Dkoszt" + i], "input"); 
    }
    divInputForm.appendChild(tableSuppliers);

    /* ===================== Odbiorcy ======================== */
    let tableRecipients = document.createElement("table");
    tableRecipients.id = "tableRecipients";

    let bAddReciepent = document.createElement("button");
    bAddReciepent.innerHTML = "dodaj odbiorcę";
    bAddReciepent.onclick = function() {
        addRowIntoTable(tableRecipients, ["O" + nOfRecipients, "Opopyt" + nOfRecipients, "Okoszt" + nOfRecipients], "input");
        nOfRecipients++;
        updateTransportCostTable(tableTransportCost);
    }
    divInputForm.appendChild(bAddReciepent);

    let bRemoveReciepent = document.createElement("button");
    bRemoveReciepent.innerHTML = "usuń odbiorcę";
    bRemoveReciepent.onclick = function() {
        removeLastEntryFromTable("tableRecipients");
        nOfRecipients--;
        if(nOfRecipients < 0) nOfRecipients = 0;
        updateTransportCostTable(tableTransportCost);
    }
    divInputForm.appendChild(bRemoveReciepent);

    addRowIntoTable(tableRecipients, ["nr odbiorcy", "popyt", "cena sprzedaży"], "th");
    for(let i = 0; i < nOfRecipients; i++) {
        addRowIntoTable(tableRecipients, ["O" + i, "Opopyt" + i, "Okoszt" + i], "input");
    }
    divInputForm.appendChild(tableRecipients);

    updateTransportCostTable(tableTransportCost);
    divInputForm.appendChild(tableTransportCost);
    
    document.getElementById(containerId).appendChild(divInputForm);
}

function addRowIntoTable(table, data, type) {
    let tr = document.createElement("tr");
    if(type === "th") {
        for(let i = 0; i < data.length; i++) {
            let th = document.createElement("th");
            th.innerHTML = data[i];
            tr.appendChild(th);
        }
    }

    if(type === "input") {
        let th = document.createElement("th");
        th.innerHTML = data[0];
        tr.appendChild(th);

        for(let i = 1; i < data.length; i++) {
            let td = document.createElement("td");
            let input = document.createElement("input");
            input.type = "number";
            input.min = 0;
            input.defaultValue = 0;
            input.id = data[i];

            td.appendChild(input);
            tr.appendChild(td);
        }
    }

    if(type === "td") {
        for(let i = 0; i < data.length; i++) {
            let td = document.createElement("td");
            td.innerHTML = data[i];
            tr.appendChild(td);
        }
    }

    table.appendChild(tr);
}

function removeLastEntryFromTable(tableId) {
    let table = document.getElementById(tableId);
    if(table.childNodes.length > 1) {
        table.removeChild(table.lastChild)
    }
}

function updateTransportCostTable(tableTransportCost) {
    while(tableTransportCost.childNodes.length > 0) {
        tableTransportCost.removeChild(tableTransportCost.lastChild);
    }

    let data = [""];
    for(let i = 0; i < nOfRecipients; i++) {
        data.push("O" + i);
    }
    addRowIntoTable(tableTransportCost, data, "th");

    let id = 0;
    for(let i = 0; i < nOfSuppliers; i++) {
        let newData = ["D" + i];
        for(let j = 0; j < nOfRecipients; j++) {
            newData.push(i + "-" + j);
        }
        addRowIntoTable(tableTransportCost, newData, "input");
        id++;
    }
}