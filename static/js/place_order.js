function getCookie(name) {
  //https://docs.djangoproject.com/en/3.0/ref/csrf/
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

class Order {
  constructor(first_name, last_name, pizzas) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.pizzas = pizzas; // [Pizza]
  }
}

class Pizza {
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

/**
 * formats a number to $ currency format
 * @returns string
 */
Number.prototype.currency = () => {
  if (!this) return '';
  return "$" + Number.parseFloat(this).toFixed(2);
};

String.prototype.capitalize = () => {
  if (!this) return '';
  this = this.toString();
  return this.charAt(0).toUpperCase() + this.slice(1);
};

class PlaceOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      sizes: sizes, // sizes received from backend in template: {id, name, price}
      selected_size: sizes[0], // size object
      toppings: toppings, // toppings received from backend in template: {id, name, price}
      selected_toppings: [],
      pizzas: [], // array of Pizza objects
      error: {
        message: '',
        isOn: false
      }
    };
  }

  size_price() {
    return this.state.selected_size.price;
  }

  order_total() {
    let total = 0.00;
    this.state.pizzas.forEach(pizza => {
      total += pizza.getTotal();
    });
    return total;
  }

  addTopping(id) {
    let topping = this.state.toppings.find(topping => topping.id == id);
    this.setState(prevState => ({selected_toppings: [...prevState.selected_toppings, topping]}));
  }

  removeToppingFromSelected(index) {
    let selected_toppings = Array.from(this.state.selected_toppings); // get shallow copy
    selected_toppings.splice(index, 1);
    this.setState({ selected_toppings });
  }

  addPizza() {
    let toppings_copy = Array.from(this.selected_toppings); // get shallow copy
    let pizza = new Pizza(this.state.selected_size, toppings_copy);
    this.setState(prevState => ({ pizzas: [...pizzas, pizza]}));
  }

  removePizza(index) {
    let pizzas = Array.from(this.state.pizzas); // get shallow copy
    pizzas.splice(index, 1);
    this.setState({ pizzas });
  }

  async placeOrder() {
    let pizzas_copy = Array.from(this.state.pizzas);
    const order = new Order(this.state.first_name, this.state.last_name, pizzas_copy);

    try {
      let response = await fetch('/order/', {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': getCookie('csrftoken')
        }
      });

      if(response.status != 200) { // throw error to handle it inside catch(){}
        let error_message = await response.text();
        throw new Error(error_message);
      }
      
      let res_message = await response.text();
      console.log(res_message); // the response was successful
      window.location.href = '/order/confirm'; // redirect to confirmation view (try to do this from flask instead)
    } catch(e) {
      console.log(e);
      this.setState({ error: { message: e, isOn: true }});
    }
  }

  deleteErrorMessage() {
    this.setState({ error: { isOn: false } });
  }

  render() {

  }
}

const el = document.getElementById('app');
ReactDOM.render(<PlaceOder />, el);