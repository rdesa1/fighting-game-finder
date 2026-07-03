// https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form

import React, { useState } from 'react'
import axios from "axios";
import Searchbar from '../components/searchbar.tsx';
import Local from "../components/local.tsx";
import type { Local as LocalType } from "../types/local.ts"

export default function Home() {

     const [results, setResults] = useState<LocalType[]>([]);
     const [hasSearched, setHasSearched] = useState(false);
     const [loading, setLoading] = useState(false);

     // parent event handler to retrieve the search term
     const handleSubmit = async (subnational: string,
          metroArea?: string) => {

          let url =
               `http://127.0.0.1:5000/search/${encodeURIComponent(subnational)}`;

          if (metroArea?.trim()) {
               url += `/${encodeURIComponent(metroArea)}`;
          }
          try {
               setLoading(true);

               const res = await axios.get(url, {
                    timeout: 5000,
               });

               console.log(res.data);
               setResults(res.data.results); // useState is used to update the search term variable
               setHasSearched(true);
          }
          catch (err) {
               console.error(err);
          } finally {
               setLoading(false);
          }
     };

     return (

          <>
               <Searchbar
                    onSubmit={handleSubmit}
               />

               {loading && (
                    <p className="loading-message">
                         Searching...
                    </p>
               )}

               {hasSearched && !loading && results.length > 0 && (
                    <p className="result-count">
                         {results.length} results found
                    </p>
               )}

               {hasSearched && !loading && results.length === 0 && (
                    <p className="no-results">
                         No active locals found. Try another state or metro area.
                    </p>
               )}


               <ul className="local-list">
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