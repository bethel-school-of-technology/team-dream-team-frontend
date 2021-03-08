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
<<<<<<< HEAD
import Nav from "react-bootstrap/Nav";
import "./login.css";
=======
>>>>>>> 658279d6c3bb79f731177f1e276a3f053e22c9e6


// ------below code is for login and out functionality--------------------
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
      <div className="home">
        <Container className="">
          <Row>
            <Col ClassName="d-flex align-items-center">
              <Span> Home (You are logged in) </Span>
            </Col>
            <Col className="">
              <div className="d-flex align-items-center justify-content-end">
                <Button
                  className="loginBtn mb-2 mt-2"
                  onClick={(e) => {
                    window.localStorage.removeItem("token");
                    this.props.history.push("/login");
                  }}
                >
                  Logout
                </Button>
              </div>
            </Col>
          </Row>
          <Form>
            <Card className="">
              <Card.Body>
                <Card.Title>
                  <div><Navi/></div>
                  <h1>Welcome Back<span>Username</span></h1>
                  <Card.Title></Card.Title>
                  <Container>
                    <Row className="">
                      <Col className="">
                        <div>Place Holder Image</div>
                      </Col>
                      <Col className="bg-warning">
                        <div className=""></div>
                        <Card.Text as="textarea" placeholder="Text area for Bio"></Card.Text>
                        <Button
                            className="ShareVsBtn"
                            variant="success"
                            type="submit"
                          >
                            Share Verse
                          </Button>
                          <Button
                            className="ShareVsBtn"
                            variant="success"
                            type="submit"
                          >
                            Post A Verse
                          </Button>

                      </Col>
                    </Row>
                  </Container>
                </Card.Title>
              </Card.Body>
            </Card>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Home;
