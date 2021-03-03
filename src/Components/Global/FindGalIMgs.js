import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import "./postverse.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

import FileBase from 'react-file-base64';
import DefaultImg from '../../assets/default-image.jpg';

const GlobalPost = () => {
  
  const API_URL = "http://localhost:5000";
  const [baseImage, UseBaseImage] = useState(DefaultImg);
  const [DefaultImage, setDefaultImage] = useState("");

// function to upload image once it has been captured


  // function to capture base64 format of an image
  function setGetBaseFile(files) {
    // create a local readable base64 instance of an image
    setDefaultImage({
      baseImage: DefaultImg
    });

    UseBaseImage({
      baseImage: files.base64
    });  

    let imageObj = {
      imageName: "base-image-" + Date.now(),
      imageData: files.base64.toString()
    };

    axios.post(`${API_URL}/image/uploadbase`, imageObj)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using base64 format");
          UseBaseImage("base")
        }
      })
      .catch((err) => {
        alert("Error while uploading image using base64 format")
        UseBaseImage("base") 
      });
    }


  return (
    <div className="globalpost">
      <Container className="mt-5 ml-auto mr-auto">
        <h1 className="text-center">
          Post to
          <span className="text-success"> ShareVerse</span>
        </h1>
        <Form
          className="shadow p-3 mb-5 bg-white rounded"
          action="/search"
          method="post"
          encType="multipart/form-data"
        >
          <Form.Group controlId="formBasicVerse">
            <Form.Label><h5>Upload Image</h5></Form.Label>
            <FileBase type="file" 
                      multiple={false} 
                      onDone={setGetBaseFile} 
            />
            <Card.Img src={baseImage} alt="upload-image"></Card.Img>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default GlobalPost;
