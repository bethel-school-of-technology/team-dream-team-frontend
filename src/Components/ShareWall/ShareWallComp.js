import React, {useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Navcp from "../Navigation/navcp";
import Container from "react-bootstrap/Container";
import "./css/sharewall.css";
import Cards from "./Cards";

const ShareWallComp = () => {
  const history = useHistory();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      console.log("redirect to login");
      history.push("/");
    }
    if (window.localStorage.getItem("token")) {
      const isMyTokenExpired = isExpired(window.localStorage.getItem("token"));
      console.log(isMyTokenExpired);

      if (isMyTokenExpired) {
        console.log("redirect to login");
        history.push("/");
      }

      const myDecodedToken = decodeToken(window.localStorage.getItem("token"));
      console.log(myDecodedToken);
    }
    // loadimg();
  }, [history]);

  return (
    <div className="getcross">
      <Container className="shareContainer mt-5 ml-auto mr-auto">
        <div className="mt-4">
          <Navcp />
        </div>
        <h1 className="text-center mt-2">
          ShareVerse
          <span className="text-success"> Wall</span>
        </h1>
          <div className="holder p-3 mb-5 rounded">
             <div className="text-center"><Cards />
           </div>
          </div>
      </Container>
    </div>
  );
};

export default ShareWallComp;
