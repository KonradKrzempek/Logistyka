let gainTableId = "gainTable";
let resTableId = "resTable";
function createTables(containerId) {
    let pUnitaryGain = document.createElement("p");
    pUnitaryGain.innerHTML = "Unitary gain";
    document.getElementById(containerId).appendChild(pUnitaryGain);

    let gainTable = document.createElement("table");
    gainTable.id = gainTableId;
    document.getElementById(containerId).appendChild(gainTable);

    let pWynik = document.createElement("p");
    pWynik.innerHTML = "tabela wynikowa";
    document.getElementById(containerId).appendChild(pWynik);

    let resTable = document.createElement("table");
    resTable.id = resTableId;
    document.getElementById(containerId).appendChild(resTable);

    let pKosztCalkowity = document.createElement("p");
    pKosztCalkowity.id = "pKosztCalkowity";
    document.getElementById(containerId).appendChild(pKosztCalkowity);

    let pPrzychodCalkowity = document.createElement("p");
    pPrzychodCalkowity.id = "pPrzychodCalkowity";
    document.getElementById(containerId).appendChild(pPrzychodCalkowity);

    let pZyskPosrednika = document.createElement("p");
    pZyskPosrednika.id = "pZyskPosrednika";
    document.getElementById(containerId).appendChild(pZyskPosrednika);
}

function updateGainTable(gainTable) {
    let table = document.getElementById(gainTableId);

    while(table.childNodes.length > 0) {
        table.removeChild(table.lastChild);
    }

    let data = [""];
    for(let i = 0; i < nOfRecipients; i++) {
        data.push("O" + i);
    }
    addRowIntoTable(table, data, "th");

    for(let i = 0; i < nOfSuppliers; i++) {
        let newData = ["D"+i];
        for(let j = 0; j < nOfRecipients; j++) {
            newData.push(gainTable[i][j]);
        }
        addRowIntoTable(table,newData,"td");
    }
}

function updateResTable(resTable) {
    let table = document.getElementById(resTableId);

    while(table.childNodes.length > 0) {
        table.removeChild(table.lastChild);
    }

    let data = [""];
    for(let i = 0; i < nOfRecipients; i++) {
        data.push("O" + i);
    }
    data.push("FO");
    addRowIntoTable(table, data, "th");

    for(let i = 0; i < nOfSuppliers; i++) {
        let newData = ["D" + i];
        for(let j = 0; j < nOfRecipients + 1; j++) {
            newData.push(resTable[i*(nOfRecipients + 1) + j]);
        }
        addRowIntoTable(table, newData, "td");
    }
    let newData = ["FD"];
    for(let j = 0; j < nOfRecipients + 1; j++) {
        newData.push(resTable[nOfSuppliers*(nOfRecipients + 1) + j]);
    }
    addRowIntoTable(table, newData, "td");
}

function fillInKosztCalkowity(resTable, arraySuppliersCosts) {
    let suma = 0;
    for(let i = 0; i < resTable.length; i++) {
        if(resTable[i] === "X") continue;
        if(i >= nOfSuppliers * (nOfRecipients + 1)) continue;
        if(i%(nOfRecipients+1) === nOfRecipients) continue;
        
        suma += resTable[i] * arraySuppliersCosts[Math.floor(i/(nOfRecipients+1))];
    }

    document.getElementById("pKosztCalkowity").innerHTML = "koszt całkowity kupna u dostawców: " + suma;
}

function fillInPrzychodCalkowity(resTable, arrayRecipientsCosts) {
    let suma = 0;
    for(let i = 0; i < resTable.length; i++) {
        if(resTable[i] === "X") continue;
        if(i >= nOfSuppliers * (nOfRecipients + 1)) continue;
        if(i%(nOfRecipients+1) === nOfRecipients) continue;
        
        suma += resTable[i] * arrayRecipientsCosts[i%(nOfRecipients + 1)];
    }

    document.getElementById("pPrzychodCalkowity").innerHTML = "przychód całkowity otrzymany od odbiorców: " + suma;
}

function fillInZyskPosrednika(resTable, unitaryGainTable) {
    let suma = 0;
    for(let i = 0; i < resTable.length; i++) {
        if(resTable[i] === "X") continue;
        if(i >= nOfSuppliers * (nOfRecipients + 1)) continue;
        if(i%(nOfRecipients+1) === nOfRecipients) continue;
        
        suma += resTable[i] * unitaryGainTable[Math.floor(i/(nOfRecipients + 1))][i%(nOfRecipients+1)];
    }

    document.getElementById("pZyskPosrednika").innerHTML = "całkowity zysk pośrednika: " + suma;
}