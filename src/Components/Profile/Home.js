import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./home.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Navi from "../Navigation/nav";
// import Image from "react-bootstrap/Image";
import axios from "axios";


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
        .post("http://localhost:5000/")
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
            <Col>
            {/* Home you are logged in... */}
            </Col>
            <Col>
            {/* logout btn */}
            </Col>
          </Row>
          <Form>
            <Card>
              <Card.Body>
                <Card.Title>
                  <Container>
                    <Row>
                      <Col>
                      <div>
                        {/* Place holder img... */}
                      </div>
                      </Col>
                      <Col>
                      <Card.Text>
                        {/* place holder for bio text */}
                      </Card.Text>
                      <Button>
                        {/* Share Verse Btn */}
                      </Button>
                      <Button>
                        {/* Post Verse Btn */}
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
