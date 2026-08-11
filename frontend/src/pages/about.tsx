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

               <section className="about-section">
                    <h2>What is Fighting Game Finder?</h2>

                    <p>
                         Fighting Game Finder helps users discover fighting game communities and local events in their area. <br />
                         Searches are primarily done by state, and can be optionally narrowed by metro area. <br />
                         Results are viewable on an interactive map, enabling users to ascertain directions to their venue of choice.
                    </p>
               </section>


               <section className="about-section">
                    <h2>About the Project</h2>

                    <p>
                         Fighting Game Finder is a full-stack web application built with React and TypeScript on the frontend,
                         Flask on the backend, and PostgreSQL for storing local event data. <br />
                         The application provides a REST API for searching locals and uses Leaflet with OpenStreetMap to visualize venue locations.
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
                         <br/>
                         Venue locations are displayed using Leaflet for rendering the map, and OpenStreetMap for the map tileset.
                    </p>
               </section>

          </main>
     );
}