import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Navi from "../Navigation/nav";
import "./chooseimg.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import ImgA from "../GalleryComps/ImgA";
import ImgB from "../GalleryComps/ImgB";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import "./postverse.css";
// import Form from "react-bootstrap/Form";
import axios from "axios";

const PostVerse = () => {
  const history = useHistory();
  const [active, setActive] = useState("imga");
  const [photos, setPhotos] = useState([]);

  function uploadHandler(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    axios.post('http://localhost:5000/upload', data)
      .then((res) => {
        setPhotos({ photos: [res.data, ...photos] });
      });
  }

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
  });
  // },[]);

  return (
    <div className="postverse">
      <Container className="mt-5 ml-auto mr-auto">
        <div className="mb-4 mt-4">
          <Navi />
        </div>
        <div>
          {active === "image_a" && <ImgA />}
          {active === "image_b" && <ImgB />}
          {/* {active === "" && < />} */}
        </div>
        <h1 className="text-center">
          ShareVerse
          <span className="text-success"> Gallery</span>
        </h1>
        <Row className="d-flex align-items-center justify-content-center">
          <Col className="mb-2" xs="12" lg="3">
            <Nav.Link onClick={() => setActive("image_a")}>
              <Image className="img-fluid" src="images/img_1.jpg" thumbnail />
            </Nav.Link>
          </Col>
          <Col className="mb-2" xs="12" lg="3">
            <Nav.Link onClick={() => setActive("image_b")}>
              <Image className="img-fluid" src="images/img_2.jpg" thumbnail />
            </Nav.Link>
          </Col>
          {/* <Col className="mb-2" xs="12" lg="3">
            <Image className="img-fluid"
              src="images/img_3.jpg"
              thumbnail
            />
          </Col>
          <Col className="mb-2" xs="12" lg="3">
              <Nav.Link href="/imga">
              <Image className="img-fluid"
              src="images/img_4.jpg"
              thumbnail
            /></Nav.Link>

          </Col>
          <Col className="mb-2" xs="12" lg="3">
            <Image className="img-fluid"
              src="images/img_5.jpg"
              thumbnail
            />
          </Col>
          <Col className="mb-2" xs="12" lg="3">
            <Image className="img-fluid"
              src="images/img_6.jpg"
              thumbnail
            />
          </Col>
          <Col className="mb-2" xs="12" lg="3">
            <Image className="img-fluid"
              src="images/img_7.jpg"
              thumbnail
            />
          </Col> */}
        </Row>
        <div>
          <div>
            <input type="file" name="file" onChange={uploadHandler} />
          </div>
          {photos.map((photo) => (
            <img src={`http://localhost:3000/images/${photo.filename}`} alt=""/>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PostVerse;
