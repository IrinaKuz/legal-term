function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
    xhttp.open("GET", "terminology.json");
    xhttp.send();
  }

// function getAnswerDefenition() {
//     return terminology[Math.random*terminology.length()]
// }

// console.log(getAnswerDefenition());

loadDoc();