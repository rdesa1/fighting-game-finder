import type { Local as LocalType } from "../types/local.ts";
import "../styles/local.css";

interface LocalProps {
     local: LocalType;
}

export default function Local({ local }: LocalProps) {
     return (
          <li className="local-card">
               <h3>{local.name}</h3>

               <div className="local-section">
                    <strong>Venue: </strong>
                    {local.venue}
               </div>

               <div className="local-section">
                    <strong>Address: </strong>
                    {local.metro_area}, {local.subnational}, {local.address}
               </div>

               <div className="local-section">
                    <strong>Schedule: </strong>
                    {local.frequency} on {local.day}

               </div>

               <div className="local-section">
                    <strong>Type: </strong>
                    {local.event_type}
               </div>

          </li>
     );
}