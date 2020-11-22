class Person {
    constructor(name){
      this.name = name;
      this.planet = "Земя";
  }  

    printPerson = function(){
      console.log(`Здравей ${this.name} от планетата ${this.planet}`);
  }
};

var p1 = new Person("nameOne");
var p2 = new Person("nameTwo");
var p3 = new Person("nameThree");

p1.printPerson();