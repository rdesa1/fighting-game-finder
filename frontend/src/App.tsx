// https://react.dev/learn/importing-and-exporting-components

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Searchbar from './components/searchbar.tsx'
import { Search_results } from './pages/search_results.tsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router';

function App() {
     //const [count, setCount] = useState(0);

     //const fetchAPI = async () => {
     //     const res = await axios.get("http://127.0.0.1:5000/search/massachusetts");
     //     console.log(res.data);
     //}

     //useEffect(() => {
     //     fetchAPI()
     //},[])

     return (

          <BrowserRouter>
               <nav>
                    <Link to="/search_results">Results</Link>
               </nav>

               <Routes>
                    <Route path="/" element={<Searchbar />} />
                    <Route path="/search_results" element={<Search_results />} />
               </Routes>
          </BrowserRouter>



          //<BrowserRouter>
          //     <div>

          //          <Searchbar />     

          //     </div>
          //</BrowserRouter>
     )
}

export default App
