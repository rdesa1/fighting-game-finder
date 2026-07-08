# This script is for obtaining and caching longitude and latidude data points 
# within the database, using the nominatum geocoding API.

import os
import psycopg
import requests

from dotenv import load_dotenv
from psycopg.rows import dict_row

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

local = locals_to_geocode[0]

search_query = (
    f'{local["address"]}, '
    f'{local["subnational"]}, USA'
)

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

print(search_query)
print(data)

if data:
    latitude = float(data[0]["lat"])
    longitude = float(data[0]["lon"])

    print("Latitude:", latitude)
    print("Longitude:", longitude)
else:
    print("No geocoding result found.")
    exit()

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

print(f'Updated row {local["id"]}')