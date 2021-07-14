/**
 * acts as a wrapper for the Topping component
 * @returns JSX
 */
export function ToppingList(props) {
    return <div id="toppingList" className="field is-grouped is-grouped-multiline">
        {props.children}
    </div>
}

/**
 * component that lives inside ToppingList
 * @param {Topping} topping 
 * @returns JSX
 */
export function Topping({ topping }) {
    return <div className="control">
        <div className="tags has-addons">
            <span className="tag">{ topping.name }</span>
            <span className="tag is-info">{ topping.price.currency() }</span>
        </div>
    </div>
}