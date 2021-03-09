import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./home.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navi from "../Navigation/nav";
import Image from "react-bootstrap/Image";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import "../Login/login.css";



class Home extends React.Component {
  componentDidMount() {
    if (!window.localStorage.getItem("token")) {
      //redirect to Login
      console.log("redirect to login");
      this.props.history.push("/");
    }

    if (window.localStorage.getItem("token")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = window.localStorage.getItem("token");
      axios
        .get("http://localhost:5000/")
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
  // ------end login/logout functionality-----------------------------------



  render() {
    return (
      <div className="HomeTest">
        <Container className="homeContainer shadow mt-2">
          <Row>
            <Col className="d-flex align-items-center">
              <span>Home (Your are logged in)</span>
            </Col>
            <Col className="">
              <div className="d-flex align-items-center justify-content-end">
                <Button
                  className="logoutBtn mb-2 mt-2"
                  onClick={(e) => {
                    window.localStorage.removeItem("token");
                    this.props.history.push("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            </Col>
          </Row>
          <Form>
            <Card className="profileCard">
              <Card.Body>
                <Card.Title className="text-center">
                  <div>
                    <Navi />
                  </div>
                  <h1>
                    Welcome Back <span className="text-success">Username</span>
                  </h1>
                </Card.Title>

                <Container>
                  <Row>
                    <Col className="d-flex justify-content-center col-12">
                      <div className="placeholder text-center">
                        Place Holder
                      </div>
                    </Col>
                    <Col className="mt-n5">
                      <div className="col-12 text-center">
                        <Card.Text
                          as="textarea"
                          className="cardText text-center col-lg-10"
                          placeholder="This is some text for the bio"
                        ></Card.Text>
                        <div className="mt-3">
                          <Button
                            className="shareVsBtn"
                            variant="success"
                            type="submit"
                          >
                            Shared Verse
                          </Button>
                        </div>
                        <div className="mt-3">
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
              </Card.Body>
            </Card>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Home;
