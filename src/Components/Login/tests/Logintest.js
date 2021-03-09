// import React from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import { FormErrors } from "../SignUp/FormErrors";
// import axios from "axios";
// import "./login.css";

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       //an object with the input field names as keys and any validation errors as their values
//       formErrors: { password: "" },
//       // the below props enable or disable the form submit button
//       passwordValid: false,
//       formValid: false,
//     };
//   }

//   componentDidMount() {
//     if (window.localStorage.getItem("token")) {
//       axios.defaults.headers.common[
//         "Authorization"
//       ] = window.localStorage.getItem("token");
//       axios
//         .post("http://localhost:5000/login")
//         .then((res) => {
//           if (res.data.status) {
//             this.props.history.push("/home");
//           }
//         })
//         .catch((res) => console.log(res));
//     }
//   }

//   handleUserInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     // setState method takes a callback function as a second argument,
//     // so we pass a validation function to call it after the user types in the field
//     this.setState({ [name]: value }, () => {
//       this.validateField(name, value);
//     });
//   };

//   // fucntion from line 34 is defined here
//   validateField(fieldName, value) {
//     let fieldValidationErrors = this.state.formErrors;
//     let passwordValid = this.state.passwordValid;

//     switch (fieldName) {
//       case "password":
//         passwordValid = value.length >= 6;
//         fieldValidationErrors.password = passwordValid ? "" : " is too short!";
//         break;
//       default:
//         break;
//     }

//     this.setState(
//       {
//         formErrors: fieldValidationErrors,
//         passwordValid: passwordValid,
//       },
//       this.validateForm
//     );
//   }

//   validateForm() {
//     this.setState({
//       formValid: this.state.passwordValid,
//     });
//     // this.handleSubmit()
//   }

//   errorClass(error) {
//     return error.length === 0 ? "" : "has-error";
//   }

//   //--------------handleSubmit function (submits states to backend)----------------

//   handleSubmit(e) {
//     e.preventDefault();
    
//     console.log(this.state);

//     axios
//       .post(
//         "http://localhost:5000/login",
//         {
//           username: this.state.username,
//           password: this.state.password,
//         }
//         // { withCredentials: true }
//       )
//       .then((res) => {
//         console.log(res);
//         // console.log(res.data.status);
//         var resStatus = res.data.status;
//         if (resStatus === 200) {
//         window.localStorage.setItem("token", res.data.token);
//         // return <Redirect to="/home" />;
//         this.props.history.push("/home");
//         } else {
//           alert("Your Password or Username is incorrect!");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   render() {
//     return (
//       <div className="Login">
//         <Container className="mt-5 ml-auto mr-auto">
//           <h1 className="text-center">
//             Welcome to
//             <span className="text-success"> ShareVerse</span>
//           </h1>
//           <Form
//             className="shadow p-3 mb-5 bg-white rounded"
//             id="signup-form"
//             onSubmit={this.handleSubmit.bind(this)}
//             method="POST"
//           >
//             <FormErrors formErrors={this.state.formErrors} />
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Username:</Form.Label>
//               <Form.Control
//                 type="text"
//                 required
//                 name="username"
//                 defaultValue={this.state.username}
//                 onChange={this.handleChange}
//                 placeholder="Enter username or email"
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <div className={this.errorClass(this.state.formErrors.password)}>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   required
//                   className="from-control"
//                   name="password"
//                   defaultValue={this.state.password}
//                   onChange={this.handleUserInput}
//                   placeholder="Password"
//                 />
//               </div>
//             </Form.Group>

//             <Button
//               variant="secondary"
//               type="submit"
//               className="submitBtn"
//               disabled={!this.state.formValid}
//             >
//               Submit
//             </Button>
//             <Nav.Link
//               className="navLogin text-muted d-flex justify-content-start"
//               variant="secondary"
//               href="/register"
//             >
//               New To ShareVerse?
//             </Nav.Link>
//             <Button
//               variant="primary"
//               type="submit"
//             >
//               Sign Up
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

// export default Login;