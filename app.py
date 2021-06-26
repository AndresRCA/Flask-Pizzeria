from flask import Flask, render_template, url_for, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/ordenar", methods=['GET', 'POST'])
def placeOrder():
    if request.method == 'GET':
        context = {}
        # get data from the database to display
		# context['sizes'] = json.dumps(list(Size.objects.all().values()))
		# context['toppings'] = json.dumps(list(Topping.objects.all().values()))		
        return render_template('place_order.html', context=context) # jsonify() is probably necessary here? I'll check later

    if request.method == 'POST':
        '''
        order_info = json.loads(request.body) # obtains the info from the poll.
		error, key = self.validateOrder(order_info)
		if error:
			return HttpResponseBadRequest(f"ERROR: the parameter {key} can't be empty.")
		else:
			request.session['_order'] = order_info # session var used in pizzeria:confirm_order url.
			return HttpResponse('There are no empty fields.')
        '''

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

@app.route("/ordenar/confirmar")
def confirmOrder():
    return render_template('confirm_order.html')

@app.route("/ordenar/finalizar")
def finalizeOrder():
    return render_template('finalize_order.html')