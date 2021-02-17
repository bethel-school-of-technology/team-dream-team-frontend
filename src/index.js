import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import Login from "./Components/Login/Login";
// import Logintest from './Components/Login/Logintest';
import Navi from "./Components/Navigation/nav";
import ProfileImg from "./Components/UserProfile/ProfileImg";
// import SignupTest from "./Components/SignUp/Signuptest";
import SignupSuccess from "./Components/Success/SignupSuccess";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Profile/Home";


ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path={"/login"} component={Login} />
        <Route path={"/home"} component={Home} />
      </Switch>

      <Route path="/nav">
        <Navi />
      </Route>
      <Route path="/profile_img">
        <ProfileImg />
      </Route>
      <Route path="/register">
        <SignUp />
      </Route>
      <Route path="/success">
        <SignupSuccess />
      </Route>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
