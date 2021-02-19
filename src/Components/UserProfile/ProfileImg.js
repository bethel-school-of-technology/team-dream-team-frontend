import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./profileimg.css";

class ProfileImg extends React.Component {
  render() {
    return (
      <div className="profileimg">
        <Container className="mt-5 ml-auto mr-auto shadow">
          <h1 className="text-center">
            Welcome Back
            <span className="text-success"> Username</span>
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
                  <Container>
                        <Image src="holder.js/171x180" thumbnail />
                  </Container>
                </div>
                <Form.Group>
                  <Form.Text className="text-right">
                    User Bio
              </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </div>
            <Card.Title className=" skip text-center p-3">Skip</Card.Title>
          </Form>
        </Container>
      </div >
    );
  }
}

export default ProfileImg;
