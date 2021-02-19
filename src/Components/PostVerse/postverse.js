import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./postverse.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

class PostVerse extends React.Component {
  state = {
    selectedFile: null,
    imagePreview:
      "https://www.ormondbeachmartialarts.com/wp-content/uploads/2017/04/default-image.jpg",
      verseText: "",

  };

  imageSelectHandler = (event) => {
    const reader = new FileReader();
    this.setState({
      selectedFile: event.target.files[0],
    });
    reader.onload = () => {
      console.log(reader);
      if (reader.readyState === 2) {
        console.log(reader.result);
        this.setState({ imagePreview: reader.result });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  imageUploadHandler = (e) => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post("http://localhost:5000/postverse", fd, {
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { imagePreview } = this.state;
    return (
      <div className="ReplaceMe">
        <Container className="mt-5 ml-auto mr-auto">
          <h1 className="text-center">
            Post to
            <span className="text-success"> ShareVerse</span>
          </h1>
          <Form
            className="shadow p-3 mb-5 bg-white rounded"
            id="post-form"
            //     onSubmit={this.handleSubmit.bind(this)}
            //     method="POST"
          >
            <Form.Group controlId="formBasicVerse">
              <Form.Label>
                <h5>Verse:</h5>
              </Form.Label>
              <Form.Control type="textarea" height="Auto" required />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <div>
                <Form.Label></Form.Label>
                <Form.Control className="from-control" name="password" />
              </div>
            </Form.Group>
            <div className="imageupload">
              <input type="file" onChange={this.imageSelectHandler} />

              <Button onClick={this.imageUploadHandler}>Upload</Button>
            </div>
          </Form>
          <div className="">
            {/* <img  id="preview" className="preview" /> */}
            <Card className="bg-dark text-white">
              <Card.Img src={imagePreview} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>My first Bible Verse Image!</Card.Title>
                <Card.Text>
               {/* {{verseText}} */}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}

export default PostVerse;
