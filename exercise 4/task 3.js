class Item {
    constructor(name, discount){
        this.name = name;
        this.discount = discount;
    }

    calculatePrice = function(price){
        return this.price - (this.price * (this.discount / 100));
    }
}
Item.prototype.price = 1000;


var it = new Item("item", 50);

console.log(it.calculatePrice());