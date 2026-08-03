import { forwardRef } from 'react'; // for giving every results card a ref
import type { Local as LocalType } from "../types/local.ts";
import { MapPin, ExternalLink } from "lucide-react";
import "../styles/local.css";

interface LocalProps {
     local: LocalType;
     onClick: () => void;
     selected: boolean;
}

const Local = forwardRef<HTMLLIElement, LocalProps>( // HTMLLIElement means the ref points to an HTML list item
     ({ local, onClick, selected }, ref) => {


          // Create a link to google maps for non-null addresses
          const googleMapsUrl =
               `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(local.address)
               }`;

          // Check whether a local has coordinates. If not, display a message saying so.
          const hasCoordinates =
               local.latitude !== null &&
               local.longitude !== null;

          return (
               <li
                    ref={ref}
                    className={
                         selected
                              ? "local-card selected"
                              : "local-card"
                    }
                    onClick={onClick}
                    onKeyDown={(event) => {
                         if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onClick();
                         }
                    }
                    }
                    role="button"
                    tabIndex={0}
               >
                    <h3>{local.name}</h3>

                    <div className="local-section">
                         <strong>Venue: </strong>
                         <span>{local.venue}</span>

                    </div>

                    <div className="local-section">
                         <strong>Address: </strong>
                         <span>{local.metro_area}, {local.subnational}, {local.address}</span>
                    </div>

                    <div className="local-section">
                         <strong>Schedule: </strong>
                         <span>{local.frequency} on {local.day}</span>

                    </div>

                    <div className="local-section">
                         <strong>Type: </strong>
                         <span>{local.event_type}</span>
                    </div>

                    <a
                         className="maps-button"
                         href={googleMapsUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         onClick={(event) => event.stopPropagation()}
                    >
                         <MapPin size={18}
                              strokeWidth={2} />
                         <span> Get directions in Google Maps </span>
                         <ExternalLink size={16}
                              strokeWidth={2} />
                    </a>

                    {!hasCoordinates && (
                         <div className="map-location-unavailable">
                              Map location unavailable
                         </div>
                    )}

               </li>
          );
     }
);
export default Local;