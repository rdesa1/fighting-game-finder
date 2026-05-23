// https://www.geeksforgeeks.org/reactjs/how-to-fetch-data-from-an-api-in-reactjs/

import React, { useState, useEffect } from 'react'

const Results = () => {
     const [items, setItems] = useState([]);
     const [dataIsLoaded, setDataIsLoaded] = useState(false);

     useEffect(() => {
          fetch("http://127.0.0.1:5000/search")
               .then((res) => res.json())
               .then((json) => {
                    setItems(json);
                    setDataIsLoaded(true);
               });
     });
     if (!dataIsLoaded) {
          return (
               <div>
                    <h1>Please wait some time...</h1>
               </div>
          );
     }
}


export default function Search_results() {
     return (
          <div className="container">
               {items.map((item) => (
                    <div className="item" key={item.id}>
                         <ol>
                              <div>
                                   <strong>User_Name: </strong>
                                   {item.username},
                              </div>
                              <div>Full_Name: {item.name}</div>
                              <div>User_Email: {item.email}</div>
                         </ol>
                    </div>
               ))}
          </div>
     );
}

