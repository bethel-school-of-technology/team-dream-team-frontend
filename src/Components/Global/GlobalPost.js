import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Input from "./GlobalNput";
import * as CardImg from "./GlobalNput";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import "./postverse.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

const GlobalPost = () => {
  const [imagePreview, setImagePreview] = useState(
    "images/img_1.jpg"
  );
  const [body, setBodyInput] = useState("");
  const [title, setTitleInput] = useState("");
  // const [image, setImage] = useState("");
  const [id, setId] = useState("");

  const history = useHistory();

  // sends data to server
  function makeRequest(e) {
    e.preventDefault();
    axios({
      method: "POST", 
      url: "http://localhost:5000/globalpost",
      data: {
        body: body, title: title // images: images,
      },
    }).then((response) => {
      setId(response.data.data._id);
    });
  }

  // checks when/if token is expiried
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
  });
  // },[]);

  return (
    <div className="globalpost">
      <Container className="mt-5 ml-auto mr-auto">
        <h1 className="text-center"> Post to 
          <span className="text-success"> ShareVerse</span>
        </h1>
        <Form className="shadow p-3 mb-5 bg-white rounded">
          <Form.Group controlId="formBasicVerse">
            <Form.Label> 
              <h5>Verse Title</h5>
            </Form.Label>
            <Input setInputValue={setTitleInput} 
                   inputValue={title} 
                   inputName={'title'}
                   inputType={"text"}
          />          
            </Form.Group>

          <Form.Group controlId="formBasicVerse">
            <Form.Label>
              <h5>Verse Body:</h5>
            </Form.Label>
            <Input setInputValue={setBodyInput} 
                   inputValue={body} 
                   inputName={'body'}
                   inputType={"text"}
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
                  type="submit"
                  onClick={makeRequest}
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

export default GlobalPost;

//------------------------------------------------------------------
