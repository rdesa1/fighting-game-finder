import { useState } from 'react';

interface test_searchbar_props {
     onSubmit: (value: string) => void;
}

export default function Test_searchbar({onSubmit} : test_searchbar_props) {


     const [searchTerm, setSearchTerm] = useState("");

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();

          onSubmit(searchTerm)
     }


     return (
          <search>
               <form onSubmit={handleSubmit }>
                    <input type="text"
                         name="searchTerm"
                         id="test"
                         placeholder="search me twin!"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)} />
               </form>
          </search>
     )
}