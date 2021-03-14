import React from "react";
import { useHistory } from "react-router-dom";
import "./nav.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Navi = () => {
  const history = useHistory();

    return (
      <div>
        <Container className="ml-auto mr-auto">
          <Navbar className="navBar d-flex justify-content-end" expand="lg">
            <Navbar.Brand href="/home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Col>
              <Button
                className="logoutBtnn mb-2 mt-2"
                onClick={(e) => {
                  window.localStorage.removeItem("token");
                  history.push("/");
                }}
              >
                Logout
              </Button>
            </Col>

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home">MyProfile</Nav.Link>
                <Nav.Link href="/gallery">Gallery</Nav.Link>
                <Nav.Link href="/sharewall">Share Wall</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }

export default Navi;
