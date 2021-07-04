from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Size(db.Model):
    __tablename__ = 'Sizes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    price = db.Column(db.Integer)

    pizzas = db.relationship('Pizza', backref='size', lazy=True) # set relationship with Pizzas table (one to many)
    
    def __repr__(self):
        return self.name
	
class Topping(db.Model):
    __tablename__ = 'Toppings'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    price = db.Column(db.Float)

    def __repr__(self):
        return self.name
	
class Order(db.Model):
    __tablename__ = 'Orders'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60))
    last_name = db.Column(db.String(60))
    order_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    pizzas = db.relationship('Pizza', backref='order', lazy=True) # set relationship with Pizzas table (one to many)
    sale = db.relationship('Sale', backref='order', lazy=True, uselist=False, cascade='all, delete-orphan') # set relationship with Sales table (one to one)
	
    #class Meta:
    #    ordering = ['-order_date']
	
    def __repr__(self):
        return self.full_name
	
    @property
    def full_name(self):
        return "{} {}".format(self.first_name, self.last_name)
	
    @property
    def total(self):
        """Get current total of order, should only be used when inserting to Sale"""
        total = 0.00
        for pizza in self.pizzas.all():
            total += pizza.total
        return round(total, 2)

class Sale(db.Model):
    __tablename__ = 'Sales'

    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Float) # this total comes from self.order.total at the moment of adding a Sale obj to the DB
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False) # A sale only has one row in Order table (one to one)

    def __repr__(self):
        return "Sale from {}".format(self.order.full_name)

# will the the extra column 'amount' be alright? 
ToppingAmount = db.Table('ToppingAmount', 
    db.Column('pizza_id', db.Integer, db.ForeignKey('pizza.id'), primary_key=True),
    db.Column('topping_id', db.Integer, db.ForeignKey('topping.id'), primary_key=True),
    db.Column('amount', db.Integer, nullable=False)
)

class Pizza(db.Model):
    __tablename__ = 'Pizzas'

    id = db.Column(db.Integer, primary_key=True)
    size_id = db.Column(db.Integer, db.ForeignKey('size.id'), nullable=False) 
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    
    # Many to Many field: TOPPING_ID -> TOPPINGS_AMOUNT[topping_id, pizza_id, amount] <- PIZZA_ID
    toppings_amount = db.relationship('Topping', secondary=ToppingAmount, lazy=True, backref=db.backref('pizzas', lazy=True))

    #class Meta:
    #    order_with_respect_to = 'order' # it's something like this: order1->pizza1,pizza2. order2->pizza1. order3->pizza1 ; instead of order1->pizza1. order2->pizza1. order1->pizza2...
        
    def __repr__(self):
        return "Pizza ({}), {}".format(self.id, self.order.full_name)

    @property
    def total(self):
        """Get current total of pizza (depends on Topping.price values)"""
        total = 0.00
        total += self.size.price
        for topping in self.toppings.all():
            t_amount = self.getToppingAmount(topping)
            for i in range(t_amount):
                total += topping.price
        return round(total, 2)

    def getToppingAmount(self, topping): # is there a way to check the ammount via the pizza object?
        """Get topping amount from ToppingAmount model"""
        t_a = ToppingAmount.objects.get(pizza=self, topping=topping)
        if not t_a: return 0 # if topping was not found 
        return t_a.amount