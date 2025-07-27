from flask import Flask, request, jsonify # import flask module
import pandas as pd # pandas for creating a dataframe from the spreadsheet
import psycopg # postgreSQL module
import os # for obtaining environment variables
from dotenv import load_dotenv # for manipulating environment variables
from flask_debugtoolbar import DebugToolbarExtension
from api.search import search_bp  # Import blueprint
  
# create the app
app = Flask(__name__)

# register blueprints
app.register_blueprint(search_bp, url_prefix='/search')

# set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# load environment variables from a .env file into the application's environment
load_dotenv()

# obtain the environment variables for establishing a connection
DATABASE_USER = os.getenv('DATABASE_USER')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
DATABASE_HOST_NAME = os.getenv('DATABASE_HOST_NAME')
DATABASE_PORT = os.getenv('DATABASE_PORT')
DATABASE_NAME = os.getenv('DATABASE_NAME')

# Connect to an existing database
with psycopg.connect(f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST_NAME}:{DATABASE_PORT}/{DATABASE_NAME}") as conn:

    # Open a cursor to perform database operations
    with conn.cursor() as cur:

        # Execute a command: this creates a new table, if it doesn't already exist
        cur.execute("""
            CREATE TABLE IF NOT EXISTS test (
                id serial PRIMARY KEY,
                num integer,
                data text)
            """)            

        # Pass data to fill a query placeholders and let Psycopg perform
        # the correct conversion (no SQL injections!)
        '''cur.execute(
            "INSERT INTO test (num, data) VALUES (%s, %s)",
            (100, "abc'def"))'''

        # Query the database and obtain data as Python objects.
        cur.execute("SELECT * FROM test")
        cur.fetchone()
        # will return (1, 100, "abc'def")

        # You can use `cur.fetchmany()`, `cur.fetchall()` to return a list
        # of several records, or even iterate on the cursor
        for record in cur:
            print(record)

        # Make the changes to the database persistent
            conn.commit()

# a simple page that says hello
@app.route('/')
def hello():
    return 'Hello, World!'