// styling: https://legacy.reactjs.org/docs/faq-styling.html
// events: https://react.dev/learn/responding-to-events

import React, { useState} from "react";
import axios from "axios";

interface SearchbarProps {
     name: string
     placeholder: string
}

export default function Searchbar<SearchbarProps>({ name, placeholder, onSubmit}) {

     const [input, setInput] = useState("")

     return (

          <search>
               <form onSubmit={onSubmit }>
                    <input name={name} placeholder={placeholder} value={input}
                         onChange={(e) => setInput(e.target.value)}>
                    </input>
               </form >
          </search >

     );
}
