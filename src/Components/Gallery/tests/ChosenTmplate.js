import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Navi from "../../Navigation/nav";
import "../Gallery/css/gallery.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Waterfall from "../posts/Waterfall";
import GreenMount from "../posts/GreenMount";

const PostVerse = () => {
  const history = useHistory();
  const [active, setActive] = useState("greenmount");

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
          {active === "waterfall" && <Waterfall />}
          {active === "greenmount" && <GreenMount />}
          {/* {active === "" && < />} */}
        </div>
        <h1 className="text-center">
          ShareVerse
          <span className="text-success"> Gallery</span>
        </h1>
        <Row className="d-flex align-items-center justify-content-center">
          <Col className="mb-2" xs="12" lg="3">
            <Nav.Link onClick={() => setActive("waterfall")}>
              <Image
                className="img-fluid"
                src="https://firebasestorage.googleapis.com/v0/b/share-verse-images.appspot.com/o/images%2Fimg_1.jpg?alt=media&token=09d374fd-f2d3-4080-bd8e-317fb15fa5cb"
                thumbnail
              />
            </Nav.Link>
          </Col>
          <Col className="mb-2" xs="12" lg="3">
            <Nav.Link onClick={() => setActive("image_b")}>
              <Image className="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/share-verse-images.appspot.com/o/images%2Ffirebase-image-1614831903670?alt=media&token=5f3b574d-4459-4cae-9190-21b274b1b0a2" thumbnail />
            </Nav.Link>
          </Col>

          <Col className="mb-2" xs="12" lg="3">
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostVerse;

// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import "./postverse.css";
// import Form from "react-bootstrap/Form";

// const [photos, setPhotos] = useState([]);

// function uploadHandler(e) {
//   const data = new FormData();
//   data.append('file', e.target.files[0]);
//   axios.post('http://localhost:5000/upload', data)
//     .then((res) => {
//       setPhotos({ photos: [res.data, ...photos] });
//     });
// }

//    <div>
//   <div>
//     <input type="file" name="file" onChange={uploadHandler} />
//   </div>
//   {photos.map((photo) => (
//     <img src={`http://localhost:3000/images/${photo.filename}`} alt=""/>
//   ))}
// </div>
