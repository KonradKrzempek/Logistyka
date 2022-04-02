let tablicaCzynnosci = [
    {czynnosc: "A", czas: 5, poprzedniki: [], nastepniki: []},
    {czynnosc: "B", czas: 3, poprzedniki: ["A"], nastepniki: []},
    {czynnosc: "C", czas: 4, poprzedniki: [], nastepniki: []},
    {czynnosc: "D", czas: 6, poprzedniki: ["A"], nastepniki: []},
    {czynnosc: "E", czas: 4, poprzedniki: ["D"], nastepniki: []},
    {czynnosc: "F", czas: 3, poprzedniki: ["B", "C", "D"], nastepniki: []}
];
let wszystkieSciezki = [];

function skryptStartowy() {
    liczWszystko();
    
    for(let i = 0; i < tablicaCzynnosci.length; i++) {
        dodajWierszTabeli(tablicaCzynnosci[i].czynnosc, tablicaCzynnosci[i].czas, tablicaCzynnosci[i].poprzedniki);
    }
}

function dodajWierszTabeli(czynnosc, czas, poprzednicy) {
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

    uzupelnijNastepniki(tablicaCzynnosci);
    console.log("tablicaCzynnosci", tablicaCzynnosci);

    let sciezkiPoczatkowe = znajdzSciezkiPoczatkowe(tablicaCzynnosci);
    console.log("sciezkiPoczatkowe", sciezkiPoczatkowe);

    wszystkieSciezki = znajdzWszystkieSciezki(tablicaCzynnosci, sciezkiPoczatkowe);
    console.log("wszystkieSciezki", wszystkieSciezki);
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
    
    dodajWierszTabeli(czynnosc, czas_trwania, arrDane);
    tablicaCzynnosci.push({czynnosc: czynnosc, czas: parseInt(czas_trwania), poprzedniki: arrDane, nastepniki: [] });

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

function policzSciecke() {
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