//1
var array = [10, 5, 13, 18, 51];

//1.1
function printArr(arr){
//  for (let element of arr){console.log(element);}
    arr.forEach(element => console.log(element));
}
printArr(array);

//1.2
function doubleElements(arr){
    return arr.map(x => x*2);
}
console.log(doubleElements(array));

//1.3
function evenElements(arr){
    return arr.filter(x => x % 10 == 0);
}
console.log(evenElements(array));

//1.4
function hasElSmallerthan10(arr){
    for (let element of arr){
        if(element < 10){ return true; }
    }
}
console.log(hasElSmallerthan10(array));

//1.5
function devidedto3(arr){
    return arr.filter(x => x % 3 == 0);
}
console.log(devidedto3(array));

//1.6
function reduceMethod(arr){
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
}
console.log(reduceMethod(array));

//1.7
function sliceA(arr){
    return arr.slice(arr.length-2);
}
console.log(sliceA(array));