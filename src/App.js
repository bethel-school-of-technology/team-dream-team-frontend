import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navi from "./Components/Navigation/nav";
import ProfileImg from "./Components/UserProfile/ProfileImg";
import SignupSuccess from "./Components/Success/SignupSuccess";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Profile/Home";
import HomeTest from "./Components/Profile/HomeTest";
import PostVerse from "./Components/PostVerse/postverse";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/home"} component={Home} />
            <Route exact path={"/home-test"} component={HomeTest} />
            <Route exact path={"/nav"} component={Navi} />
            <Route exact path={"/profile_img"} component={ProfileImg} />
            <Route exact path={"/register"} component={SignUp} />
            <Route exact path={"/success"} component={SignupSuccess} />
            <Route exact path={"/postverse"} component={PostVerse} />
          </Switch>
          </Router>
      </div>
    );
}
export default App;

         