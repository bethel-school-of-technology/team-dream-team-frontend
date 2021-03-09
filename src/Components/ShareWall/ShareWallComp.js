import React from "react";
import Navi from "../Navigation/nav";
import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import "./sharewall.css";

const ShareWallComp = () => {

    return (
        <div className="sharewallcomp">
            <Container className="mt-5 ml-auto mr-auto">
                < Navi />
                <h1 className="text-center">
                    ShareVerse
            <span className="text-success"> Wall</span>
                </h1>
                <br></br>
                <Card>
                    <Card.Header>
                        <Container as="textarea" placeholder="SharedVerse" className="sharecont"></Container>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text as="textarea" placeholder="Comment Box" className="comment text-center">
                        </Card.Text>

                    </Card.Body>
                </Card>
                <br></br>
                <br></br>
                <Card>
                    <Card.Header>
                        <Container as="textarea" placeholder="SharedVerse" className="sharecont"></Container>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text as="textarea" placeholder="Comment Box" className="comment text-center">
                        </Card.Text>

                    </Card.Body>
                </Card>

            </Container>
        </div>

        
    );
}


export default ShareWallComp;