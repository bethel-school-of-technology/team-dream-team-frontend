import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import Login from './Components/Login/Login';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// copy code from line 18-20 paste code in side div tags directly under line 20
// on line 21 replace "exact path" with "path" (remove the word exact) and replace "/" with "signup"
// import Signup componnet 
// on line 22 replace "Login" with "Signup" - then go back to signup component to work on it


ReactDOM.render(
 <Router>
   <div>
     <Route exact path="/">
       <Login />
     </Route>

   </div>
 </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
