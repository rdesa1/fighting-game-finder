// https://www.geeksforgeeks.org/reactjs/how-to-fetch-data-from-an-api-in-reactjs/

import React, { useState, useEffect, Component } from 'react'
import axios from "axios";

export default function Search_results() {
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

