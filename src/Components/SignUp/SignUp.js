import React from "react";
import Form from "react-bootstrap/Form";
import "./signup.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { FormErrors } from "./formerros/FormErrors";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      //object with input field names as keys and validation errors as their values
      formErrors: { email: "", password: "", firstName: "", lastName: "" },
      // the below props enable or disable the form submit button
      firstNameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  //handles input fields when there's a change in value & updates the state
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  // setState method takes a callback function as a 2nd argument, 
  // to pass validation function to call it after user types in field
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  
  //defines validateField function
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length >= 3 && value.match(/^[A-Za-z]+$/);
        fieldValidationErrors.firstName = firstNameValid ? "" : " is invalid!";
        break;
      case "lastName":
        lastNameValid = value.length >= 3 && value.match(/^[A-Za-z]+$/);
        fieldValidationErrors.lastName = lastNameValid ? "" : " is invalid!";
        break;
      //checks against regular expression to verify email format
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid!";
        break;
      //checks if there are more then 6 letters in pasword
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short!";
        break;
      default:
        break;
    }

    //calls setState to update the formErrors and the field validity 
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
      },
      this.validateForm
    );
  }

  //sets the value of validateForm function 
  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.firstNameValid &&
        this.state.lastNameValid,
    });
  }
  
  //sets error message class
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  
  //sends signup data to db via axios http request and reister endpoint
  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/register",
      data: this.state,
    }).then((response) => {
      console.log(response.data);
      window.location.assign("/Success");
    });

    console.log(this.state);
  }

  render() {
    return (
      <div className="Signup">
        <Container className="shadow mt-5 ml-auto mr-auto">
          <h1 className="text-center">
            Welcome to
            <span className="text-success"> ShareVerse</span>
          </h1>
          <Form.Text className="text-center">
            <h2>Sign Up Form</h2>
          </Form.Text>
          <Form
            id="signup-form"
            //calls function to post signup data to database
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            <div className="panel panel-default">
              {/* displays error if any exsist  */}
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <Form.Group>
              {/* hightlights error */}
              <div className={this.errorClass(this.state.formErrors.firstName)}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleUserInput}
                  placeholder="Enter First Name"
                />
              </div>
            </Form.Group>
            <Form.Group>
              <div className={this.errorClass(this.state.formErrors.lastName)}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleUserInput}
                  placeholder="Enter Last Name"
                />
              </div>
            </Form.Group>
            <div className={this.errorClass(this.state.formErrors.email)}>
              <Form.Group>
                <Form.Label>Email (Username)</Form.Label>
                <Form.Control
                  type="email"
                  required
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleUserInput}
                />
              </Form.Group>
            </div>
            <Form.Group>
              <div className={this.errorClass(this.state.formErrors.password)}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleUserInput}
                />
              </div>
            </Form.Group>
            <div className="d-flex justify-content-center mb-2">
              <Button
                variant="primary"
                type="submit"
                className="signupSubmitBtn"
                //disables button if error exsists
                disabled={!this.state.formValid}
              >
                Create Account
              </Button>
            </div>
            <Form.Text className="signupText text-center">
              Already have an account ?
            </Form.Text>
            <Nav.Link
              className="navSignup text-muted text-center"
              href="/"
            >
              Click Here to Login
            </Nav.Link>
          </Form>
        </Container>
      </div>
    );
  }
  //sets value of name and value
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
}
//changed
export default Signup;

