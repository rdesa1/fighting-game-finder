/* This component renders the map feature as imported from Leaflet. */

import "leaflet/dist/leaflet.css"
import type { Local as LocalType } from "../types/local.ts";
import "../styles/LocalMap.css" // Without an explicit height, the map will not render
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import {
     MapContainer,
     Marker,
     Popup,
     TileLayer
} from "react-leaflet";

interface LocalMapProps {
     locals: LocalType[];
}

// helper function to zoom into the state that has been searched
function FitBounds({ locals }: LocalMapProps) {
     const map = useMap();

     useEffect(() => {
          if (locals.length === 0) {
               return;
          }

          // compute the smallest rectangle containing all the marker coordinates
          const bounds = L.latLngBounds(
               locals.map((local) => [
                    local.latitude as number,
                    local.longitude as number
               ])
          );

          // zooms and pans over to the rectangle containing all marker coordinates
          map.fitBounds(bounds, {
               padding: [50, 50]
          });
     }, [locals, map]);

     return null;
}

export default function LocalMap({ locals }: LocalMapProps) {
     const localsWithCoordinates = locals.filter(
          (local) =>
               local.latitude !== null &&
               local.longitude !== null
     );

     return (


          <MapContainer
               center={[39.8283, -98.5795]} // default map position of the U.S.
               zoom={4}
               className="local-map"
          >

               <TileLayer // populate the empty map area with OpenStreetMap tiles
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
               />

               <FitBounds locals={localsWithCoordinates } />
               
               {localsWithCoordinates.map((local) => ( // render one marker per latitude, longitude coordinate pair
                    <Marker
                         key={local.id}
                         position={[
                              local.latitude as number,
                              local.longitude as number
                         ]}
                    >

                         <Popup>
                              <strong>{local.name}</strong>
                              <br />
                              {local.venue}
                              <br />
                              {local.metro_area}, {local.subnational}
                              <br />
                              {local.address}
                         </Popup>
                    </Marker>
               ))}
          </MapContainer>

     );
}