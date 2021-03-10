import React from "react";
import "./nav.css";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

class Navi extends React.Component {
  render() {
    return (
      <div>
        <Container className="ml-auto mr-auto">
          <Navbar className="navBar" expand="lg">
            <Navbar.Brand href="/home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home">Home/MyProfile</Nav.Link>
                <Nav.Link href="/sharewall">Share Wall</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default Navi;
