// https://www.geeksforgeeks.org/reactjs/how-to-fetch-data-from-an-api-in-reactjs/

import React, { useState, useEffect, Component } from 'react'
import axios from "axios";



export function Search_results() {
     const [count, setCount] = useState(0);

     const fetchAPI = async () => {
          const res = await axios.get("http://127.0.0.1:5000/search/massachusetts");
          console.log(res.data);
     }

     useEffect(() => {
          fetchAPI()
     }, [])

     return (
          <h1>Check the console for results!</h1>
     )
}



















//export default function Search_results() {

//     const [count, setCount] = useState(0);

//     const fetchAPI = async () => {
//          const res = await axios.get("http://127.0.0.1:5000/search");
//          console.log(res.data);
//     };

//     useEffect(() => {
//          fetchAPI();
//     }, [])

//}





//const Search_results = () => {
//     const [data, setData] = useState([]);
//     useEffect(() => {
//          axios
//               .get("http://127.0.0.1:5000/search/massachusetts")
//               .then((response) => setData(response.data))
//               .catch((err) => console.error(err));
//     }, []);
//     return <pre>{JSON.stringify(data, null, 2)}</pre>;
//};
//export default Search_results



















//useEffect(() => {
//     const getResults = async () => {
//          try {
//               const res = await api.
//          }
//     }
//})


//export default axios.create({
//     baseURL: 'http://127.0.0.1:5000'
//});

//class Search_Results extends Component {
//     constructor() {
//          super();
//          api.get('/').then(res => {
//               console.log(res.data)
//          })
//     }
//}

















//const Results = () => {
//     const [items, setItems] = useState([]);
//     const [dataIsLoaded, setDataIsLoaded] = useState(false);

//     useEffect(() => {
//          axios
//               .get("https://jsonplaceholder.typicode.com/users")
//               .then((res) => {
//                    setItems(res.data);
//                    setDataIsLoaded(true);
//               });
//     }, []);
//     if (!dataIsLoaded) {
//          return (
//               <div>
//                    <h1>Please wait some time....</h1>
//               </div>
//          );
//     }
//}

//export default function Search_results() {
//     return (
//          <div className="search_results">
//               <h1 className="geeks">GeeksforGeeks</h1>
//               <h3>Fetch data from an API in React</h3>
//               <div className="container">
//                    {items.map((item) => (
//                         <div className="item" key={item.id}>
//                              <ol>
//                                   <div>City: {item.city}</div>
//                              </ol>
//                         </div>
//                    ))}
//               </div>
//          </div>
//     );
//};


