// https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form

import React, { useState, useEffect, Component } from 'react'
import axios from "axios";
import Searchbar from '../components/searchbar.tsx';
import Local from "../components/local.tsx";
import type {Local as LocalType } from "../types/local.ts"

export default function Home() {

     const [results, setResults] = useState<LocalType[]>([]);

     // parent event handler to retrieve the search term
     const handleSubmit = async (searchTerm: string) => { // notice searchTerm is passed as arg

          try {
               const res = await axios.get(
                    `http://127.0.0.1:5000/search/${searchTerm}`,
                    { timeout: 5000 }
               );

               console.log(res.data);
               setResults(res.data.results); // useState is used to update the search term variable
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
                         <Local
                              key={index}
                              local={local}
                         />
                    ))}
               </ul>
          </>
     );
}