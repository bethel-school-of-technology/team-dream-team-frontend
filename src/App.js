import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Navi from "./Components/Navigation/nav";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import SignupSuccess from "./Components/Success/SignupSuccess";
import ProfileImg from "./Components/ProfileImg/ProfileImg";
import CreateBio from "./Components/CreateBio/CreateBio";
import Home from "./Components/Profile/Home";
import HomeTest from "./Components/Profile/tests/HomeTest";
import PostVerse from "./Components/PostVerse/postverse";
import GetPostVerse from "./Components/GetVerse/getPostVerse";
import Gallery from "./Components/Gallery/Gallery";
import UploadGalmg from "./Components/Reuseables/UploadGaImg";
import TestShareWallComp from "./Components/ShareWall/tests/TestShareWallComp";
import ShareWallComp from "./Components/ShareWall/ShareWallComp";

// import GreenMount from "./Components/Gallery/components/GreenMount";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//gallery imports
import Cross from "./Components/Gallery/posts/Cross";
import Waterfall from "./Components/Gallery/posts/Waterfall";
import Freedom from "./Components/Gallery/posts/Freedom";

import CrossPost from "./Components/Gallery/get/CrossPost";
import WaterfallPost from "./Components/Gallery/get/WaterfallPost";
import FreedomPost from "./Components/Gallery/get/FreedomPost";

function App() {
  const imagePostRoutes = [
    { name: "cross", component: CrossPost },
    { name: "freedom", component: FreedomPost },
    { name: "waterfall", component: WaterfallPost },
  ];

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
          <Route exact path={"/gallery"} component={Gallery} />
          <Route exact path={"/postverse"} component={PostVerse} />
          <Route exact path={"/getimage/:id"} component={GetPostVerse} />
          <Route exact path={"/create"} component={PostVerse} />
          <Route path={"/getverse/:id"} component={GetPostVerse} />
          <Route path={"/testsharewall"} component={TestShareWallComp} />
          <Route path={"/sharewall"} component={ShareWallComp} />

          <Route path={"/upload"} component={UploadGalmg} />

          {/* routes for gallery */}
          <Route path={"/waterfall"} component={Waterfall} />
          <Route path={"/cross"} component={Cross} />
          <Route path={"/freedom"} component={Freedom} />

          {/* <Route path={"/getinputwaterfall/:id"} component={WaterfallPost} />
          <Route path={"/getinputcross/:id"} component={CrossPost} />
          <Route path={"/getinputfreedom/:id"} component={FreedomPost} /> */}

          {imagePostRoutes.map(({ component, name }) => (
            <Route
              key={name} path={`/getinput${name}/:id`} component={component}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}
export default App;
