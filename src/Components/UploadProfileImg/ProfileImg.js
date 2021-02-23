import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./profileimg.css";

class ProfileImg extends React.Component {
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
        .post("http://localhost:5000/profile_img")
        .then((res) => {
          console.log();
          if (!res.data.status === "Login was successful" && 200) {
            //window.location.href = window.location.toString() + "/home";
            console.log("redirct to login");
            this.props.history.push("/profile_img");
          }
        })
        .catch((res) => console.log(res));
    }
  }
  render() {
    return (
      <div className="profileimg">
        <Container className="proContainer rounded mt-5 ml-auto mr-auto shadow">
          <h1 className="text-center">
            Upload
            <span className="text-success"> Your Profile Image</span>
          </h1>
          <Form>
            <Card className="profilepic img-fluid">
              <Card.Body>
                <Card.Title className="text-center">
                  Choose a Profile Picture
                </Card.Title>
                <div className="d-flex justify-content-center">
                  <Button variant="secondary" type="submit">
                    Upload Image
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-start mt-3">
              <Button variant="primary" type="submit" className="submitBtn">
                Submit
              </Button>
            </div>
            <div className="skipBio text-muted d-flex justify-content-start mt-2">
              Skip this for now?
            </div>
            <Button type="submit" href="/home-test">
              Go to Profile
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default ProfileImg;
