/* This component renders the map feature as imported from Leaflet. */

import "leaflet/dist/leaflet.css"
import type { Local as LocalType } from "../types/local.ts";
import "../styles/LocalMap.css" // Without an explicit height, the map will not render
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import {
     MapContainer,
     Marker,
     Popup,
     TileLayer
} from "react-leaflet";

const defaultIcon = L.icon({
     iconUrl: "/img/marker-icon-blue.png",
     shadowUrl: "/img/marker-shadow.png",
     iconSize: [25, 41],
     iconAnchor: [12, 41],
     popupAnchor: [1, -34]
});

const selectedIcon = L.icon({
     iconUrl: "/img/marker-icon-red.png",
     iconSize: [32, 52],
     iconAnchor: [16, 52],
     popupAnchor: [1, -42]
});

interface LocalMapProps {
     locals: LocalType[];
     selectedLocal: LocalType | null;
     setSelectedLocal: React.Dispatch<
          React.SetStateAction<LocalType | null>
     >;
}

interface SelectedLocalProps {
     selectedLocal: LocalType | null;
}

interface FitBoundsProps {
     locals: LocalType[];
     selectedLocal: LocalType | null;
}

// helper function to zoom into the state that has been searched
function FitBounds({ locals, selectedLocal }: FitBoundsProps) {
     const map = useMap();

     useEffect(() => {


          // MoveToSelectedLocal controls the map while a card is selected
          if (selectedLocal !== null) {
               return;
          }

          if (locals.length === 0) {
               return;
          }

          // resolve the case in which a query returns just 1 local, so the map zooms in too closely'
          if (locals.length === 1) {
               const local = locals[0];

               map.setView(
                    [
                         local.latitude as number,
                         local.longitude as number
                    ],
                    13
               );

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
     }, [locals, selectedLocal, map]);

     return null;
}

// makes the map zoom to whatever local is clicked on
function MoveToSelectedLocal({ selectedLocal }: SelectedLocalProps) {
     const map = useMap();

     useEffect(() => {
          if (
               selectedLocal?.latitude === null ||
               selectedLocal?.longitude === null ||
               selectedLocal === null
          ) {
               return;
          }

          map.flyTo(
               [
                    selectedLocal.latitude as number,
                    selectedLocal.longitude as number
               ],
               11,
               {
                    duration: 1.25
               }
          );
     }, [selectedLocal, map]);

     return null;
}

// renders a leaflet map of the area that's been queried
export default function LocalMap({ locals, selectedLocal, setSelectedLocal }: LocalMapProps) {
     const localsWithCoordinates = locals.filter(
          (local) =>
               local.latitude !== null &&
               local.longitude !== null
     );

     const [popupLocal, setPopupLocal] =
          useState<LocalType | null>(null);

     /* Prevent the case where, if we select a marker by clicking on its results card, directly clicking the marker
     to deselect it will render its popup. */
     useEffect(() => {
          if (
               popupLocal &&
               selectedLocal?.id !== popupLocal.id
          ) {
               setPopupLocal(null);
          }
     }, [selectedLocal, popupLocal])

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

               <FitBounds locals={localsWithCoordinates}
                    selectedLocal={selectedLocal} />

               <MoveToSelectedLocal selectedLocal={selectedLocal} />

               {localsWithCoordinates.map((local) => ( // render one marker per latitude, longitude coordinate pair
                    <Marker
                         key={local.id}
                         position={[
                              local.latitude as number,
                              local.longitude as number
                         ]}
                         icon={
                              selectedLocal?.id === local.id
                                   ? selectedIcon
                                   : defaultIcon
                         }
                         zIndexOffset={
                              selectedLocal?.id === local.id
                                   ? 1000
                                   : 0
                         }
                         eventHandlers={{
                              click: () => {
                                   const markerIsSelected =
                                        selectedLocal?.id === local.id;

                                   const popupIsOpen =
                                        popupLocal?.id === local.id;

                                   if (markerIsSelected && !popupIsOpen) {
                                        setPopupLocal(local);
                                        return;
                                   }

                                   if (markerIsSelected && popupIsOpen) {
                                        setSelectedLocal(null);
                                        setPopupLocal(null);
                                        return;
                                   }

                                   setSelectedLocal(local);
                                   setPopupLocal(local);
                              }
                         }}
                    >

                    </Marker>

               ))}

               {popupLocal &&
                    popupLocal.latitude !== null &&
                    popupLocal.longitude !== null && (
                         <Popup
                         position={[
                              popupLocal.latitude,
                              popupLocal.longitude
                         ]}
                         offset={[0, -45]} // manually offset the popup so that it doesn't replace the marker itself
                         eventHandlers={{
                              remove: () => {
                                   setPopupLocal(null); // clicking the marker after closing the popup will reopen the popup
                              }
                         } }
                         >
                              <strong>{popupLocal.name}</strong>
                              <br />
                              {popupLocal.venue}
                              <br />
                              {popupLocal.metro_area}, {popupLocal.subnational}
                              <br />
                              {popupLocal.address}
                         </Popup>
                    )
               }
          </MapContainer>

     );
}

