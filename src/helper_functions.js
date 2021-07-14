export function getCookie(name) {
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
    return this.charAt(0).toUpperCase() + this.slice(1);
};