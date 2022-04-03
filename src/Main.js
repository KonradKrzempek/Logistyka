let tablicaCzynnosci = [
    {czynnosc: "A", czas: 5, poprzedniki: [], nastepniki: [], zdarzeniePrzed: null, zdarzeniePo: null },
    {czynnosc: "B", czas: 3, poprzedniki: ["A"], nastepniki: [], zdarzeniePrzed: null, zdarzeniePo: null },
    {czynnosc: "C", czas: 4, poprzedniki: [], nastepniki: [], zdarzeniePrzed: null, zdarzeniePo: null },
    {czynnosc: "D", czas: 6, poprzedniki: ["A"], nastepniki: [], zdarzeniePrzed: null, zdarzeniePo: null },
    {czynnosc: "E", czas: 4, poprzedniki: ["D"], nastepniki: [], zdarzeniePrzed: null, zdarzeniePo: null },
    {czynnosc: "F", czas: 3, poprzedniki: ["B", "C"], nastepniki: [], zdarzeniePrzed: null, zdarzeniePo: null }
];
let wszystkieSciezki = [];
let tablicaZdarzen = [];
let indexOstatniegoZdarzenia = null;

function skryptStartowy() {
    liczWszystko();
    
    for(let i = 0; i < tablicaCzynnosci.length; i++) {
        dodajWierszTabeliCzynnosc(tablicaCzynnosci[i].czynnosc, tablicaCzynnosci[i].czas, tablicaCzynnosci[i].poprzedniki);
    }
}

function dodajWierszTabeliCzynnosc(czynnosc, czas, poprzednicy) {
    let tabela = document.getElementById("czynnosci");
    let tr = document.createElement("tr");

    let tds = [];
    for(let i = 0; i < 3; i++) {
        tds[i] = document.createElement("td");
    }
    tds[0].innerHTML = czynnosc;
    tds[1].innerHTML = czas;
    
    tds[2].innerHTML = "";
    for(let i = 0; i < poprzednicy.length; i++) {
        tds[2].innerHTML += poprzednicy[i];
        if(i < poprzednicy.length - 1) {
            tds[2].innerHTML += ", ";
        }
    }

    tr.appendChild(tds[0]);
    tr.appendChild(tds[1]);
    tr.appendChild(tds[2]);
    tabela.appendChild(tr);
}

function liczWszystko() {
    wszystkieSciezki = [];
    indexOstatniegoZdarzenia = null;

    uzupelnijNastepniki(tablicaCzynnosci);
    console.log("tablicaCzynnosci", tablicaCzynnosci);

    let sciezkiPoczatkowe = znajdzSciezkiPoczatkowe(tablicaCzynnosci);
    console.log("sciezkiPoczatkowe", sciezkiPoczatkowe);

    wszystkieSciezki = znajdzWszystkieSciezki(tablicaCzynnosci, sciezkiPoczatkowe);
    console.log("wszystkieSciezki", wszystkieSciezki);

    tablicaZdarzen = liczZdarzenia(tablicaCzynnosci, sciezkiPoczatkowe);
    policzCzasyZdarzen(tablicaZdarzen, tablicaCzynnosci);
    console.log("tablicaZdarzen", tablicaZdarzen);

    let zdarzenia = document.getElementById("zdarzenia");
    while(zdarzenia.children.length > 1) {
        zdarzenia.removeChild(zdarzenia.lastChild);
    }
    wypiszZdarzenia(tablicaZdarzen);
}

function znajdzIndexElementu(tablica, element) {
    for(let i = 0; i < tablica.length; i++) {
        if(tablica[i].czynnosc == element) return i;
    }
    return undefined;
}

function uzupelnijNastepniki(tablica) {    
    console.log("tablica: ", tablica);
    for(let i = 0; i < tablica.length; i++) {
        tablica[i].nastepniki = [];
    }
    for(let i = 0; i < tablica.length; i++) {
        for(let j = 0; j < tablica[i].poprzedniki.length; j++) {
            let index = znajdzIndexElementu(tablica, tablica[i].poprzedniki[j]);
            tablica[index].nastepniki.push(tablica[i].czynnosc);
        }
    }
}

function znajdzSciezkiPoczatkowe(tablica) {
    let result = [];

    for(let i = 0; i < tablica.length; i++) {
        if(tablica[i].poprzedniki.length == 0) result.push(tablica[i].czynnosc);
    }

    return result;
}

function znajdzSciezki(tablica, index, a, b, result) {
    for(let i = 0; i < tablica[index].nastepniki.length; i++) {
        let index2 = znajdzIndexElementu(tablica, tablica[index].nastepniki[i]);
        b++;
        result[a[0]][b] = tablica[index2].czynnosc;
        if(tablica[index2].nastepniki.length > 0) {
            znajdzSciezki(tablica, index2, a, b, result);
        } else {
            result.push([]);
            a[0]++;
        }
        b--;
    }
}

function poprawSciezki(sciezki) {
    for(let i = 0; i < sciezki.length; i++) {
        for(let j = 0; j < sciezki[i].length; j++) {
            if(sciezki[i][j] == undefined) {
                sciezki[i][j] = sciezki[i - 1][j];
            }
        }
    }
}

function znajdzWszystkieSciezki(tablica, poczatkiSciezek) {
    let result = [];
    result.push([]);
    let a = [0]; // kontroluje którą ścieżkę tworzę
    let b = 0; // kontroluje ile elementów ścieżki przepisać
    for(let i = 0; i < poczatkiSciezek.length; i++) {
        let index = znajdzIndexElementu(tablica, poczatkiSciezek[i]);

        result[a[0]][b] = tablica[index].czynnosc;
        znajdzSciezki(tablica, index, a, b, result);
    }
    result.pop();
    poprawSciezki(result);
    
    return result;
}

function dodawanie_rekordow(){
    let czynnosc, czas_trwania, zdarzenia_poprz;
    czynnosc = document.getElementById("czynnosc").value;
    czynnosc = czynnosc.toUpperCase();
    czas_trwania = document.getElementById("czas_trwania").value;
    zdarzenia_poprz = document.getElementById("zdarzenia_poprz").value;
    
    let arrDane = [];
    
    if (zdarzenia_poprz) {
        let dane = zdarzenia_poprz.replace(/\s+/g, ''); // remove white spaces
        arrDane = dane.split(',');
    }
    
    dodajWierszTabeliCzynnosc(czynnosc, czas_trwania, arrDane);
    tablicaCzynnosci.push({czynnosc: czynnosc, czas: parseInt(czas_trwania), poprzedniki: arrDane, nastepniki: [], zdarzeniePrzed: null, zdarzeniePo: null });

    console.log(document.getElementById("czynnosci").children[0])
}

function znajdzIndexMax(tablica) {
    if(tablica.length < 1) return null;

    let max = tablica[0];
    let indexMax = 0;

    for(let i = 1; i < tablica.length; i++) {
        if(tablica[i] > max) {
            max = tablica[i];
            indexMax = i;
        }
    }
    
    document.getElementById("spanCzasSciezki").innerHTML = max;
    return indexMax;
}

function wpiszSciezke(sciezka) {
    let span = document.getElementById("spanSciezka");
    span.innerHTML = "";

    for(let i = 0; i <sciezka.length;i++) {
        span.innerHTML += sciezka[i];
        if(i < sciezka.length - 1) {
            span.innerHTML += "-";
        }
    }
}

function policzSciezke() {
    liczWszystko();
    let czasySciezek = [];

    for(let i = 0; i < wszystkieSciezki.length; i++) {
        czasySciezek.push(0);

        for(let j = 0; j < wszystkieSciezki[i].length; j++) {
            let index = znajdzIndexElementu(tablicaCzynnosci, wszystkieSciezki[i][j]);
            czasySciezek[i] += tablicaCzynnosci[index].czas;
        }
    }

    max = znajdzIndexMax(czasySciezek);

    wpiszSciezke(wszystkieSciezki[max]);
}

function removeLast() {
    let tabela = document.getElementById("czynnosci");

    if(tabela.children.length > 1) {
        tabela.removeChild(tabela.lastChild);
        tablicaCzynnosci.pop();
    }
}

function liczZdarzenia(tablicaCzynnosci, sciezkiPoczatkowe) {
    let res = [];

    res.push({nr: 0, t0: null, t1: null, L: null, czynnosciPrzed: [], czynnosciZa: sciezkiPoczatkowe, czasyCzynnosciPrzed: [], czasyCzynnosciPo: [] });

    for(let i = 0; i < tablicaCzynnosci.length; i++) {
        if(tablicaCzynnosci[i].poprzedniki.length == 0) {
            tablicaCzynnosci[i].zdarzeniePrzed = 0;
        } else {
            let index = znajdzZdarzeniePrzedCzynnoscia(res, tablicaCzynnosci[i].poprzedniki, tablicaCzynnosci);
            tablicaCzynnosci[i].zdarzeniePrzed = index;
        }

        if(tablicaCzynnosci[i].nastepniki.length == 0) {
            if(indexOstatniegoZdarzenia == null) {
                let index = res.length;
                res.push({nr: index, t0: null, t1: null, L: null, czynnosciPrzed: [], czynnosciZa: [], czasyCzynnosciPrzed: [], czasyCzynnosciPo: []  });
                indexOstatniegoZdarzenia = index;
            }
            tablicaCzynnosci[i].zdarzeniePo = indexOstatniegoZdarzenia;
            res[indexOstatniegoZdarzenia].czynnosciPrzed.push(tablicaCzynnosci[i].czynnosc);
        } else {
            let index = znajdzZdarzeniePoCzynnosci(res, tablicaCzynnosci[i].nastepniki, tablicaCzynnosci);
            tablicaCzynnosci[i].zdarzeniePo = index;
        }
    }

    return res;
}

function znajdzZdarzeniePrzedCzynnoscia(res, poprzedniki, tablicaCzynnosci) {
    for(let i = 0; i < res.length; i++) {
        for(let j = 0; j < res[i].czynnosciPrzed.length; j++) {
            for(let k = 0; k < poprzedniki.length; k++) {
                if(res[i].czynnosciPrzed[j] == poprzedniki[k]) {
                    return i;
                }
            }
        }
    }

    let nastepnikiPoprzednika = tablicaCzynnosci[znajdzIndexElementu(tablicaCzynnosci, poprzedniki[0])].nastepniki;

    let index = res.length;
    res.push({nr: index, t0: null, t1: null, L: null, czynnosciPrzed: poprzedniki, czynnosciZa: nastepnikiPoprzednika, czasyCzynnosciPrzed: [], czasyCzynnosciPo: [] });
    return index;
}

function znajdzZdarzeniePoCzynnosci(res, nastepniki, tablicaCzynnosci) {
    for(let i = 0; i < res.length; i++) {
        for(let j = 0; j < res[i].czynnosciZa.length; j++) {
            for(let k = 0; k < nastepniki.length; k++) {
                if(res[i].czynnosciZa[j] == nastepniki[k]) {
                    return i;
                }
            }
        }
    }
    
    let poprzednikiNastepnika = tablicaCzynnosci[znajdzIndexElementu(tablicaCzynnosci, nastepniki[0])].poprzedniki;

    let index = res.length;
    res.push({nr: index, t0: null, t1: null, L: null, czynnosciPrzed: poprzednikiNastepnika, czynnosciZa: nastepniki, czasyCzynnosciPrzed: [], czasyCzynnosciPo: [] });
    return index;
}

function policzCzasyZdarzen(tablicaZdarzen, tablicaCzynnosci) {
    tablicaZdarzen[0].t0 = 0;
    for(let i = 0; i < tablicaZdarzen[0].czynnosciZa.length; i++) {
        liczCzast0(tablicaCzynnosci, tablicaZdarzen, tablicaCzynnosci[znajdzIndexElementu(tablicaCzynnosci, tablicaZdarzen[0].czynnosciZa[i])], tablicaZdarzen[0].t0);
    }

    tablicaZdarzen[indexOstatniegoZdarzenia].t1 = tablicaZdarzen[indexOstatniegoZdarzenia].t0;
    
    for(let i = 0; i < tablicaZdarzen[indexOstatniegoZdarzenia].czynnosciPrzed.length; i++) {
        liczCzast1(tablicaCzynnosci, tablicaZdarzen, tablicaCzynnosci[znajdzIndexElementu(tablicaCzynnosci, tablicaZdarzen[indexOstatniegoZdarzenia].czynnosciPrzed[i])], tablicaZdarzen[indexOstatniegoZdarzenia].t1);
    }

    for(let i = 0; i < tablicaZdarzen.length; i++) {
        tablicaZdarzen[i].L = tablicaZdarzen[i].t1 - tablicaZdarzen[i].t0;
    }
}

function liczCzast0(tablicaCzynnosci, tablicaZdarzen, czynnosc, czas) {
    let index = czynnosc.zdarzeniePo;
    tablicaZdarzen[index].czasyCzynnosciPrzed.push(czas + czynnosc.czas);

    let var1 = tablicaZdarzen[index].czasyCzynnosciPrzed.length;
    let var2 = tablicaZdarzen[index].czynnosciPrzed.length;

    if(var1 == var2) {
        tablicaZdarzen[index].t0 = Math.max.apply(null, tablicaZdarzen[index].czasyCzynnosciPrzed);
        for(let i = 0; i < tablicaZdarzen[index].czynnosciZa.length; i++) {
            liczCzast0(tablicaCzynnosci, tablicaZdarzen, tablicaCzynnosci[znajdzIndexElementu(tablicaCzynnosci, tablicaZdarzen[index].czynnosciZa[i])], tablicaZdarzen[index].t0);
        }
    }
}

function liczCzast1(tablicaCzynnosci, tablicaZdarzen, czynnosc, czas) {
    let index = czynnosc.zdarzeniePrzed;
    tablicaZdarzen[index].czasyCzynnosciPo.push(czas - czynnosc.czas);

    let var1 = tablicaZdarzen[index].czasyCzynnosciPo.length;
    let var2 = tablicaZdarzen[index].czynnosciZa.length;

    if(var1 == var2) {
        tablicaZdarzen[index].t1 = Math.min.apply(null, tablicaZdarzen[index].czasyCzynnosciPo);
        for(let i = 0; i < tablicaZdarzen[index].czynnosciPrzed.length; i++) {
            liczCzast1(tablicaCzynnosci, tablicaZdarzen, tablicaCzynnosci[znajdzIndexElementu(tablicaCzynnosci, tablicaZdarzen[index].czynnosciPrzed[i])], tablicaZdarzen[index].t1);
        }
    }
}

function wypiszZdarzenia(tablicaZdarzen) {
    for(let i = 0; i < tablicaZdarzen.length; i++) {
        dodajWierszTabeli("zdarzenia", [i, tablicaZdarzen[i].t0, tablicaZdarzen[i].t1, tablicaZdarzen[i].L]);
    }
}

function dodajWierszTabeli(idTabeli, dane) {
    let tabela = document.getElementById(idTabeli);

    let tr = document.createElement("tr");

    let tds = [];
    for(let i = 0; i < dane.length; i++) {
        tds[i] = document.createElement("td");
        tds[i].innerHTML = dane[i];
        tr.appendChild(tds[i]);
    }

    tabela.appendChild(tr);
}