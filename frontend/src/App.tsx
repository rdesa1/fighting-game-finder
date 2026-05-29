// https://react.dev/learn/importing-and-exporting-components

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Searchbar from './components/searchbar.tsx'
import Search_results from './pages/search_results.tsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/home.tsx'

function App() {
     //const [count, setCount] = useState(0);

     return (

          <BrowserRouter>
               <nav>
                    <Link to="/search_results">Results</Link>
               </nav>

               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search_results" element={<Search_results />} />
               </Routes>
          </BrowserRouter>
     )
}

export default App
