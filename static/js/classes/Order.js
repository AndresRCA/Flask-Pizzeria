export default class Order {
    constructor(first_name, last_name, pizzas) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.pizzas = pizzas; // [Pizza]
    }
}