// copy all code from login.js and paste below (ps. dont delete these comments)
// delete all code with in the div tags
// -- replace Login with SignUp in all places in the code

// -- directions for importing:
// -- delete all imports except for react import and login.css
// -- replace "./login.css" with "./signup.css"
// paste bootstrap code from website - to import react components:
//    example one: form -> import Form from "react-bootstrap/Form";
//    example two: button -> import Button from "react-bootstrap/Button"

// once this is all done - go to index.js to create the route for Signup (further directions are there)
// once you are happy with your code, to check it paste this the below link in you browser:
// http://localhost:3000/signup

import React from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import "./login.css";

class ReplaceMe extends React.Component {
   render() {
    return (
      <div className="ReplaceMe">
        <Container className="mt-5 ml-auto mr-auto">
          <h1 className="text-center">
            Welcome to
            <span className="text-success"> ShareVerse</span>
          </h1>
         </Container>
      </div>
    );
  }
}

export default ReplaceMe;

//-----------------------------------------------------------------------------

// OLD SIGNUP PAGE - FOR BILLEE

// import Form from "react-bootstrap/Form";
// import "./signup.css";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";

// class Signup extends React.Component {
//   render() {
//     return (
//       <div className="Signup">
//           <Container className="mt-5 ml-auto mr-auto">
//           <h1 className="text-center">
//             Welcome to
//             <span className="text-success"> ShareVerse</span>
//           </h1>
//           <Form.Text className="text-center">
//             <h2>Sign Up</h2></Form.Text>
//           <Form>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control type="text" placeholder="First Name" />
//             </Form.Group>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control type="text" placeholder="Last Name" />
//             </Form.Group>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" placeholder="Email" />
//             </Form.Group>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>User Name</Form.Label>
//               <Form.Control type="text" placeholder="User Name" />
//             </Form.Group>
//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" />
//             </Form.Group>
//             <div className="d-flex justify-content-center mb-2">
//               <Button variant="primary" type="submit">
//                 Create Account
//             </Button>
//             </div>
//               <Nav.Link className="navSignup text-muted text-center"
//               href="/login">Already have an account</Nav.Link>
//           </Form>
//         </Container>
//       </div>
//     );
//   }
// }
// export default Signup;