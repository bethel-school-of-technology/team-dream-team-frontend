import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { FormErrors } from "../SignUp/formerros/FormErrors";
import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: { password: "" },     
      // the below props enable or disable the form submit button
      passwordValid: false,
      formValid: false,
    };
  }
  
  //checks for token, logs user out if none found
  componentDidMount() {
    if (!window.localStorage.getItem("token")) {
      console.log("redirect to login");
      this.props.history.push("/");
    }
    if (window.localStorage.getItem("token")) { 
      const isMyTokenExpired = isExpired(window.localStorage.getItem("token"));
      console.log(isMyTokenExpired);

      if(isMyTokenExpired) {
        console.log("redirect to login");
        this.props.history.push("/");
      }

      const myDecodedToken = decodeToken(window.localStorage.getItem("token"));
      console.log(myDecodedToken);
    }
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
    let passwordValid = this.state.passwordValid;

    //checks if there are more then 6 letters in pasword
    switch (fieldName) {
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
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  //sets the value of validateForm function 
  validateForm() {
    this.setState({
      formValid: this.state.passwordValid,
    });
  }
  
  //sets error message class
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  //sends login data to db via axios http request and "/" endpoint
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios
      .post(
        "http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/",
        {
          email: this.state.email,
          password: this.state.password,
        }
      )
      .then((res) => {
        console.log(res);
        var resStatus = res.data.status;
        //checks if login was successfull and return token, or prevents access
        if (resStatus === 200) {
        window.localStorage.setItem("token", res.data.token);
        this.props.history.push("/createbio");
        } else {
          alert("Your Password or Username is incorrect!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="Login">
        <Container className="mt-5 ml-auto mr-auto">
          <h1 className="text-center">
            Welcome to
            <span className="text-success"> ShareVerse</span>
          </h1>
          <Form
            className="shadow p-3 mb-5 bg-white rounded"
            id="signup-form"
            //calls function to post login data to database
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            {/* displays error if any exsist  */}
            <FormErrors formErrors={this.state.formErrors} />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                required
                name="email"
                defaultValue={this.state.username}
                onChange={this.handleChange}
                placeholder="Enter username or email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <div className={this.errorClass(this.state.formErrors.password)}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  className="from-control"
                  name="password"
                  defaultValue={this.state.password}
                  onChange={this.handleUserInput}
                  placeholder="Password"
                />
              </div>
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              className="submitBtn"
              //disables button if error exsists
              disabled={!this.state.formValid}
            >
              Submit
            </Button>
            <Nav.Link
              className="navLogin text-muted d-flex justify-content-start"
              variant="secondary"
              href="/register"
            >
              New To ShareVerse, Signup Here?
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
export default Login;
