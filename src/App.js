import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navi from "./Components/Navigation/nav";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import SignupSuccess from "./Components/Success/SignupSuccess";
import ProfileImg from "./Components/ProfileImg/ProfileImg";
import CreateBio from "./Components/CreateBio/CreateBio";
import Home from "./Components/Profile/Home";
import Gallery from "./Components/Gallery/Gallery";
import UploadGalmg from "./Components/Reuseables/reuseableupload/UploadGaImg";
import ShareWallComp from "./Components/ShareWall/ShareWallComp";
import GalleryDetail from './Components/GalleryDetail/GalleryDetail';
import Options from './Components/Choose/Options';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/home"} component={Home} />
          <Route exact path={"/nav"} component={Navi} />
          <Route exact path={"/register"} component={SignUp} />
          <Route exact path={"/success"} component={SignupSuccess} />
          <Route exact path={"/createbio"} component={CreateBio} />
          <Route exact path={"/profile_img"} component={ProfileImg} />
          <Route exact path={"/gallery"} component={Gallery} />
          <Route exact path="/gallery/:imageId" component={GalleryDetail} />
          <Route path={"/sharewall"} component={ShareWallComp} />
          <Route path={"/options"} component={Options} />
          <Route path={"/upload"} component={UploadGalmg} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
