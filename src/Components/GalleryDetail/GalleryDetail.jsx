import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Input from "../Reuseables/reusableInput/Input";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Navcp from "../Navigation/navcp";
import "../Gallery/css/gallery.css";
import axios from "axios";

const GalleryDetail = () => {
  const [body, setBodyInput] = useState("");
  const [url, setUrl] = useState([]);
  const [id, setId] = useState("");
  const history = useHistory();
  const { imageId } = useParams();
  const urlData = history.location.state.urlData;

  function makeRequest(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/postinput",
      data: {
        body: body,
        url: urlData.url,
      },
    }).then((response) => {
      setId(response.data.data._id);
      console.log(response.data);
    });
  }
  const loadImage = async () => {
    try {
      let res = await axios.get(`http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/geturls/${imageId}`);
      console.log(res.data);
      setUrl(res.data.map((u) => u.url));
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
    <div className="getcross">
      <Container className="mt-5 ml-auto mr-auto">
        <div className="mb-4 mt-4">
          <Navcp />
        </div>
        <h1 className="text-center">
          Post to
          <span className="text-success"> ShareVerse</span>
        </h1>
        <Form className="shadow p-3 mb-5 bg-white rounded">
          <Form.Group controlId="formBasicVerse">
            <Form.Label className="d-flex justify-content-center">
              <Card.Text className="text-muted">
                Write your bible verse here and let your creativity flow!
              </Card.Text>
            </Form.Label>
            <Input
              setInputValue={setBodyInput}
              inputValue={body}
              inputName={"body"}
              inputType={"text"}
            />
          </Form.Group>
          <div className="holder shadow p-3 mb-5 bg-white rounded">
            <Card className="bg-dark shadow text-white">
              {<Image src={urlData.url} alt="Card image" />}
              <Card.ImgOverlay>
                <Card.Title className="galleryBody text-center mt-5">{body}</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
          <div>
            <Button
              className=" saveImageBtn mt-3"
              type="submit"
              onClick={makeRequest}
            >
              Save
            </Button>
            <div>
              <Button className=" saveImageBtn mt-3" href={`/sharewall`}>
                View Post!
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
};
//changed
export default GalleryDetail;