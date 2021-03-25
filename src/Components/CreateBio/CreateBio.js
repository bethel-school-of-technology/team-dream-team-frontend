import React, { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Input from "../Reuseables/reusableInput/InputBio";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./CreateBio.css";
import axios from "axios";

const CreateBio = () => {
  //consts are created for useState functions
  const [ userBio, setUserBio ] = useState("");
  const history = useHistory();
  
  //sends bio data to db via axios http request and createbo endpoint
  function bioCreateHandler(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/createbio",
      data: {
        userBio: userBio
      },
    }).then((response) => {
      history.push("/profile_img");
      console.log(response.data);
    });
  }

  //checks for token, logs user out if none found
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
  }, [history]);


    return (
      <div className="CreateBio">
        <Container className="mt-5 ml-auto mr-auto" id="bioinput">
          <h1 className="text-center">
            <span className="text-success"> Create </span>
            Your Bio
          </h1>

          <Form className="shadow p-3 mb-5 bg-white rounded" id="bioinput-form">
            <Form.Group controlId="formBasicbio">
              <Form.Label>
                Let us know what the Lord has done in your life:
              </Form.Label>
              <Input
              setInputValue={setUserBio}
              inputValue={userBio}
              inputName={"userBio"}
              inputType={"text"}

            />
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              className="submitBtn"
              onClick={bioCreateHandler}
            >
              Submit
            </Button>
            <Nav.Link
              className="skipBio text-muted d-flex justify-content-start mt-2"
              href="/profile_img"
            >
              Skip this for now?
            </Nav.Link>
            <Nav.Link
              className="skipBio text-muted d-flex justify-content-start mt-2"
              href="/home"
            >
              Straight to my Profile Please!
            </Nav.Link>
          </Form>
        </Container>
      </div>
    );
  }


export default CreateBio;
