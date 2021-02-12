import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./login.css";
import Navi from "../Navigation/nav";


class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <Navi />
        <Container className="mt-5 ml-auto mr-auto">
        <h1 className="text-center">
          Welcome to
          <span className="text-success"> ShareVerse</span>
        </h1>
          <Form className="shadow p-3 mb-5 bg-white rounded">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="email" placeholder="Enter username or email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Submit
            </Button>

             <Nav.Link className="text-muted" variant="secondary ">New To ShareVerse?</Nav.Link>

             <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
