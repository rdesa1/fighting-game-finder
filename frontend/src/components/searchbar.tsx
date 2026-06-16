// styling: https://legacy.reactjs.org/docs/faq-styling.html
// events: https://react.dev/learn/responding-to-events

import React, { useState } from "react";

interface SearchbarProps {
     name: string;
     placeholder: string;
     onSubmit: (value: string) => void;
}

export default function Searchbar({ name, placeholder, onSubmit }
     : SearchbarProps) { // typescript interfaces are syntactically similar to Java interfaces

     const [input, setInput] = useState("")


     // child event handler to update the search term prop
     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          onSubmit(input);
     };


     return (
          
          <form onSubmit={handleSubmit}>
               <input
                    name={name}
                    placeholder={placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
               />

               <button type="submit">
                    Search
               </button>
          </form>
     )
                   
}
