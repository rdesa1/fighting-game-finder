// https://www.geeksforgeeks.org/reactjs/how-to-fetch-data-from-an-api-in-reactjs/

import React, { useState, useEffect, Component } from 'react'
import axios from "axios";
import Searchbar from '../components/searchbar.tsx'

export default function Search_results() {

     let searchTerm = "california";

     // fetch data from backend
     const fetchAPI = async () => {
          const res = await axios.get(`http://127.0.0.1:5000/search/${searchTerm}`, {
               timeout: 5000, // timeouts after 5 second wait
          });
          console.log(res.data);
     }

     useEffect(() => {
          fetchAPI()
     }, [])

     return (
          <h1>Check the console for results!</h1>
     )
}