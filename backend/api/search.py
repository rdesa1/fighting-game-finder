from flask import Blueprint, jsonify
import os
from dotenv import load_dotenv # for manipulating environment variables
import psycopg # postgreSQL module

# Create a blueprint instance
search_bp = Blueprint('search', __name__)

# Query the database for locations that closely match the user's input
@search_bp.route('/<state>', methods=['GET'])
@search_bp.route('/<state>/<city>')
def get_query_results(state, city=None):

    # The database is case sensitive. Ensure the first letter of the query is capitalized
    state = state.capitalize()

    # load environment variables from a .env file into the application's environment
    load_dotenv()

    # obtain the environment variables for establishing a connection
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
    DATABASE_HOST_NAME = os.getenv('DATABASE_HOST_NAME')
    DATABASE_PORT = os.getenv('DATABASE_PORT')
    DATABASE_NAME = os.getenv('DATABASE_NAME')

    # Connect to an existing database
    try:
        with psycopg.connect(f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST_NAME}:{DATABASE_PORT}/{DATABASE_NAME}") as conn:
            with conn.cursor() as cur:

                
                if city:                    
                    city = city.capitalize() # Capitalize the city if its been provided

                    # Query the database for active locations from the same state ("Subnational" in the table)
                    postgreSQL_select_Query = '''
                    SELECT * from "Locals" 
                    WHERE "Country" = %s 
                    AND "Subnational" = %s
                    AND "Metro Area" = %s
                    AND "Status" = %s
                    '''
                    cur.execute(postgreSQL_select_Query, ("USA", state, city, "Active"))
                    results = cur.fetchall()

                else:
                    # Query the database for active locations from the same state and city ("Metro Area")
                    postgreSQL_select_Query = '''
                    SELECT * from "Locals" 
                    WHERE "Country" = %s 
                    AND "Subnational" = %s
                    AND "Status" = %s
                    '''
                    cur.execute(postgreSQL_select_Query, ("USA", state, "Active"))
                    results = cur.fetchall()

    except (Exception, psycopg.Error) as error:
        print ("Error fetching data from PostgreSQL table", error)

    return jsonify(results)