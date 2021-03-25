import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./home.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navi from "../Navigation/nav";
import Image from "react-bootstrap/Image";
import axios from "axios";

const Home = () => {
  const [userBio, setBio] = useState([]);
  const [url, setUrl] = useState([]);
  // const [id, setId] = useState("");
  const history = useHistory();

  const loadBio = async () => {
    try {
      let res = await axios.get(
        `http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/displaybio/60486cc949884b1fcc403f3e`
      );
      setBio(res.data.data.userBio);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProfilePic = async () => {
    try {
      let res = await axios.get(`http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/geturls`);
      setUrl(res.data.map((d) => d.url));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      console.log("redirect to login");
      history.push("/");
    }
    if (window.localStorage.getItem("token")) {
      const isMyTokenExpired = isExpired(window.localStorage.getItem("token"));
      console.log(isMyTokenExpired);
      if (isMyTokenExpired) {
        console.log("redirect to login");
        history.push("/");
      }
      const myDecodedToken = decodeToken(window.localStorage.getItem("token"));
      console.log(myDecodedToken);
    }

    loadBio();
    loadProfilePic();
  }, []);

  return (
    <div className="Home">
      <Container className="homeContainer shadow mt-2">
        <Row>
          <Col className="d-flex align-items-center">
            <span>Home (You are logged in)</span>
          </Col>
          <Col className="">
            <div className="d-flex align-items-center justify-content-end">
              <Button
                className="logoutBtn mb-2 mt-2"
                onClick={(e) => {
                  window.localStorage.removeItem("token");
                  history.push("/");
                }}
              >
                Logout
              </Button>
            </div>
          </Col>
        </Row>
        <Form>
          <Card className="profileCard">
            <Card.Body>
              <Card.Title className="text-center">
                <div>
                  <Navi />
                </div>
                <h1>
                  Welcome <span className="text-success">Sarah</span>
                </h1>
              </Card.Title>

              <Container>
                <Row>
                  <Col className="d-flex justify-content-center col-12">
                    <div className="profilepic text-center">
                      {url
                        .filter((name) => name.includes("lady"))
                        .map((postData) => (
                          <Image
                            className="profilehompic"
                            src={postData}
                          ></Image>
                        ))}
                    </div>
                  </Col>
                  <Col className="mt-n5">
                    <div className="col-12 text-center">
                      <div className=" d-flex justify-content-center">
                        <Card.Text className="cardText text-center align-items-center col-lg-10">
                        {userBio}
                      </Card.Text></div>
                      
                      <div className="mt-3">
                        <Button
                          className="postSubBtn mt-3 mb-2"
                          variant="success"
                          type="submit"
                          href="/options"
                        >
                          Post a Verse
                        </Button>
                      </div>
                      <div className="mb-3">
                        <Button
                          className="shareVsBtn"
                          variant="success"
                          type="submit"
                          href="/sharewall"
                        >
                          Share Verse Wall
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </div>
  );
};
//changed
export default Home;
