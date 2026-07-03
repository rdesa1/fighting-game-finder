import os
import psycopg

from dotenv import load_dotenv
from psycopg.rows import dict_row

load_dotenv()

DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_HOST_NAME = os.getenv("DATABASE_HOST_NAME")
DATABASE_PORT = os.getenv("DATABASE_PORT")
DATABASE_NAME = os.getenv("DATABASE_NAME")

with psycopg.connect(
    f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}"
    f"@{DATABASE_HOST_NAME}:{DATABASE_PORT}/{DATABASE_NAME}",
    row_factory=dict_row
) as conn:

    with conn.cursor() as cur:

        query = '''
        SELECT
            id,
            "Event Name" AS name,
            "Subnational" AS subnational,
            "Metro Area" AS metro_area,
            "Address" AS address
        FROM "Locals"
        WHERE latitude IS NULL
        OR longitude IS NULL
        ORDER BY id;
        '''

        cur.execute(query)
        locals_to_geocode = cur.fetchall()

for local in locals_to_geocode:
    print(local)