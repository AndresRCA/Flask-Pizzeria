export function ErrorMessage({ message, deleteErrorMessage }) {
    return <article class="message is-danger is-small">
        <div class="message-header">
            <p>Error</p>
            <button onClick={() => deleteErrorMessage()} class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">{ message }</div>
    </article>
}