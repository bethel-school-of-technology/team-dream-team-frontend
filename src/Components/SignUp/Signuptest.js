import React from "react";
import Form from "react-bootstrap/Form";
import "./signup.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

class SignupTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/register",
      data: this.state,
    }).then((response) => {
      console.log(response.data);
    });
    window.location.assign("/Success");
  }

  render() {
    return (
      <div className="SignupTest">
        <Container className="mt-5 ml-auto mr-auto">
          <Form
            id="signup-form"
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                value={this.state.firstName}
                onChange={this.onFirstChange.bind(this)}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                id="lastName"
                value={this.state.lastName}
                onChange={this.onLastChange.bind(this)}
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.onEmailChange.bind(this)}
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                id="username"
                vlaue={this.state.username}
                onChange={this.onUserChange.bind(this)}
                placeholder="Enter Username"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="current-password"
                value={this.state.password}
                onChange={this.onPasswordChange.bind(this)}
                placeholder="Enter Password"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              // onClick={(e) => {
              //   e.preventDefault();
              //   window.location.href='http://localhost:3000/login';
              //   }}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }

  onFirstChange(e) {
    this.setState({ firstName: e.target.value });
  }
  onLastChange(e) {
    this.setState({ lastName: e.target.value });
  }
  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  onUserChange(e) {
    this.setState({ username: e.target.value });
  }
  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }
}

export default SignupTest;
