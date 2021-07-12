## Website design for ordering pizzas

## Components

* Back-end: Flask.
* Front-end: React.js, Bulma.css.

Flask handles requests and database connections while React handles the view where it is appropriate.

## Database schema

![Schema](/doc/Models.png)

## Functionalities

1. Order pizzas.
2. Generate order summaries.

## Installation instructions

1. Create virtual environment using the requirements.txt file

> #### Using requirements.txt
> 
> Create a python virtual environment and install the dependencies with the `pip install -r requirements.txt` command.

2. Rename the .env.example file to .env and configure it with the appropriate values.

3. Create the initial database running the following instructions in the python interpreter.
```
>>> from dotenv import load_dotenv
>>> load_dotenv()
>>> from app import *
>>> app.app_context().push()
>>> from models import initDB
>>> initDB()
```
4. After exiting the python interpreter, run the `flask run` command, if `ENV_MODE == 'DEV'` in the .env file, dummy data will be created in the database (not yet implemented).