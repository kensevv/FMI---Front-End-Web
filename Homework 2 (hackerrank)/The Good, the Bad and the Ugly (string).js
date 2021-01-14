function countChars(string) {
    let charCounts = {};
    for(let i = 0; i < string.length; i++) {
        let keys = Object.keys(charCounts);

        if(keys.indexOf(string[i]) === -1){
            charCounts = { ...charCounts, [string[i]]: 1 };
        } else {
            charCounts[string[i]] += 1;
        }
    }
    return charCounts;
}

function processData(input) {
    input = input.toLowerCase();
    let chars = countChars(input);
    let firstCharCount = chars[input[0]];
    
    let counts = {};
    
    let Good = true;
    let Bad = true;

    for(let char in chars) {
        if(firstCharCount !== chars[char]) {
            Good = false;
        }
    }

    chars = countChars(input);

    for(let i in chars){
        if(counts[chars[i]] === undefined){
            counts = { ...counts, [chars[i]]: 1};
        } else {
            counts[chars[i]] += 1;
        }
    }
    let values = Object.values(counts);
    let keys = Object.keys(counts);

    if (keys.length > 2){
        Bad = false;
    } else {
        let index = values.indexOf(1);
        if (index === 0){
            var otherIndex = 1;
        } else {
            var otherIndex = 0;
        }

        if (keys[index] == 1 || Math.abs(keys[index] - keys[otherIndex]) === 1){
            Bad = true;
        } else {
            Bad = false;
        }
    }

    if (Good) {
         console.log('GOOD');
    } else if(Bad) {
        console.log('BAD');
        } else {
            console.log('UGLY');
        }
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
