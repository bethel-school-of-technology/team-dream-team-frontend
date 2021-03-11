import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Navi from "../Navigation/nav";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./css/sharewall.css";
import axios from "axios";
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
  }, []);

  return (
    <div className="getcross">
      <Container className=" mt-5 ml-auto mr-auto">
        <div className="mt-4">
          <Navi />
        </div>
        <h1 className="text-center">
          ShareVerse
          <span className="text-success"> Wall</span>
        </h1>
          <div className="p-3 mb-5 bg-light rounded">
             <div className="text-center"><Cards /></div>
          </div>
      </Container>
    </div>
  );
};

export default ShareWallComp;
