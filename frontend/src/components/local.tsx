import type { Local as LocalType } from "../types/local.ts";
import "../styles/local.css";

interface LocalProps {
     local: LocalType;
     onClick: () => void;
}

export default function Local({ local, onClick }: LocalProps) {
     return (
          <li className="local-card"
               onClick={onClick}
               onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
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

          </li>
     );
}