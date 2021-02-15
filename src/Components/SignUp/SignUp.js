
// copy all code from login.js and paste below (ps. dont delete these comments)
// delete all code with in the div tags
// -- replace Login with SignUp in all places in the code 

// -- directions for importing:
// -- delete all imports except for react import and login.css
// -- replace "./login.css" with "./signup.css"
// paste bootstrap code from website - to import react components:
//    example one: form -> import Form from "react-bootstrap/Form";
//    example two: button -> import Form from "react-bootstrap/Form";

// once this is all done - go to index.js to create the route for Signup (further directions are there)
// once you are happy with your code, to check it paste this the below link in you browser:
// http://localhost:3000/signup

import React from "react";
//import Form from "react-bootstrap/Form";
//import Form from "react-bootstrap/Form";
import "./signup.css";

class Signup extends React.Component {
  render() {
    return (
      <div className="Signup">
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
      </div>
    );
  }
}

export default Signup;

