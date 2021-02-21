import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./home.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import axios from "axios";

class ProfileImg extends React.Component {
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
      <div className="profileimg">
        <Container className="mt-5 ml-auto mr-auto shadow">
          <h1 className="text-center">
            Welcome Back
            <span className="text-success"> Username</span>
          </h1>
          <Form>
            <Card className="profilepic img-fluid">
              <Card.Body>
                <Card.Title className="text-center">
                  Choose a Profile Picture
                </Card.Title>
                <div className="d-flex justify-content-center">
                  <Button variant="secondary" type="submit">
                    Upload Image
                  </Button>
                  <Container>
                    <Row>
                      <Col xs={6} md={4}>
                        <Image src="holder.js/171x180" rounded />
                      </Col>
                      </Row>
                  </Container>
                </div>
                  <Form.Group>
                    <Form.Text className="text-right">
                      User Bio
              </Form.Text>
                  </Form.Group>
              </Card.Body>
            </Card>
              <div className="d-flex justify-content-center mt-3">
                <Button variant="success" type="Shared Verses">
                  Share Verse
              </Button>
                <Button variant="success" type="Post a Verse"></Button>{' '}
              </div>
              <button
                onClick={(e) => {
                  window.localStorage.removeItem("token");
                  this.props.history.push("/login");
                }}
              >
                Logout
              </button>
          </Form>
        </Container>
      </div >
    );
  }
}

export default ProfileImg;