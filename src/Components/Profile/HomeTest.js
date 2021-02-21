import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navi from "../Navigation/nav";
// import Image from "react-bootstrap/Image";
import axios from "axios";
import "./home-test.css";

class HomeTest extends React.Component {
  componentDidMount() {
    if (!window.localStorage.getItem("token")) {
      //redirect to Login
      console.log("redirect to login");
      this.props.history.push("/login");
    }

    if (window.localStorage.getItem("token")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = window.localStorage.getItem("token");
      axios
        .post("http://localhost:5000/login")
        .then((res) => {
          console.log();
          if (!res.data.status) {
            //window.location.href = window.location.toString() + "/home";
            console.log("redirct to login");
            this.props.history.push("/home");
          }
        })
        .catch((res) => console.log(res));
    }
  }

  render() {
    return (
      <div className="HomeTest">
        <Container className="homeContainer shadow mt-2 ml-auto mr-auto">
          <Row>
            <Col className="d-flex align-items-center">
              <span className="spanHome"> Home (You are logged in)</span>
            </Col>
            <div className="d-flex align-items-center">
              <Col className="col-sm d-flex align-items-center">
                <Button
                  className="logonBtn mb-2 mt-2"
                  onClick={(e) => {
                    window.localStorage.removeItem("token");
                    this.props.history.push("/login");
                  }}
                >
                  Logout
                </Button>
              </Col>
            </div>
          </Row>
          <Form>
            <Card className="profileCard img-fluid">
              <Card.Body>
                <Card.Title className="text-center">
                <div className="mb-2">
            <Navi />
          </div>
                  <h1 className="text-center">
                    Welcome Back
                    <span className="text-success"> Username</span>
                  </h1>{" "}
                </Card.Title>
                <div className="d-flex justify-content-center">
                  <Container>
                    <Row className="profileRow row-cols-12">
                      <Col className="col-12 d-flex justify-content-center">
                        <div className="placeholder text-center ">
                          Place holder img
                          {/* <Button
                            className="uploadProBtn"
                            variant="primary"
                            type="submit"
                          >
                            Upload Image
                          </Button> */}
                        </div>
                      </Col>
                      <Col className="mt-n5 d-flex justify-content-center">
                        {/* <Image src="holder.js/171x180" rounded /> */}
                        <div className=" col-12 text-center">
                          <Card.Text
                            as="textarea"
                            className="cardText text-center col-lg-10"
                            placeholder="This is my example Bio! I love Jesus!"
                          >
                            {/* {{ bio interpolation goes here}} */}
                          </Card.Text>
                          <div className="d-flex justify-content-center mt-3">
                            <Button
                              className="shareVsBtn"
                              variant="success"
                              type="submit"
                            >
                              Share Verse
                            </Button>
                          </div>
                          <div className="d-flex justify-content-center mt-3">
                            <Button
                              className="postSubBtn mb-3"
                              variant="success"
                              type="submit"
                              href="/postverse"
                            >
                              Post a Verse
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </Container>
      </div>
    );
  }
}

export default HomeTest;
