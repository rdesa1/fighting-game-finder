from asyncio.windows_events import NULL
from flask import Flask, request, jsonify # import flask module
import pandas as pd # pandas for creating a dataframe from the spreadsheet
import psycopg # postgreSQL module
import os # for obtaining environment variables
from dotenv import load_dotenv # for manipulating environment variables

# Iterate through the data directory until a spreadsheet is found
def GetFirstSpreadsheet(path):
    for file in os.listdir(path):
        if file.endswith(".xlsx"):
            data = pd.read_excel(file)
            return data

# Obtain the spreadsheet as a dataframe
def GetData():
    path = os.path.join(os.curdir, "data")
    if os.path.isdir(path):
        return GetFirstSpreadsheet(path)
    else:
        return NULL

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
        cur.execute(
            "INSERT INTO test (num, data) VALUES (%s, %s)",
            (100, "abc'def"))

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

# instance of flask application
app = Flask(__name__)

# home route that returns below text when root url is accessed
@app.route("/")
def hello_world():
    #return "<p>Hello, World!</p>"
    return GetData()

if __name__ == '__main__':  
   app.run()