function countDigits(arr){
    let count = 0;
    for (const element of arr) {
        if(typeof element === "number"){
            count++;
        }
    }
    return count;
}

function processData(input) {
    var result = [];
    input = eval(input);

    if(countDigits(input)) result.push(countDigits(input));

    for(let element in input) {
        if(typeof input[element] === 'string') {
            let str = input[element];
            var newString = "";
            for (var i = str.length - 1; i >= 0; i--) { 
                newString += str[i]; 
            }
        result.push(newString);
        }

        if(typeof input[element] === 'object' && !Array.isArray(input[element])) {
            let convertedString = "";
            convertedString += Object.keys(input[element]) + ": " + Object.values(input[element]);
            result.push(convertedString);
        }

        if(Array.isArray(input[element])){
            result.push(sortOrFlattArray(input[element]));
        }

        if(typeof input[element] === 'function'){
            result.push(input[element](42));
        }
    }

    console.log(JSON.stringify(result));
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

function convertObjToStr(object) {
    let convertedString = "";
    convertedString += Object.keys(object) + ": " + Object.values(object);

    return convertedString;
}

function sortOrFlattArray(array) {
    let containsArray = false;

    let res = [];
    for(let elem in array) {
        if(Array.isArray(array[elem])){
            containsArray = true;
            break;
        }
    }

    let stringArr = '' + Object.values(array);
    stringArr = stringArr.split(','); 
    
    for (let element in stringArr){
        res.push(+stringArr[element]);
    }

    if (containsArray) return res;
    return array.sort((a,b) => a-b);
}