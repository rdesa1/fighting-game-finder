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

               <h1>About Fighting Game Finder</h1>

               <p>
                    Fighting Game Finder helps users discover
                    fighting game locals and tournaments in their area.
               </p>
          </main>
     );
}