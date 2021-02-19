import React from "react";
import Form from "react-bootstrap/Form";
import "./signup.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { FormErrors } from "./FormErrors";
import axios from "axios";

//addes properties to the initial state
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      //an object with the input field names as keys and any validation errors as their values
      formErrors: { email: "", password: "", firstName: "", lastName: "" },
      // the below props enable or disable the form submit button
      firstNameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  //handles input fields every time there is a change in value and updates the state
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // setState method takes a callback function as a second argument, 
    // so we pass a validation function to call it after the user types in the field
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  // fucntion from line 34 is defined here 
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
        //For the email field, we check it against a regular expression to see if it’s an email. 
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid!";
        break;
        //For the password field, we check if the length is a minimum of 6 characters or not.
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short!";
        break;
      default:
        break;
    }

    // after the logic of checking to see if inputs are vaild, then
    // we call setState to update the formErrors and the field validity 
    // and we pass the validateForm callback to set the value of validtdateForm (line 84).
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

  //sets the error class to highlight error on the invaild field
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  //--------------handleSubmit function (submits states to backend)----------------
  handleSubmit(e) {
    e.preventDefault();

    //gets data from inputs and sends to backend
    axios({
      method: "POST",
      url: "http://localhost:5000/register",
      data: this.state,
    }).then((response) => {
      console.log(response.data);
      // on submission user is directed to success page
      // window.location.assign("/Success");
    });

    console.log(this.state);
  }

  render() {
    return (
      <div className="Signup">

 {/* Billees changes before pull----------------------------------------------
         <Form>
           <Form.Group controlId="formBasicEmail">
             <Form.Label>Email address</Form.Label>
             <Form.Control type="email" placeholder="Enter email" />
             <Form.Text className="text-muted">
               We'll never share your email with anyone else.
           </Form.Text>
           </Form.Group>

           <Form.Group controlId="formBasicPassword">
             <Form.Label>Password</Form.Label>
             <Form.Control type="password" placeholder="Password" />
           </Form.Group>
           <Form.Group controlId="formBasicCheckbox">
             <Form.Check type="checkbox" label="Check me out" />
           </Form.Group>
          <Button variant="primary" type="submit">
             Submit
   </Button>
        </Form>
--------------------------------------------------------------------------- */}
      
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
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            <div className="panel panel-default">
              {/* for displaying any errors from our validation (FormError.js) */}
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <Form.Group>
              {/* highlights the error field based on the error */}
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
                // set the disabled attribute of the submit 
                // button based on the value of the formValid state property.
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
              href="/login"
            >
              Click Here to Login
            </Nav.Link>
          </Form>
        </Container>
      </div>
    );
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
}

export default Signup;

