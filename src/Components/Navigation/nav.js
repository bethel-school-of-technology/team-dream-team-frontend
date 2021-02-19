import React from "react";
import "./nav.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

class Navi extends React.Component {
  render() {
    return (
      <div>
          <Container className="mt-5 ml-auto mr-auto">
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link className="text-secondary" href="/login">
              Tab1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-secondary" href="/">
              Tab2
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-secondary" href="/">
              Tab3
            </Nav.Link>
          </Nav.Item>
        </Nav>
        </Container>
      </div>
    );
  }
}

export default Navi;
