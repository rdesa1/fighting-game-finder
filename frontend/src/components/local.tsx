import type { Local as LocalType } from "../types/local.ts";

interface LocalProps {
     local: LocalType;
}

export default function Local({ local }: LocalProps) {
     return (
          <div id= "local">
               <li>
                    <h3>{local.name}</h3>

                    <p>
                         <b>Venue:</b> {local.venue}
                    </p>

                    <p>
                         <b>Address:</b> {local.metro_area}, {local.subnational}, {local.address}
                    </p>

                    <p>
                         <b>Frequency:</b> {local.frequency} on {local.day}
                    </p>

                    <p> <b>Type:</b> {local.event_type}</p>
               </li>
          </div>
     );
}