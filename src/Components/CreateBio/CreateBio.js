import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
//import { FormErrors } from "./FormErrors";
import "./CreateBio.css";
import axios from "axios";

class CreateBio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBio: "",
    };
  }

  componentDidMount() {
    if (!window.localStorage.getItem("token")) {
      //redirect to Login
      console.log("redirect to login");
      this.props.history.push("/");
    }

    if (window.localStorage.getItem("token")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = window.localStorage.getItem("token");
      axios
        .post("http://localhost:5000/createbio")
        .then((res) => {
          console.log();
          if (!res.data.status === "Login was successful" && 200) {
            //window.location.href = window.location.toString() + "/home";
            console.log("redirct to login");
            this.props.history.push("/createbio");
          }
        })
        .catch((res) => console.log(res));
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;    
    this.setState({ [name]: value }, () => {
    });
  };

  bioCreateHandler() {
    axios
      .post("http://localhost:5000/createbio",
      {
        userBio: this.state.userBio,
      })
      .then((res) => {
        console.log(res);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="CreateBio">
        <Container className="mt-5 ml-auto mr-auto" id="bioinput">
          <h1 className="text-center">
            <span className="text-success"> Create </span>
            Your Bio
          </h1>

          <Form
            className="shadow p-3 mb-5 bg-white rounded"
            id="bioinput-form"
            // onSubmit={this.bioCreateHandler.bind(this)}
            // method="POST"
          >
            {/* <FormErrors formErrors={this.state.formErrors} /> */}
            <Form.Group controlId="formBasicbio">
              <Form.Label>
                Let us know what the Lord has done in your life:
              </Form.Label>
              <Form.Control
                as="textarea"
                className="bioInput d-flex align-items-start"
                type="text"
                defaultValue={this.state.userBio}
                onChange={this.handleChange}
                name="userBio"
                placeholder="Tell us a little about yourself."
              />
            </Form.Group>

            <Button
              variant="secondary"
              type="button"
              className="submitBtn"
              // href="/profile_img"
              // disabled={!this.state.formValid}
              onClick={this.bioCreateHandler.bind(this)}
            >
              Submit
            </Button>
            <Nav.Link className="skipBio text-muted d-flex justify-content-start mt-2" 
                      href="/profile_img" 
                      >
              Skip this for now?
            </Nav.Link>
            {/* <Button type="submit" href="/home-test">
              Go to Profile
            </Button> */}
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateBio;
