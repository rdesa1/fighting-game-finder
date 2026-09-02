# This script was written to geocode as many locations as possible from the database, 
# updating the SQL table with longitudinal and latitudinal data to be used for rendering map markers.
# Geocoding is done through the open source Nominatum API, particularly the "/search" endpoint.

import os
import psycopg
import re
import requests
import time # Nominatum policy only allows for 1 request per second

from dotenv import load_dotenv
from psycopg.rows import dict_row

# helper function for simplifying local addresses for geocoding
def clean_address(address):
    address = address.strip().rstrip(",")

    address = re.sub(
        r"\s*\|\s*Bldg\.?\s*\S+",
        "",
        address,
        flags=re.IGNORECASE
    )

    address = re.sub(
        r"\s+(suite|ste|unit)\s+\S+",
        "",
        address,
        flags=re.IGNORECASE
    )

    address = re.sub(
        r"\s+#\w+",
        "",
        address
    )

    address = re.sub(
        r"\s+",
        " ",
        address
    )

    return address

load_dotenv()

DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_HOST_NAME = os.getenv("DATABASE_HOST_NAME")
DATABASE_PORT = os.getenv("DATABASE_PORT")
DATABASE_NAME = os.getenv("DATABASE_NAME")

DATABASE_URL = (
    f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}"
    f"@{DATABASE_HOST_NAME}:{DATABASE_PORT}/{DATABASE_NAME}"
)

with psycopg.connect(DATABASE_URL, row_factory=dict_row) as conn:
    with conn.cursor() as cur:
        query = '''
        SELECT
            id,
            "Event Name" AS name,
            "Subnational" AS subnational,
            "Metro Area" AS metro_area,
            "Address" AS address
        FROM "Locals"
        WHERE "Country" = 'USA'
        AND "Address" IS NOT NULL
        AND (latitude IS NULL OR longitude IS NULL)
        ORDER BY id;
        '''

        cur.execute(query)
        locals_to_geocode = cur.fetchall()


if not locals_to_geocode:
    print("No rows need geocoding.")
    exit()

# a dictionary to keep track of addresses already seen, preventing duplicate geocoding
geocode_cache = {} 

for local in locals_to_geocode:
    search_query = clean_address(local["address"])

    print(search_query)

    if search_query in geocode_cache:
        latitude, longitude = geocode_cache[search_query]

        print(f'Using cached coordinates for row {local["id"]}')

    else:
        params = {
        "q": search_query,
        "format": "jsonv2",
        "limit": 1
        }

        headers = {
            "User-Agent": "FightingGameFinder/1.0"
        }

        response = requests.get(
            "https://nominatim.openstreetmap.org/search",
            params=params,
            headers=headers,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()
   
    if not data:
        #print(f'No geocoding result found for row {local["id"]}')
        print(f'FAILED row {local["id"]}: {search_query}')
        time.sleep(1.1)
        continue
    
    latitude = float(data[0]["lat"])
    longitude = float(data[0]["lon"])

    geocode_cache[search_query] = (
        latitude,
        longitude
    )

    time.sleep(1.1)

    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor() as cur:
            cur.execute(
                '''
                UPDATE "Locals"
                SET latitude = %s,
                    longitude = %s
                WHERE id = %s;
                ''',
                (latitude, longitude, local["id"])
        )

        conn.commit()

    print(f'Updated row {local["id"]}: {latitude}, {longitude}')

print("Geocoding complete.")
