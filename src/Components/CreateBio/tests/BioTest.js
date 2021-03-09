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
      bioText: null,
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
  
  handleInput = (e) => {
      const bioText = e.target.value;
      this.setState(() => ({ bioText }));
      console.log('biotext:i', bioText)
  };

  bioCreateHandler() {
    axios({
      method: "POST",
      url: "http://localhost:5000/createbio",
      data: {
        bioText: this.state.bioText,
      },
    }).then((response) => {
      console.log(response.data);
      // setId(response.data.data._id); // grabs id from inputs
    });
  }

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
                onChange={this.handleInput}
                value={this.bioText}
                type="text"
                name="bio"
                required
                placeholder="Tell us a little about yourself."
              />
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              className="submitBtn"
              // disabled={!this.state.formValid}
              onClick={this.bioCreateHandler}
            >
              Submit
            </Button>
            <Nav.Link className="skipBio text-muted d-flex justify-content-start mt-2" 
                 href="/profile_img">
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
