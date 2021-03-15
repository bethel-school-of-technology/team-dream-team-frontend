import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Navcp from "../Navigation/navcp";
import "../Gallery/css/gallery.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";

import axios from "axios";

const Gallery = () => {
  const [url, setUrl] = useState([]);
  const history = useHistory();

  const loadImage = async () => {
    try {
      let res = await axios.get("http://ec2-18-208-220-147.compute-1.amazonaws.com:8080/geturls");
      console.log(res.data);
      setUrl(res.data);
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
    loadImage();
  }, [history]);

  return (
    <div className="postverse">
      <Container className="shareContainer mt-5 ml-auto mr-auto">
        <div className="mb-4 mt-4">
          <Navcp />
        </div>
        <div></div>
        <h1 className="titleStyle text-center">
          ShareVerse
          <span className="text-success"> Gallery</span>
        </h1>
        <div>
          <Col className=" holder mb-12" xs="12" lg="12">
            {url.map((urlData) => (
              <Nav.Link
                onClick={() =>
                  history.push({
                    pathname: `/gallery/${urlData._id}`,
                    state: {
                      urlData,
                    },
                  })
                }
              >
                <Image
                  alt=""
                  className="img-fluid"
                  src={urlData.url}
                  thumbnail
                />
              </Nav.Link>
            ))}
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default Gallery;

