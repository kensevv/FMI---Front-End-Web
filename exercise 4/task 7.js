function switchRows(){
    var row1 = document.getElementsByTagName("tr")[1];
    var row2 = document.getElementsByTagName("tr")[2];

    document.getElementsByTagName("tr")[1].innerHTML = row2; // :D
    document.getElementsByTagName("tr")[2].innerHTML = row1; // :D
}