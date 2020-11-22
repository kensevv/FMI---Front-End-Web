

function modifyPage() { // тествам функцията чрез бутон в html-ла
    let sColor1 = "#A22004";
    let sColor2 = "#6E6A69";

    var Paragraphs = document.getElementsByTagName("p");
    var ClassHeadertitle = document.getElementsByClassName("headertitle");


    var p = document.createElement("p");
    p.innerHTML = ` ${Paragraphs.length} параграфа, ${ClassHeadertitle.length} елемента с клас headertitle`;    
    document.body.insertBefore(p, document.body.firstChild);

    for (let element of Paragraphs) {
        element.setAttribute("style", `background-color: ${sColor1}`);
    }

    for (let element of ClassHeadertitle) {
        element.setAttribute("style", `background-color: ${sColor2}`);
    }
  }
