let nOfSuppliers = 2;
let nOfRecipients = 3;

function spawnInputForm() {
    let divInputForm = document.createElement("div");
    let tableSuppliers = document.createElement("table");
    tableSuppliers.id = "tableSuppliers";
    let tableRecipients = document.createElement("table");
    tableRecipients.id = "tableRecipients";

    let bAddSupplier = document.createElement("button");
    bAddSupplier.innerHTML = "dodaj dostawcę";
    bAddSupplier.onclick = function() {
        addRowIntoTable(tableSuppliers, ["D" + nOfSuppliers, "Dpodaz" + nOfSuppliers, "Dkoszt" + nOfSuppliers], "input");
        nOfSuppliers++;
    }
    divInputForm.appendChild(bAddSupplier);

    let bRemoveSupplier = document.createElement("button");
    bRemoveSupplier.innerHTML = "usuń dostawcę";
    bRemoveSupplier.onclick = function() {
        removeLastEntryFromTable("tableSuppliers");
        nOfSuppliers--;
        if(nOfSuppliers < 0) nOfSuppliers = 0;
    }
    divInputForm.appendChild(bRemoveSupplier);

    addRowIntoTable(tableSuppliers, ["nr dostawcy", "podaż", "koszt zakupu"], "th");
    for(let i = 0; i < nOfSuppliers; i++) {
        addRowIntoTable(tableSuppliers, ["D" + i, "Dpodaz" + i, "Dkoszt" + i], "input"); 
    }
    divInputForm.appendChild(tableSuppliers);

    let bAddReciepent = document.createElement("button");
    bAddReciepent.innerHTML = "dodaj odbiorcę";
    bAddReciepent.onclick = function() {
        addRowIntoTable(tableRecipients, ["O" + nOfRecipients, "Opopyt" + nOfRecipients, "Okoszt" + nOfRecipients], "input");
        nOfRecipients++;
    }
    divInputForm.appendChild(bAddReciepent);

    let bRemoveReciepent = document.createElement("button");
    bRemoveReciepent.innerHTML = "usuń odbiorcę";
    bRemoveReciepent.onclick = function() {
        removeLastEntryFromTable("tableRecipients");
        nOfRecipients--;
        if(nOfRecipients < 0) nOfRecipients = 0;
    }
    divInputForm.appendChild(bRemoveReciepent);


    addRowIntoTable(tableRecipients, ["nr odbiorcy", "popyt", "cena sprzedaży"], "th");
    for(let i = 0; i < nOfRecipients; i++) {
        addRowIntoTable(tableRecipients, ["O" + i, "Opopyt" + i, "Okoszt" + i], "input");
    }
    divInputForm.appendChild(tableRecipients);

    document.getElementById("container").appendChild(divInputForm);
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
        let td = document.createElement("td");
        td.innerHTML = data[0];
        tr.appendChild(td);

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
    table.appendChild(tr);
}

function removeLastEntryFromTable(tableId) {
    let table = document.getElementById(tableId);
    if(table.childNodes.length > 1) {
        table.removeChild(table.lastChild)
    }
}