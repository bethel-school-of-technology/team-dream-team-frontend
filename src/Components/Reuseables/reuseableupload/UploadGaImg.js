import React, { Component } from "react";
import { storage } from "../../../Config/firebase-config";
import "../css/globalpost.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DefaultImage from "../../../assets/default-image.jpg";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navcp from "../../Navigation/navcp";

class GlobalPost extends Component {
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

  render() {
    return (
      <Container className="pb-4 mt-5 ml-auto mr-auto shadow">
        <div className="pt-4 pb-2"><Navcp /></div>
        <Card.Title>
          <h1 className="text-center">
            Upload To Your
            <span className="text-success"> Gallery</span>
          </h1>
        </Card.Title>
        <Container>
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
                <Button
                  onClick={this.handleUpload}
                  className="ml-2"
                >
                  Upload
                </Button>
              </div>
            </Col>

            <div className="file-path-wrapper">
              {/* <input className="file-path validate" type="text" /> */}
            </div>
          </Row>

          <img
            className="defImg"
            src={this.state.url || DefaultImage}
            alt="Uploaded Images"
            height="300"
            width="400"
          />
        </Container>
      </Container>
    );
  }
}

export default GlobalPost;

