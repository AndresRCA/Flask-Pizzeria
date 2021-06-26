from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/ordenar", methods=['GET', 'POST'])
def placeOrder():
    return render_template('place_order.html')

@app.route("/ordenar/confirmar")
def confirmOrder():
    return render_template('confirm_order.html')

@app.route("/ordenar/finalizar")
def finalizeOrder():
    return render_template('finalize_order.html')