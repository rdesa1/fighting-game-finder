from flask import Blueprint, jsonify
import os
from dotenv import load_dotenv # for manipulating environment variables
import psycopg # postgreSQL module
import string # for normalizing the input for case sensitivity
import re # for using regex to normalize certain user inputs

# Create a blueprint instance
search_bp = Blueprint('search', __name__)

# Query the database for locations that closely match the user's input
@search_bp.route('/<state>', methods=['GET'])
@search_bp.route('/<state>/')
@search_bp.route('/<state>/<city>')
@search_bp.route('/<state>/<city>/')
def get_query_results(state, city=None):

    # The database is case sensitive. Ensure the first letter of every word is capitalized.
    state = string.capwords(state)

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
                    city = normalize_city_name(state, city)

                    print(city)
                    print(state)

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

    # leaving contexts doesn't close the connection
    conn.close()

    return jsonify(200, results)

# Function for normalizing user input for cities to adjust for database quirks like case-sensitivity.
def normalize_city_name(state, city):

    # Capitalize the name of the city
    city = string.capwords(city) 

    # Check if the provided city is located within Southern California. If yes, normalize it to "SoCal".
    while (state == "California"):
        if (("Los Angelas" in city) or 
            ("La" in city) or 
            ("LA" in city) or
            ("San Diego" in city) or 
            ("Anaheim" in city) or 
            ("Irvine" in city) or 
            ("Santa Ana" in city) or
            ("Chula Vista" in city) or
            ("Carlsbad" in city) or
            ("El Centro" in city) or
            ("Yuba City" in city) or
            ("Inglewood" in city) or
            ("Hawthorne" in city) or
            ("Calexico" in city) or 
            ("Brawley" in city)):
            return ("SoCal")

    # Check if the provided city is located within the Virgina-DMV Metropolitan Area. If yes, normalize it to "DMV".
    while (state == "Virginia"):
        if (("Dmv" in city)
            or ("Alexandria" in city)
            or ("Arlington" in city)
            or ("Fairfax" in city)
            or ("Fredericksburg" in city)
            or ("Falls Church" in city)
            or ("Reston" in city)
            or ("Tysons" in city)
            or ("Lorton" in city)
            or ("Annandale" in city)):
               return ("DMV")

    # Hiphenated names like "Urbana-Champaign" are missed by string.capwords(). They have to be manually accounted for.
    while (state == "Illinois"):
        if (("Urbana-champaign" in city) 
              or ("Urbana champaign" in city)):
                return ("Urbana-Champaign")

    return city