import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navi from "./Components/Navigation/nav";
import ProfileImg from "./Components/UserProfile/ProfileImg";
import SignupSuccess from "./Components/Success/SignupSuccess";
import reportWebVitals from "./reportWebVitals";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Profile/Home";
import HomeTest from "./Components/Profile/HomeTest";
import PostVerse from "./Components/PostVerse/postverse";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path={"/login"} component={Login} />
        <Route path={"/home"} component={Home} />
        <Route path={"/home-test"} component={HomeTest} />
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
      <Route path="/postverse">
        <PostVerse/>
      </Route>
    </div>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
