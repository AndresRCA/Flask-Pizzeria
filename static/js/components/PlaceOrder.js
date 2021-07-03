import Pizza from "../classes/Pizza";
import Order from "../classes/Order";
// either useful prototype functions or regular functions that don't have any relation to the component
import "../helper_functions";
import getCookie from "../helper_functions"; // this is just for readability, it's already imported up here

export default class PlaceOrder extends React.Component {
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

    /**
     * handle input change and set state according to given key
     * @param {event} event 
     * @param {string} key 
     */
    handleChange(event, key) {
        let new_state = {};
        new_state[key] = event.target.value;
        this.setState(new_state);
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
        this.setState(prevState => ({ pizzas: [...prevState.pizzas, pizza]}));
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
        const { first_name, last_name, selected_size, error, sizes, pizzas, toppings } = this.state;

        return (
            <div>
                {/* error message when a validation error occurs */}
                {error.isOn && 
                    <article class="message is-danger is-small">
                        <div class="message-header">
                            <p>Error</p>
                            <button onClick={() => this.deleteErrorMessage()} class="delete" aria-label="delete"></button>
                        </div>
                        <div class="message-body">{ error.message }</div>
                    </article>
                }
                <h4 class="title is-4">Fill the data to order!</h4>
                <hr />
                <form onSubmit={() => this.placeOrder()}> {/* add the .prevent*/}
                    {/* {% csrf_token %} */}
                    <div class="columns">
                        <div class="column">
                            <div class="field is-horizontal is-pulled-left">
                                <div class="field-label is-normal">
                                    <label class="label">Client:</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control is-expanded">
                                            <input value={first_name} onChange={(e) => this.handleChange(e, 'first_name')} name="first_name" class="input" type="text" placeholder="Name" required />
                                        </p>
                                    </div>
                                    <div class="field">
                                        <p class="control is-expanded">
                                            <input value={last_name} onChange={(e) => this.handleChange(e, 'last_name')} name="last_name" class="input" type="text" placeholder="Last Name" required />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h4 class="title is-4">Customize your pizza</h4>
                    <hr />

                    <div class="columns">
                        <div class="column">
                            <div class="field has-addons is-horizontal is-pulled-left">
                                <div class="field-label is-normal">
                                    <label class="label">Sizes:</label>
                                </div>
                                <div class="field-body">
                                    <div class="control">
                                        <div class="select">
                                            <select class="select" value={selected_size} onChange={(e) => this.handleChange(e, 'selected_size')}>
                                                {/* size options from database */}
                                                {sizes.map(size => 
                                                    <option value={size}>{ size.name.capitalize() }</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="control">
                                        {/* size.price when a size is selected */}
                                        <a class="button is-static">{ this.size_price().currency() }</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <h6 class="title is-6">Toppings:</h6>      
                            <div class="field is-grouped is-grouped-multiline">
                                {/* selected tags go here */}
                                {selected_toppings.map((topping, index) => 
                                    <div key={topping.id} class="control">
                                        <div class="tags has-addons">
                                            <span class="tag">{ topping.name }</span>
                                            <a onClick={() => this.removeToppingFromSelected(index)} class="tag is-delete"></a>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                        <div class="column">
                            <h6 class="title is-6 has-text-centered">Select your toppings:</h6>
                            <div id="toppingList" class="field is-grouped is-grouped-multiline">
                                {/* topping tags are generated here */}
                                {toppings.map(topping => 
                                    <div onClick={() => this.addTopping(topping.id)} class="control">
                                        <div class="tags has-addons">
                                            <span class="tag">{ topping.name }</span>
                                            <span class="tag is-info">{ topping.price.currency() }</span>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button type="button" onClick={() => this.addPizza()} class="button">+Add Pizza</button>
                        </div>
                    </div>

                    <hr />
                    <h4 class="title is-4">Pizzas:</h4>
                    {(pizzas.length > 0) 
                        ? 
                        <ul>
                            {/* pizza items go here */}
                            {pizzas.map((pizza, index) => 
                                <li class="level">
                                    <div class="level-left">
                                        <div class="level-item">
                                            <a class="delete" onClick={() => this.removePizza(index)}></a>
                                        </div>
                                        <div class="level-item has-text-centered">
                                            <div>
                                                <p class="heading">Pizza</p>
                                                <b>No.{ index + 1 }</b>
                                            </div>
                                        </div>
                                        <div class="level-item has-text-centered">
                                            <div>
                                                <p class="heading">Size</p>
                                                <p>{ pizza.size.name.capitalize() }</p>
                                            </div>
                                        </div>
                                        <div class="level-item">
                                            <div>
                                                <p class="heading">Toppings</p>
                                                {(pizza.toppings.length > 0) 
                                                    ? <p>{ pizza.getToppingNames().join(', ') }</p>
                                                    : <p>No toppings</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="level-right">
                                        <p class="level-item"><b>Total:</b>&nbsp;{ pizza.getTotal().currency() }</p>
                                    </div>
                                </li>)}
                        </ul>
                        : 
                        <div class="content has-text-centered">
                            <p class="is-size-5 has-text-weight-light">There are no pizzas yet</p>
                        </div>
                    }

                    <hr />
                    
                    {pizzas.length > 0 && 
                        <div class="content" style="display: flex; justify-content: space-between;">
                            <input type="submit" value="Order" class="button is-info" />
                            <p><b>Order total:</b>&nbsp;{ order_total.currency() }</p>
                        </div>
                    }

                </form>
            </div>
        );
    }
}