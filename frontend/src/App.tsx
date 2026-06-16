// https://react.dev/learn/importing-and-exporting-components

import { useState, useEffect } from 'react'
import './App.css'
import Searchbar from './components/searchbar.tsx'
import Search_results from './pages/search_results.tsx'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router'
import Home from './pages/home.tsx'
import Test from './pages/test.tsx'

function App() {
     //const [count, setCount] = useState(0);

     return (

          <BrowserRouter>
               {/*<nav>*/}
               {/*     <Link to="/search_results">Results</Link>*/}
               {/*</nav>*/}

               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search_results" element={<Search_results />} />
                    <Route path="/test" element={<Test /> } />
               </Routes>
          </BrowserRouter>
     )
}

export default App
