import React from "react";
import Form from "react-bootstrap/Form";
import "./signuptest.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FormErrors } from './FormErrors';
import axios from "axios";

class SignupTestVal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formErrors: { email: "", password: "", firstName: "", lastName: "" },
      firstNameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  //handles input every time there is a change in value and updates the state
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length >= 3 && value.match (/^[A-Za-z]+$/);
        fieldValidationErrors.firstName = firstNameValid ? "" : " is invalid!";
        break;
        case "lastName":
          lastNameValid = value.length >= 3 && value.match (/^[A-Za-z]+$/);
          fieldValidationErrors.lastName = lastNameValid ? "" : " is invalid!";
          break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid!";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short!";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid &&
                 this.state.passwordValid && 
                 this.state.firstNameValid && 
                 this.state.lastNameValid
    });
  }

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
      window.location.assign("/Success");
    });

    console.log(this.state);
  }

  render() {
    return (
      <div className="SignupTestVal">
        <Container className="mt-5 ml-auto mr-auto">
          <Form
            id="signup-form"
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <Form.Group>
            <div className={this.errorClass(this.state.formErrors.firstName)}>
              <Form.Label>First Name:</Form.Label>
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
            <Form.Group>
            <div className={this.errorClass(this.state.formErrors.email)}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                className="form-control"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}
              />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Enter Username"
              />
            </Form.Group>
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
            <Button
              variant="primary"
              type="submit"
              disabled={!this.state.formValid}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
}

export default SignupTestVal;

// class SignupTestVal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       username: "",
//       password: "",
//       errors: [],
//     };

//     //binds handleInput and handleSubmit functions to allow access to functions
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   // checks to see if key is in the error array
//   hasErr(key) {
//     return this.state.errors.indexOf(key) !== -1;
//   }

//   //handles input every time there is a change in value and updates the state
//   handleInputChange(e) {
//     const name = e.target.name;
//     const value = e.target.value;
//     this.setState({[name]: value});
//   }

//   //--------------handleSubmit function (submits states to backend)----------------
//   handleSubmit(e) {
//     e.preventDefault();

//     //gets data from inputs and sends to backend
//     axios({
//       method: "POST",
//       url: "http://localhost:5000/register",
//       data: this.state,
//     }).then((response) => {
//       console.log(response.data);
//       // on submission user is directed to success page
//       // window.location.assign("/Success");
//     });

//     console.log(this.state);
//     let errors = [];

//     //firstname check for errors
//     if (this.state.firstName === "") {
//       errors.push("firstName");
//     }
//     //lastName check for errors
//     if (this.state.lastName === "") {
//       errors.push("lastName");
//     }
//     //email check for errors
//     const expression = /\S+@\S+/;
//     let validEmail = expression.test(String(this.state.email).toLowerCase());

//     if (!validEmail) {
//       errors.push("email");
//     }

//     //username check for errors
//     if (this.state.username === "") {
//       errors.push("username");
//     }
//     //password check for errors
//     if (this.state.password === "") {
//       errors.push("password");
//     }

//     this.setState({
//       errors: errors,
//     });

//     if (errors.length > 0) {
//       return false;
//     }
//   }

//   render() {
//     return (
//       <div className="SignupTestVal">
//         <Container className="mt-5 ml-auto mr-auto">
//           <Form
//             id="signup-form"
//             onSubmit={this.handleSubmit.bind(this)}
//             method="POST"
//           >
//             <Form.Group>
//               <Form.Label>First Name:</Form.Label>
//               <Form.Control
//                 type="text"
//                 id="firstName"
//                 className={
//                   this.hasErr("firstName")
//                     ? "from-control is-invalid"
//                     : "form control"
//                 }
//                 name="firstName"
//                 value={this.state.firstName}
//                 onChange={this.handleChange}
//                 placeholder="Enter First Name"
//               />
//               <div
//                 className={
//                   this.hasErr("firstName") ? "inline-errmsg" : "hidden"
//                 }
//               >
//                 Please enter a value
//               </div>
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 id="lastName"
//                 className={
//                   this.hasErr("lastName")
//                     ? "form-control is-invalid"
//                     : "form control"
//                 }
//                 name="lastName"
//                 value={this.state.lastName}
//                 onChange={this.handleChange}
//                 placeholder="Enter Last Name"
//               />
//               <div
//                 className={this.hasErr("lastName") ? "inline-errmsg" : "hidden"}
//               >
//                 Please enter a value
//               </div>
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 id="email"
//                 className={
//                   this.hasErr("email")
//                     ? "form-control is-invalid"
//                     : "form control"
//                 }
//                 name="email"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//                 placeholder="Enter Email"
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="username"
//                 id="username"
//                 className={
//                   this.hasErr("username")
//                     ? "form-control is-invalid"
//                     : "form control"
//                 }
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.handleChange}
//                 placeholder="Enter Username"
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 id="password"
//                 className={
//                   this.hasErr("password")
//                     ? "form-control is-invalid"
//                     : "form control"
//                 }
//                 name="password"
//                 onChange={this.handleChange}
//                 placeholder="Enter Password"
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Container>
//       </div>
//     );
//   }

//   handleChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };
// }

// export default SignupTestVal;
