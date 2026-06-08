// https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form

import React, { useState, useEffect, Component } from 'react'
import axios from "axios";
import Searchbar from '../components/searchbar.tsx';

export default function Home() {

     //const [results, setResults] = useState<any[]>([]);
     const [results, setResults] = useState<(string | null)[][]>([]);

     // parent event handler to retrieve the search term
     const handleSubmit = async (searchTerm: string) => { // notice searchTerm is passed as arg

          try {
               const res = await axios.get(
                    `http://127.0.0.1:5000/search/${searchTerm}`,
                    { timeout: 5000 }
               );

               console.log(res.data);
               setResults(res.data[1]); // useState is used to update the search term variable
          }
          catch (err) {
               console.error(err);
          }
     };

     return (

          <>
               <Searchbar
                    name="location"
                    placeholder="Enter your state!"
                    onSubmit={handleSubmit}
               />

               <ul>
                    {results.map((local, index) => (
                         <li key={index}>
                              <h3>{local[0]}</h3>
                              <p>{local[3]}, {local[2]}</p>
                              <p>{local[4]}</p>
                              <p>{local[5]}</p>
                              <p>{local[6]} on {local[7]}</p>
                         </li>
                    ))}
               </ul>
          </>
     );
}