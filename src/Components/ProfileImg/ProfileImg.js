import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { storage } from "../../Config/firebase-config";
import DefaultImage from "../../assets/default-image.jpg";
import Navcp from "../Navigation/navcp";

import "./profileimg.css";

class ProfileImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
    };
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url });
          });
      }
    );
  };

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
        <Container className="profContainer rounded mt-5 ml-auto mr-auto shadow">
          <div className="mb-2 pt-4">
            <Navcp />
          </div>
          <h1 className="text-center">
            Upload
            <span className="text-success"> Your Profile Image</span>
          </h1>
          <Form>
            <div className="d-flex justify-content-center">
              <progress
                value={this.state.progress}
                className="statusBar progress row"
              />
            </div>
            <Row className="d-flex justify-content-center ">
              <Col>
                <div className="d-flex justify-content-center ml-3 mt-4 mb-3">
                  <Form.Control
                    className="uploadBtn"
                    type="file"
                    onChange={this.handleChange}
                  />
                </div>
              </Col>
            </Row>
            <img
              className="pfdefImg"
              src={this.state.url || DefaultImage}
              alt="Uploaded Images"
            />
            <Button onClick={this.handleUpload} className="uplaodBtn mt-2">
              Upload Image
            </Button>
            <div className="skipBio text-muted d-flex justify-content-start mt-2">
              Skip this for now?
            </div>
            <Button className="gotoBtn mb-3" type="submit" href="/home">
              Go to Profile
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default ProfileImg;
