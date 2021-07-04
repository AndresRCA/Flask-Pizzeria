export function PizzaItem({ pizza, index, removePizza }) {
    return <li key={index} class="level">
        <div class="level-left">
            <div class="level-item">
                <a class="delete" onClick={() => removePizza(index)} />
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
    </li>
}