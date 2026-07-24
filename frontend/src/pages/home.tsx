// https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form

import axios from "axios";
import React, { useState } from 'react'
import Searchbar from '../components/searchbar.tsx';
import "../styles/home.css";
import Local from "../components/local.tsx";
import type { Local as LocalType } from "../types/local.ts"
import LocalMap from "../components/LocalMap";

export default function Home() {

     const [results, setResults] = useState<LocalType[]>([]);
     const [hasSearched, setHasSearched] = useState(false);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");
     const [selectedLocal, setSelectedLocal] = useState<LocalType | null>(null);

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
               setError("");
               setResults([]);

               const res = await axios.get(url, {
                    timeout: 5000,
               });

               console.log(res.data);
               setResults(res.data.results); // useState is used to update the search term variable
               setHasSearched(true);
          }
          catch (err) {
               console.error(err);
               setError("Something went wrong while searching. Please try again.");
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

               {error && !loading && (
                    <p className="error-message">
                         {error}
                    </p>
               )}

               {hasSearched && !loading && results.length > 0 && (
                    <p className="result-count">
                         {results.length} results found
                    </p>
               )}

               {hasSearched && !loading && !error && results.length === 0 && (
                    <p className="no-results">
                         No active locals found. Try another state or metro area.
                    </p>
               )}

               {results.length > 0 && (
                    <div className="search-results">
                         <div className="results-panel">
                              <ul className="local-list">
                                   {results.map((local) => (
                                        <Local
                                             key={local.id}
                                             local={local}
                                             onClick={() => setSelectedLocal(local)}
                                        />

                                   ))}
                              </ul>
                         </div>

                         <div className="map-panel">
                              <LocalMap locals={results}
                                   selectedLocal={selectedLocal} />
                         </div>
                    </div>
               )}

          </>
     );
}