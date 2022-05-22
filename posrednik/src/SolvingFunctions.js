function spawnSolveButton(containerId) {
    let bt = document.createElement("button");
    bt.innerHTML = "Licz wszystko";
    bt.onclick = function() {
        solveEverything();
    }

    document.getElementById(containerId).appendChild(bt);
}

function solveEverything() {
    let arrayTransportCosts = readTransportCosts();
    let arraySuppliersCosts = readSuppliersCosts();
    let arrayRecipientsCosts = readRecipientsCosts();

    // TODO - brakuje sprawdzania poprawności formatu danych(liczby)

    let unitaryGainTable = calculateUnitaryGains(arrayTransportCosts, arraySuppliersCosts, arrayRecipientsCosts);
    console.log("unitaryGainTable", unitaryGainTable);

    // TODO - ta tabela, koszt całkowity, przychód całkowity, zysk pośrednika i poprawić wygląd.
    let supply = readSupply();
    let demand = readDemand();
    let optimalTransportTable = calculateOptimalTransportTable(unitaryGainTable, supply, demand);
    console.log("optimalTransportTable", optimalTransportTable);
}

function readTransportCosts() {
    let res = [];

    for(let i = 0; i < nOfSuppliers; i++) {
        let newRow = [];
        for(let j = 0; j < nOfRecipients; j++) {
            let id = i + "-" + j;

            let value = parseInt(document.getElementById(id).value);

            newRow.push(value);
        }
        res.push(newRow);
    }

    return res;
}

function readSuppliersCosts() {
    let res = [];
    for(let i = 0; i < nOfSuppliers; i++) {
        let id = "Dkoszt" + i;

        let value = parseInt(document.getElementById(id).value);

        res.push(value);
    }
    return res;
}

function readRecipientsCosts() {
    let res = [];
    for(let i = 0; i < nOfRecipients; i++) {
        let id = "Okoszt" + i;

        let value = parseInt(document.getElementById(id).value);

        res.push(value);
    }
    return res;
}

function calculateUnitaryGains(arrayTransport, arraySuppliers, arrayRecipents) {
    let res = [];

    for(let i = 0; i < nOfSuppliers; i++) {
        res.push([]);

        for(let j = 0; j < nOfRecipients; j++) {
            res[i][j] = arrayRecipents[j] - arrayTransport[i][j] - arraySuppliers[i];
        }
    }

    return res;
}

function readSupply() {
    let res = [];
    for(let i = 0; i < nOfSuppliers; i++) {
        let id = "Dpodaz" + i;

        let value = parseInt(document.getElementById(id).value);

        res.push(value);
    }
    return res;
}

function readDemand() {
    let res = [];
    for(let i = 0; i < nOfRecipients; i++) {
        let id = "Opopyt" + i;

        let value = parseInt(document.getElementById(id).value);

        res.push(value);
    }
    return res;
}

function calculateOptimalTransportTable(unitaryGainTable, supplyTable, demandTable) {
    console.log("supplyTable", supplyTable);
    console.log("demandTable", demandTable);
    console.log("unitaryGainTable", unitaryGainTable);

    let M = nOfSuppliers + 1;
    let N = nOfRecipients + 1;
    let unitaryGainTableExtra = expandUnitaryGainTable(unitaryGainTable, M, N);
    console.log("unitaryGainTableExtra", unitaryGainTableExtra);

    let resultTable = solveFirstStep(unitaryGainTableExtra, supplyTable, demandTable, M, N);

    // TODO teraz jakiś check czy jest zoptymalizowana, jeśli nie to optymalizować dalej
    let maxLimit = 10;
    while(maxLimit) {
        let alfas = [0];
        let betas = [];

        fillInAlfasAndBetas(resultTable, unitaryGainTableExtra, alfas, betas, M, N);

        console.log("alfas", alfas);
        console.log("betas", betas);
        if(alfas.length != M || betas.length != N) {
            console.warn("coś z alfa/beta się nie zgadza");
            break;
        }

        let checkTab = [];
        for(let i = 0; i < M; i++) {
            for(let j = 0; j < N; j++) {
                if(resultTable[i*N+j] != "X") {
                    checkTab[i*N+j] = "X";
                } else {
                    checkTab[i*N+j] = unitaryGainTableExtra[i*N+j] - alfas[i] - betas[j];
                }
            }
        }
        console.log("checkTab", checkTab);

        let bCheck = true;
        for(let i = 0; i < M*N; i++) {
            if(checkTab[i] == "X") continue;
            if(checkTab[i] > 0) {
                bCheck = false;
                break;
            }
        }

        if(bCheck) {
            console.warn("Wszystko poprawnie");
            break;
        }

        // poprawa tabelki
        let maxIndex = findMaxValueIndex(checkTab);


        // if(check()) {
        //     correctIt();
        // } else {
        //     break;
        // }
        maxLimit--;
    }

    return resultTable;
}

function expandUnitaryGainTable(unitaryGainTable, M, N) {
    let res = [];
    for(let i = 0; i < M; i++) {
        for(let j = 0; j < N; j++) {
            if(i < M-1 && j < N - 1) {
                res[i*N+j] = unitaryGainTable[i][j];
            } else {
                res[i*N+j] = 0;
            }
        }
    }
    return res;
}

function solveFirstStep(unitaryGainTableExtra, supplyTable, demandTable, M, N) {
    let res = [];

    let supplyTableExtra = supplyTable.slice();
    supplyTableExtra.push(demandTable.reduce(function(accumVariable, curValue) { // dodanie ostatniego elementu będącego sumą elementów tabeli demand 
        return accumVariable + curValue
        }, 0));

    let demandTableExtra = demandTable.slice();
    demandTableExtra.push(supplyTable.reduce(function(accumVariable, curValue) { // dodanie ostatniego elementu będącego sumą elementów tabeli supply 
        return accumVariable + curValue
        }, 0));


    for(let i = 0; i < M; i++) {
        for(let j = 0; j < N; j++) {
            res[i*N+j] = "O";
        }
    }
    while(true) {
        let maxIndex = findValidMaxValueIndex(unitaryGainTableExtra, res, M, N);
        if(maxIndex === -1) break;

        let tempI = Math.floor(maxIndex / N); // supplyExtra
        let tempJ = maxIndex % N; // demandExtra

        if(supplyTableExtra[tempI] > demandTableExtra[tempJ]) {
            res[maxIndex] = demandTableExtra[tempJ];
        } else {
            res[maxIndex] = supplyTableExtra[tempI];
        }
        supplyTableExtra[tempI] -= res[maxIndex];
        demandTableExtra[tempJ] -= res[maxIndex];

        if(supplyTableExtra[tempI] === 0) {
            for(let i = 0; i < N; i++) {
                if(res[tempI*N+i] === "O") {
                    res[tempI*N+i] = "X";
                }
            }
        }
        if(demandTableExtra[tempJ] === 0) {
            for(let i = 0; i < M; i++) {
                if(res[i*N+tempJ] === "O") {
                    res[i*N+tempJ] = "X";
                }
            }
        }
    }

    return res;
}

function findValidMaxValueIndex(unitaryGainTableExtra, res, M, N) {
    let maxIndex = -1;

    for(let i = 0; i < M; i++) {
        for(let j = 0; j < N; j++) {
            if(maxIndex === -1) {
                if(res[i*N+j] === "O") {
                    maxIndex = i*N+j;
                }
            } else {
                if(res[i*N+j] === "O" && unitaryGainTableExtra[maxIndex] < unitaryGainTableExtra[i*N+j]) {
                    maxIndex = i*N+j;
                }
            }
        }
    }
    return maxIndex;
}

function fillInAlfasAndBetas(resultTable, unitaryGainTableExtra, alfas, betas, M, N) {
    for(let a = 0; a < M || a < N; a++) {
        for(let i = 0; i < M; i++) {
            if(alfas[i] == undefined) continue;
            for(let j = 0; j < N; j++) {
                if(resultTable[i*N+j] === "X") continue;
                betas[j] = unitaryGainTableExtra[i*N+j] - alfas[i];
            }
        }
        for(let j = 0; j < N; j++) {
            if(betas[j] == undefined) continue;
            for(let i = 0; i < M; i++) {
                if(resultTable[i*N+j] === "X") continue;
                alfas[i] = unitaryGainTableExtra[i*N+j] - betas[j];
            }
        }
    }
}

function findMaxValueIndex(tab) {
    let max = -1;
    for(let i = 0; i < tab.length; i++) {
        if(max == -1) {
            if(tab[i] != "X") {
                max = i;
            }
        } else {
            if(tab[i] != "X" && tab[i] > tab[max]) {
                max = i;
            }
        }
    }
    return max;
}