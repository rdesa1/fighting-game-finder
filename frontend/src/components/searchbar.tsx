// This component renders the searchbars that are used to query the database.

// styling: https://legacy.reactjs.org/docs/faq-styling.html
// events: https://react.dev/learn/responding-to-events

import React, { useState } from "react";
import "../styles/searchbar.css";


interface SearchbarProps {
     onSubmit: (subnational: string, // effectively: onSubmit takes String Subnational, String metroArea (optional) and returns nothing
          metroArea?: string) => void;
}

export default function Searchbar({ onSubmit }
     : SearchbarProps) { // typescript interfaces are syntactically similar to Java interfaces

     const [subnational, setSubnational] = useState("");
     const [metroArea, setMetroArea] = useState("")


     // child event handler to update the search term prop
     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();

          if (!subnational.trim()) { // ensure the subnational input isn't just empty string.
               return;
          }

          onSubmit(subnational, metroArea); // call the function that was passed as a prop from home.tsx
     };

     // We render 2 different search bars, one for the State (mandatory) and one for city (optional)
     return (

          <form
               className="search-form"
               onSubmit={handleSubmit}>
               <input
                    className="search-input"
                    placeholder={"Enter your State"}
                    value={subnational}
                    onChange={(e) => setSubnational(e.target.value)}
                    required
               />
               <input
                    className="search-input"
                    placeholder="Enter your City (optional)"
                    value={metroArea}
                    onChange={(e) => setMetroArea(e.target.value)}

               />
               <button
                    className="search-button"
                    type="submit">
                    Search
               </button>
          </form>
     )

}
