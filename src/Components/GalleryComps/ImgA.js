import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import "./postverse.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

const ImgA = () => {
  const [imagePreview, setImagePreview] = useState(
    "images/img_1.jpg"
  );
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const history = useHistory();

  function makeRequest(e) {
    e.preventDefault();
    //gets data from inputs and sends to backend
    axios({
      method: "POST",
      url: "http://localhost:5000/imga",
      data: {
        body: body,
        title: title,
        // images: images,
      },
    }).then((response) => {
      console.log(response.data);
      setId(response.data.data._id);
    });
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleBody(e) {
    setBody(e.target.value);
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
    <div className="imaga">
      <Container className="mt-5 ml-auto mr-auto">
        <h1 className="text-center"> Post to
          <span className="text-success"> ShareVerse</span>
        </h1>
        <Form className="shadow p-3 mb-5 bg-white rounded">
          <Form.Group controlId="formBasicVerse">
            <Form.Label>
              <h5>Verse Title</h5>
            </Form.Label>
            <Form.Control
              type="text" name="title"
              value={title}
              onChange={handleTitle}
              height="Auto"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicVerse">
            <Form.Label>
              <h5>Verse Body:</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="body"
              value={body}
              onChange={handleBody}
              height="Auto"
              required
            />
          </Form.Group>
          <div className="">
            <Card className="bg-dark text-white">
            <Card.Img src={imagePreview} alt="Card image" />
              <Card.ImgOverlay> 
                <Card.Title className="text-center mt-5">
                  <h1>{title}</h1>
                </Card.Title>
                <Card.Title className="text-center mt-5">{body}</Card.Title>
              </Card.ImgOverlay>
            </Card>
            <div>
              <Button 
                  className=" saveImageBtn mt-3" 
                  type="submit" onClick={makeRequest}
              > Save
              </Button>

              <div>
              <Button
                className=" saveImageBtn mt-3"
                href={`http://localhost:3000/getverse/${id}`}
              >
                View Post!
              </Button>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ImgA;

//------------------------------------------------------------------
