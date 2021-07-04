## Website design for ordering pizzas

## Components

* Back-end: Flask.
* Front-end: React.js, Bulma.css.

Flask handles the MVC aspects of most of the project while React handles the view where it is appropriate.

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

2. Rename the .env.example file to .env and configure the file with the appropriate values.

3. Create the database by entering the python interpreter on your command line and running the following instructions: `from app import db` -> `db.create_all()`.

4. After exiting the python interpreter, run the `flask run` command, if `MODE == 'DEV'` in the .env file, dummy data will be created in the database.