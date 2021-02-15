import React from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "./signupsuccess.css";

class SignupSuccess extends React.Component {
  render() {
    return (
      <div className="SignupSuccess">
        <Container className="mt-5 ml-auto mr-auto">
          <Alert variant="success">
            <Alert.Heading>Congradulations</Alert.Heading>
            <p>You have successfully created your ShareVerse profile.</p>
            <hr />
            <p className="mb-0">
              Go ahead and login below, and join the spread of Gods Word,
              together we can make a differnce!
            </p>
          </Alert>
          <div className="d-flex justify-content-center">
            <Button className="submitButton">
              <Nav.Link href="/login">Login To ShareVerse</Nav.Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default SignupSuccess;
