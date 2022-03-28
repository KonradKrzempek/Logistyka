function skryptStartowy() {
  console.log("Start");
}

window.onload = skryptStartowy();


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