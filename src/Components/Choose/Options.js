import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./options.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Options = () => { 

  return (
    <div className="Home">
      <Container className="homeContainer shadow mt-2">
        <Form>
          <Card className="option_profileCard">
            <Card.Body>
              <Container className="optionContainer">
              <Row className="optionRow"></Row>
              <h1 className="textHeader text-center">
                  How Would You <span className="text-success ">Like To Share?</span>
                </h1>
                <Row>
                  <Col className="mt-n5">
                    <div className="col-12 text-center">
                      <div className="mt-5">
                        <Button
                          className="sv_upload"
                          variant="success"
                          type="submit"
                          href="/upload"
                        >
                         I want to upload a new image
                        </Button>
                      </div>
                      <div className="mt-3">
                        <Button
                          className="postSubBtn mb-3"
                          variant="success"
                          type="submit"
                          href="/gallery"
                        >
                          I want to choose the gallery
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="optionRow"></Row>
              </Container>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </div>
  );
}


export default Options;