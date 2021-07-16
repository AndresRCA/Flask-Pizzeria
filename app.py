from flask import Flask, render_template, url_for, request, jsonify
from config import Config
from models import db, Size, Topping
import json

app = Flask(__name__)
app.config.from_object(Config())
db.init_app(app)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/order", methods=['GET', 'POST'])
def placeOrder():
    if request.method == 'GET':		
        return render_template('place_order.html')

    if request.method == 'POST':
        order_info = json.loads(request.body) # obtains the info from the poll.
        error, key = validateOrder(order_info)
        if error:
            return f"ERROR: the parameter {key} can't be empty.", 400
        else:
            request.cookies['_order'] = order_info # cookies var used in confirmOrder url.
            return 'There are no empty fields.'

# this function which was written by the other collaborator is flawed and I'll probably delete it
def validateOrder(self, order):
    """Returns boolean that determines if an error ocurred and the key where the error ocurred"""
    error = False
    key = ''
    for k, v in order.items(): # Checks each value of the dictionary, if the value is empty returns an 400 error
        if v == '':
            error = True
            key = k
    return error, key

@app.route("/order/confirm")
def confirmOrder():
    return render_template('confirm_order.html')

@app.route("/order/finalize")
def finalizeOrder():
    return render_template('finalize_order.html')

@app.route('/api/order', methods=['GET'])
def sendSizeAndToppings():
    """Send sizes and toppings from the database"""
    sizes = []
    sizes = [{'id': size.id, 'name': size.name, 'price': size.price} for size in Size.query.all()]
    toppings = []
    toppings = [{'id': topping.id, 'name': topping.name, 'price': topping.price} for topping in Topping.query.all()]
    # I feel like there should be a better way to parse the model objects to json and send it
    return jsonify({ 'sizes': sizes, 'toppings': toppings })