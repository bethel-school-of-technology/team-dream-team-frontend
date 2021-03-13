import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Navi from "../Navigation/nav";
import "../Gallery/css/gallery.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";

import axios from "axios";

const Gallery = () => {
  const [url, setUrl] = useState([]);
  const history = useHistory();

  const loadImage = async () => {
    try {
      let res = await axios.get("http://localhost:5000/geturls");
      console.log(res.data)
      setUrl(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("use effect working!");
    if (!window.localStorage.getItem("token")) {
      //redirect to login
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
  },[history]);


  return (
    <div className="postverse">
      <Container className="mt-5 ml-auto mr-auto">
        <div className="mb-4 mt-4">
          <Navi />
        </div>
        <div>
        </div>
        <h1 className="text-center">
          ShareVerse
          <span className="text-success"> Gallery</span>
        </h1>
        <Row className="d-flex align-items-center justify-content-center">
        <Col className="mb-2" xs="12" lg="3">
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
           <Image alt="" className="img-fluid" src={urlData.url} thumbnail  />
           </Nav.Link>
              ))}
          </Col> 
        </Row>
      </Container>
    </div>
  );
};

export default Gallery;

          // <Col className="mb-2" xs="12" lg="3">
          //   <Nav.Link href="/waterfall">
          //   {url.map((urlData) => (
          //   <Image alt="" className="img-fluid" src={urlData} thumbnail  />
          //     ))}
          //   </Nav.Link>
          // </Col> 


