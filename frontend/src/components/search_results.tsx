// https://www.geeksforgeeks.org/reactjs/how-to-fetch-data-from-an-api-in-reactjs/

import React, { useState, useEffect } from 'react'
import axios from "axios";

const Results = () => {
     const [items, setItems] = useState([]);
     const [dataIsLoaded, setDataIsLoaded] = useState(false);

     useEffect(() => {
          axios
               .get("https://jsonplaceholder.typicode.com/users")
               .then((res) => {
                    setItems(res.data);
                    setDataIsLoaded(true);
               });
     }, []);
     if (!dataIsLoaded) {
          return (
               <div>
                    <h1>Please wait some time....</h1>
               </div>
          );
     }
}

export default function Search_results() {
     return (
          <div className="search_results">
               <h1 className="geeks">GeeksforGeeks</h1>
               <h3>Fetch data from an API in React</h3>
               <div className="container">
                    {items.map((item) => (
                         <div className="item" key={item.id}>
                              <ol>
                                   <div>City: {item.city}</div>
                              </ol>
                         </div>
                    ))}
               </div>
          </div>
     );
};


