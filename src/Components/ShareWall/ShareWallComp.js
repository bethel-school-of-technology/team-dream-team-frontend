import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Navi from "../Navigation/nav";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import "./sharewall.css";
import axios from "axios";

import Cards from "./Cards";

const ShareWallComp = ({ match }) => {
  const [url, setUrl] = useState([]);
  const history = useHistory();

    const loadimg = async () => {
      try {
        let res = await axios.get(
          `http://localhost:5000/geturls/${(match.params.name="grace")}`
        );
        setUrl(res.data.map((d) => d.url));
      } catch (error) {
        console.log(error);
      }
    };

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
    loadimg();
  }, []);

  return (
    <div className="getcross">
      <Container className="mt-5 ml-auto mr-auto">
        <div className="mt-4">
          <Navi />
        </div>
        <h1 className="text-center">
          ShareVerse
          <span className="text-success"> Wall</span>
        </h1>
        <div>
          <div className="shadow p-3 mb-5 bg-white rounded">
            <Card className="bg-dark shadow text-white">
              {url
                .filter((name) => name.includes("grace"))
                .map((urlData) => (
                  <Card.Img key={url.name} src={urlData.url} alt="Card image" />
                ))}
              <Card.ImgOverlay>
                <div className="text-center"><Cards /></div>
              </Card.ImgOverlay>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShareWallComp;
