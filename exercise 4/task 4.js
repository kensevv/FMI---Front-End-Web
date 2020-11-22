function privatePerson(){
    let _salary = 1000;
    this.getSecretSalaryInfo = function(){
    return _salary;
}
}

let p1 = new privatePerson();
console.log(p1.getSecretSalaryInfo());
// p1._salary - undefined.