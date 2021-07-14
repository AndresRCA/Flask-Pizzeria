export default class Pizza {
	constructor(size, toppings) {
		this.size = size; // size object
		this.toppings = toppings; // [Topping]
	}

    getTotal() {
        let total = 0.00;
        total += this.size.price;
        this.toppings.forEach(topping => {
            total += topping.price;
        });
        return total;
    }

    getToppingNames() {
        let topping_names = this.toppings.map(topping => topping.name);
        return topping_names;
    }
}