import type { Local as LocalType } from "../types/local.ts";

interface LocalProps {
     local: LocalType;
}

export default function Local({ local }: LocalProps) {
     return (
          <li className="local-card">
               <h3>{local.name}</h3>

               <div className="local-section">
                    <p>
                         <strong>Venue: </strong>
                         {local.venue}
                    </p>
               </div>

               <div className="local-section">
                    <p>
                         <strong>Address: </strong>
                         {local.metro_area}, {local.subnational}, {local.address}
                    </p>
               </div>

               <div className="local-section">
                    <p>
                         <strong>Schedule: </strong>
                         {local.frequency} on {local.day}
                    </p>
               </div>

               <div className="local-section">
                    <p>
                         <strong>Type: </strong>
                         {local.event_type}
                    </p>
               </div>

          </li>
     );
}