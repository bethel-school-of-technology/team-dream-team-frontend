import React from "react";
import Navi from "../../Navigation/nav";
import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import "../sharewall.css";

const ShareWallComp = () => {
  return (
    <div className="sharewallcomp">
      <div className="mt-4">
        <Navi />
      </div>
      <Container className="mt-5 pb-4 ml-auto mr-auto shadow">
        <h1 className="text-center">
          ShareVerse
          <span className="text-success"> Wall</span>
        </h1>
        <Card className="mb-4">
          <Card.Header>
            <Container
              as="textarea"
              placeholder="SharedVerse"
              className="sharecont text-center"
            ></Container>
          </Card.Header>
          <Card.Body>
            <Card.Text as="textarea" className="comment text-center">
              Comment Box
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Container
              as="textarea"
              placeholder="SharedVerse"
              className="sharecont text-center"
            ></Container>
          </Card.Header>
          <Card.Body>
            <Card.Text as="textarea" className="comment text-center">
              Comment Box
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ShareWallComp;
