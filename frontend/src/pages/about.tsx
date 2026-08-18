import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import "../styles/about.css";

export default function About() {


     return (
          <main className="about-page">

               <Link
                    to="/"
                    className="back-link"
               >

                    <ArrowLeft size={18} />
                    <span>Back</span>
               </Link>

               <section className="about-section" id="what-is">
                    <h2>What is Fighting Game Finder?</h2>

                    <p>
                         Fighting Game Finder helps users discover fighting game communities within the United States.
                         Searches are primarily done by state, and can be optionally narrowed by metro area.
                         Results are viewable on an interactive map, enabling users to compare distances between venues.
                         Users may also obtain directions to their venue of choice through Google Maps.
                    </p>
               </section>


               <section className="about-section">
                    <h2>Technical Details</h2>

                    <p>
                         Fighting Game Finder is a full-stack web application built with React on the frontend, 
                         Flask on the backend, and PostgreSQL for storing local event data.
                         The application provides a REST API for searching locals, and uses Leaflet with OpenStreetMap to visualize venue locations.

                    </p>
               </section>

               <section className="about-section">
                    <h2>Data & Mapping</h2>

                    <p>
                         Local event data was obtained from a community-maintained dataset shared publicly by <a id="dataset-link"
                              href="https://x.com/ultradavid/status/1946352632265916669"
                              target="_blank"
                              rel="noopener noreferrer"
                         >
                              UltraDavid on Twitter.
                         </a>
                         <br />

                         Currently, only active communities that are located in the United States of America are searchable from the dataset.  
                    </p>
               </section>

               <section className="about-section">
                    <h2>Future Improvements</h2>

                    <p>
                         Planned features include expanding search results to include locations from around the world.
                         Additionally, options to filter results, such as by game or schedule, are planned.
                    </p>
               </section>

               <section className="about-section">
                    <h2>Connect with the Developer</h2>

                    <p id="developer-links">
                         <a id="linkedin-link"
                              href="https://www.linkedin.com/in/richarddesa/"
                              target="_blank"
                              rel="noopener noreferrer"
                         >
                              LinkedIn
                         </a>
                         
                         <a id="github-link"
                              href="https://github.com/rdesa1/fighting-game-finder"
                              target="_blank"
                              rel="noopener noreferrer"
                         >
                              GitHub
                         </a>
                    </p>
               </section>

          </main>
     );
}