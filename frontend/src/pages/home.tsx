// https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form

import React, { useState, useEffect, Component } from 'react'
import axios from "axios";
import Searchbar from '../components/searchbar.tsx';

export default function Home() {

     //const [searchTerm, setSearchTerm] = useState("");
     let searchTerm: string;


     const handleSubmit = (event) => {
          event.preventDefault();
          console.log(event.target[0].value)

          searchTerm = event.target[0].value;

          const fetchAPI = async () => {
               const res = await axios.get(`http://127.0.0.1:5000/search/${searchTerm}`, {
                              timeout: 5000, // timeouts after 5 second wait
               });
               console.log(res.data);
          }

          fetchAPI();


     }


     //const handleSubmit = (e) => {

     //     // Prevent the browser from reloading the page
     //     e.preventDefault();

     //     searchTerm = e.target.value;

     //     // fetch data from backend
     //     const fetchAPI = async () => {
     //          const res = await axios.get(`http://127.0.0.1:5000/search/${searchTerm}`, {
     //               timeout: 5000, // timeouts after 5 second wait
     //          });
     //          console.log(res.data);
     //     }
     //     fetchAPI();
     //}

     //const handleSubmit = (e) => {

     //     // Prevent the browser from reloading the page
     //     e.preventDefault();

     //     // Read the form data
     //     //const form = e.target;
     //     //const formData = new FormData(form);

     //     searchTerm = e.target.value;

     //     // fetch data from backend
     //     const fetchAPI = async () => {
     //          const res = await axios.get(`http://127.0.0.1:5000/search/${searchTerm}`, {
     //               timeout: 5000, // timeouts after 5 second wait
     //          });
     //          console.log(res.data);
     //     }
     //     fetchAPI();
     //}


     // fetch data from backend
     //const fetchAPI = async () => {
     //     const res = await axios.get(`http://127.0.0.1:5000/search/${searchTerm}`, {
     //          timeout: 5000, // timeouts after 5 second wait
     //     });
     //     console.log(res.data);
     //}

     //useEffect(() => {
     //     fetchAPI()
     //}, [])


     return (
          <Searchbar
               name="location"
               placeholder="Enter your state!"
               onSubmit={handleSubmit}
          />
     )
}