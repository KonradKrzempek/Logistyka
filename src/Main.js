function skryptStartowy() {
    let tablicaCzynnosci = [
        {czynnosc: "A", czas: 5, poprzedniki: [], nastepniki: []},
        {czynnosc: "B", czas: 3, poprzedniki: ["A"], nastepniki: []},
        {czynnosc: "C", czas: 4, poprzedniki: [], nastepniki: []},
        {czynnosc: "D", czas: 6, poprzedniki: ["A"], nastepniki: []},
        {czynnosc: "E", czas: 4, poprzedniki: ["D"], nastepniki: []},
        {czynnosc: "F", czas: 3, poprzedniki: ["B", "C", "D"], nastepniki: []}
    ];

    uzupelnijNastepniki(tablicaCzynnosci);
    console.log("tablicaCzynnosci", tablicaCzynnosci);

    let sciezkiPoczatkowe = znajdzSciezkiPoczatkowe(tablicaCzynnosci);
    console.log("sciezkiPoczatkowe", sciezkiPoczatkowe);

    let wszystkieSciezki = znajdzWszystkieSciezki(tablicaCzynnosci, sciezkiPoczatkowe);
    poprawSciezki(wszystkieSciezki);
    console.log("wszystkieSciezki", wszystkieSciezki);
}

function znajdzIndexElementu(tablica, element) {
    for(let i = 0; i < tablica.length; i++) {
        if(tablica[i].czynnosc == element) return i;
    }
    return undefined;
}

function uzupelnijNastepniki(tablica) {
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
        // console.log(tablica[index2].czynnosc, a[0], b);
        if(tablica[index2].nastepniki.length > 0) {
            znajdzSciezki(tablica, index2, a, b, result);
        } else {
            result.push([]);
            a[0]++;
        }
        b--;
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
    return result;
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

// Poznizej jest kod z zajęć

function rysujGraf() {
  let arr = [
      ["A", 5, []],
      ["B", 3, ["A"]],
      ["C", 4, []],
      ["D", 6, ["A"]],
      ["E", 4, ["D"]],
      ["F", 3, ["B", "C", "D"]]
  ];

  // funkcja znajdująca wszystkie końce ścieżek

  let wszystkieSciezki = [];
  let a = 0;
  let b = 0;
  console.log(wszystkieSciezki)

  function znajdzSciezke(thisElement, temp) {
      wszystkieSciezki[a][b] = temp;
      b++;
      if(thisElement[2].length == 0) {
          console.log(thisElement[0]);
          a++;
          b = 1;
          return;
      }

      for(let i = 0; i < thisElement[2].length; i++) {
          let index = 0;
          for(let j = 0; j < arr.length; j++) {
              if(arr[j][0] == thisElement[2][i]) {
                  // console.log(arr[j][0] + ":" + j);
                  let nowyElement = arr[j];
                  znajdzSciezke(nowyElement, thisElement[2][i]);
                  break;
              }
          }
      }
  }

  let ostatniElement = arr[arr.length - 1];

  for(let i = 0; i < ostatniElement[2].length; i++) {
      wszystkieSciezki[i] = [];
      wszystkieSciezki[i][0] = ostatniElement[0];
  }
  znajdzSciezke(ostatniElement, ostatniElement[0]);

  console.log(wszystkieSciezki);

  



}

function addDiv() {
  let div = document.createElement("div");
  div.className = "zdarzenie";
  document.getElementById("container").appendChild(div);

}