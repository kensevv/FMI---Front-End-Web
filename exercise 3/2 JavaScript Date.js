//2.1
var myDays = [];
var today = new Date();

myDays.push(today);

//2.2
var newDate = new Date('December 8, 2018 21:00:00');
myDays.push(newDate);

//2.3
function getDaysInMonth(currentDate) {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

var whatDays = new Array()
for(let element of myDays){
    var arr = [];
    arr.push(getDaysInMonth(element));
    arr.push(element.getDay());
    whatDays.push(arr);
}

console.log(myDays);
console.log(whatDays);

//2.4
function dayString(day){
    switch (day) {
        case 0: return "Неделя"; break;
        case 1: return "Понеделник"; break;
        case 2: return "Вторник"; break;
        case 3: return "Сряда"; break;
        case 4: return "Четвъртък"; break;
        case 5: return "Петък"; break;
        case 6: return "Събота"; break;
        default: break;
    }
}

function convertDateToString(thisDate){
    var dd = String(thisDate.getDate()).padStart(2, '0');
    var mm = String(thisDate.getMonth() + 1).padStart(2, '0');
    var yyyy = thisDate.getFullYear();
    var date = "Дата: " + dd + '.' + mm + '.' + yyyy + ", "; 
    var time = "час: "+ thisDate.toTimeString().slice(0, 8) + ", ";
    var info = "" + dayString(thisDate.getDay()) + ", " + getDaysInMonth(thisDate)  + " дни.";
    
    var todayString = date + time + info;
    return todayString;
}

var FinalResultArray = new Array();
for (let thisDate of myDays) {
    FinalResultArray.push(convertDateToString(thisDate));
}
console.log(FinalResultArray);