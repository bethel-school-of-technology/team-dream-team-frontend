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
            <Alert.Heading>Congratulations</Alert.Heading>
            <p>You have successfully created your ShareVerse profile.</p>
            <hr />
            <p className="mb-0">
             Please check you email for a verifction link and <a className="successLink" href="/">login after you verify</a> .
            </p>
          </Alert>
          <div className="d-flex justify-content-center">
          </div>
        </Container>
      </div>
    );
  }
}

export default SignupSuccess;
