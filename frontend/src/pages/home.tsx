// https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form

import axios from "axios";
import { Info } from "lucide-react";
import { useState, useEffect, useRef } from 'react'
import Searchbar from '../components/searchbar.tsx';
import "../styles/footer.css";
import "../styles/home.css";
import { Link } from "react-router";
import Local from "../components/local.tsx";
import type { Local as LocalType } from "../types/local.ts"
import LocalMap from "../components/LocalMap";

export default function Home() {

     // Get the backend URL from a .env variable
     const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

     if (!apiBaseUrl) {
          throw new Error("VITE_API_BASE_URL is not configured.");
     }

     const [results, setResults] = useState<LocalType[]>([]);
     const [hasSearched, setHasSearched] = useState(false);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");
     const [selectedLocal, setSelectedLocal] = useState<LocalType | null>(null);
     const [searchbarKey, setSearchbarKey] = useState(0);

     // create a map of refs
     const cardRefs = useRef(new Map<number, HTMLLIElement>());

     // create a reference to the results panel that contains the results cards
     const resultsPanelRef = useRef<HTMLDivElement>(null);

     // when a marker has been clicked, scroll its associated results card into view
     useEffect(() => {
          if (!selectedLocal) {
               return;
          }

          const selectedCard =
               cardRefs.current.get(selectedLocal.id);

          const resultsPanel = resultsPanelRef.current;

          if (!selectedCard || !resultsPanel) {
               return;
          }

          const cardRectangle =
               selectedCard.getBoundingClientRect();

          const panelRectangle =
               resultsPanel.getBoundingClientRect();

          const scrollPosition =
               resultsPanel.scrollTop +
               cardRectangle.top -
               panelRectangle.top -
               resultsPanel.clientHeight / 2 +
               selectedCard.clientHeight / 2;

          resultsPanel.scrollTo({
               top: scrollPosition,
               behavior: "smooth"
          });

     }, [selectedLocal]);

     // parent event handler to retrieve the search term
     const handleSubmit = async (subnational: string,
          metroArea?: string) => {

          let url =
               `${apiBaseUrl}/search/${encodeURIComponent(subnational)}`;

          if (metroArea?.trim()) {
               url += `/${encodeURIComponent(metroArea)}`;
          }
          try {
               setHasSearched(true);
               setLoading(true);
               setError("");
               setResults([]);
               setSelectedLocal(null);

               const res = await axios.get(url, {
                    timeout: 5000,
               });

               setResults(res.data.results); // useState is used to update the search term variable

          }
          catch (err) {
               console.error(err);
               setError("Something went wrong while searching. Please try again.");
          } finally {
               setLoading(false);
          }
     };

     // Clicking the app's title will clear all search parameters, effectively returning home
     const handleReturnHome = () => {
          setResults([]);
          setHasSearched(false);
          setLoading(false);
          setError("")
          setSelectedLocal(null);

          cardRefs.current.clear();

          // recreate the searchbar
          setSearchbarKey((currentKey) => currentKey + 1);

          window.scrollTo({
               top: 0,
               behavior: "smooth"
          });
     };

     return (

          <>
               <section
                    className={
                         hasSearched
                              ? "search-hero"
                              : "search-hero search-hero-initial"
                    }
               >
                    <div className="search-hero-content">
                         <button
                              type="button"
                              className="home-hero-button"
                              onClick={(event) => {
                                   handleReturnHome();
                                   event.currentTarget.blur(); // hide the outline around the hero after clicking it 
                              }}
                              aria-label="Return to the home page"
                         >
                              <h1>Fighting Game Finder</h1>


                              <p className="search-hero-subtitle">
                                   Find your local fighting game community
                              </p>
                         </button>

                         <Searchbar
                              key={searchbarKey}
                              onSubmit={handleSubmit}
                         />
                    </div>
               </section>

               <Link
                    to="/about"
                    className="about-button"
               >
                    <Info size={17}></Info>
                    About
               </Link>

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
                         <div className="results-panel"
                              ref={resultsPanelRef}>
                              <ul className="local-list">
                                   {results.map((local) => (
                                        <Local
                                             key={local.id}
                                             ref={(element) => {
                                                  if (element) {
                                                       cardRefs.current.set(local.id, element);
                                                  }
                                                  else {
                                                       cardRefs.current.delete(local.id);
                                                  }
                                             }}
                                             local={local}
                                             selected={selectedLocal?.id === local.id}
                                             onClick={() => {
                                                  setSelectedLocal((currentLocal) =>
                                                       currentLocal?.id === local.id
                                                            ? null
                                                            : local
                                                  );
                                             }
                                             }
                                        />

                                   ))}
                              </ul>
                         </div>

                         <div className="map-panel">
                              <LocalMap locals={results}
                                   selectedLocal={selectedLocal}
                                   setSelectedLocal={setSelectedLocal}
                              />
                         </div>
                    </div>
               )}

               {!hasSearched && (
                    <footer id="home-footer">
                         <p className="developer-links">
                              <span>Connect with the developer:</span>

                              <a
                                   href="https://www.linkedin.com/in/richarddesa/"
                                   target="_blank"
                                   rel="noopener noreferrer"
                              >
                                   LinkedIn
                              </a>

                              <a
                                   href="https://github.com/rdesa1/fighting-game-finder"
                                   target="_blank"
                                   rel="noopener noreferrer"
                              >
                                   GitHub
                              </a>
                         </p>
                    </footer>
               )}
               

          </>
     );
}