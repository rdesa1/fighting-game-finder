// https://stackoverflow.com/questions/71598967/how-to-get-the-value-of-input-tag-onsubmit-without-using-onchange-in-react-js-ty
// https://stackoverflow.com/questions/77121358/how-do-i-pass-form-input-values-from-child-component-to-the-parent-component-in

// ^ second link is the most helpful guide so far.
// To summarize, learn the attributes of the <input> DOM element.
// We were not setting value equal to anything so there was literally no
// target.value to retrieve

import { useState } from 'react';
import axios from 'axios';
import Test_searchbar from '../sandbox/test_searchbar.tsx';

export default function Test() {

     const handleSearch = async (searchTerm: string) => {

          try {
               const res = await axios.get(
                    `http://127.0.0.1:5000/search/${searchTerm}`,
                    { timeout: 5000 }
               );

               console.log(res.data);
          }
          catch (err) {
               console.error(err);
          }
     }

     return (
          <Test_searchbar onSubmit={handleSearch} />
     )

}