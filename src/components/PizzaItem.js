export function PizzaItem({ pizza, index, removePizza }) {
    return <li key={index} className="level">
        <div className="level-left">
            <div className="level-item">
                <a className="delete" onClick={() => removePizza(index)} />
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">Pizza</p>
                    <b>No.{ index + 1 }</b>
                </div>
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">Size</p>
                    <p>{ pizza.size.name.capitalize() }</p>
                </div>
            </div>
            <div className="level-item">
                <div>
                    <p className="heading">Toppings</p>
                    {(pizza.toppings.length > 0) 
                        ? <p>{ pizza.getToppingNames().join(', ') }</p>
                        : <p>No toppings</p>}
                </div>
            </div>
        </div>
        <div className="level-right">
            <p className="level-item"><b>Total:</b>&nbsp;{ pizza.getTotal().currency() }</p>
        </div>
    </li>
}