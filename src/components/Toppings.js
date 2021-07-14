/**
 * acts as a wrapper for the Topping component
 * @returns JSX
 */
export function ToppingList(props) {
    return <div id="toppingList" class="field is-grouped is-grouped-multiline">
        {props.children}
    </div>
}

/**
 * component that lives inside ToppingList
 * @param {Topping} topping 
 * @returns JSX
 */
export function Topping({ topping }) {
    return <div class="control">
        <div class="tags has-addons">
            <span class="tag">{ topping.name }</span>
            <span class="tag is-info">{ topping.price.currency() }</span>
        </div>
    </div>
}