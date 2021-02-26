import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navi from "./Components/Navigation/nav";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import SignupSuccess from "./Components/Success/SignupSuccess";
import ProfileImg from "./Components/UploadProfileImg/ProfileImg";
import CreateBio from "./Components/CreateBio/CreateBio";
import Home from "./Components/Profile/Home";
import HomeTest from "./Components/Profile/HomeTest";
import PostVerse from "./Components/PostVerse/postverse";
import GetPostVerse from "./Components/PostVerse/getPostVerse";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


function App() {

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route exact path={"/home"} component={Home} />
            <Route exact path={"/home-test"} component={HomeTest} />
            <Route exact path={"/nav"} component={Navi} />
            <Route exact path={"/register"} component={SignUp} />
            <Route exact path={"/success"} component={SignupSuccess} />
            <Route exact path={"/createbio"} component={CreateBio} />
            <Route exact path={"/profile_img"} component={ProfileImg} />
            <Route exact path={"/postverse"} component={PostVerse} />
            <Route exact path={"/getimage/:id"} component={GetPostVerse} />
            <Route exact path={"/create"} component={PostVerse} />
            <Route path={"/getverse/:id"} component={GetPostVerse} />


          </Switch>
          </Router>
      </div>
    );
}
export default App;

         