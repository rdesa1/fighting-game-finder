// https://react.dev/learn/importing-and-exporting-components

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home.tsx';
import Search_results from './pages/search_results.tsx';
import Test from './sandbox/test.tsx';
import About from './pages/about.tsx';

function App() {
     //const [count, setCount] = useState(0);

     return (

          <BrowserRouter>
               {/*<nav>*/}
               {/*     <Link to="/search_results">Results</Link>*/}
               {/*</nav>*/}

               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/about" element={<About />} />
               </Routes>
          </BrowserRouter>
     )
}

export default App
