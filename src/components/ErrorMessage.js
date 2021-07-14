export function ErrorMessage({ message, deleteErrorMessage }) {
    return <article className="message is-danger is-small">
        <div className="message-header">
            <p>Error</p>
            <button onClick={() => deleteErrorMessage()} className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">{ message }</div>
    </article>
}