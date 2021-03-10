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
import Nav from "react-bootstrap/Nav";
//import { displayBio } from './displayBio';

// import "./login.css";
const Home = () => { 

  //const [someProperty, setSomeProperty] = useState([]);

  const [userBio, setBio] = useState([]);
  const [url, setUrl] = useState([]);
  const [id, setId] = useState("");
  const history = useHistory();

  const loadBio = async () => {
    try{ 

      let res = await axios.get(`http://localhost:5000/displaybio/60486cc949884b1fcc403f3e`)
      setBio(res.data.data.userBio)
      // setBio(res.data.map((t) => t.userBio)); 
      console.log(res)

    } catch (err){
      console.log(err)
    }
  }

  const loadProfilePic = async () => {
    try{ 
      let res = await axios.get(`http://localhost:5000/geturls`)
      setUrl(res.data.map((d) => d.url));
      // setBio(res.data.map((t) => t.userBio)); 
      console.log(res)

    } catch (err){
      console.log(err)
    }
  }

  useEffect(() => {  
      
    // console.log("use effect working!");
    if (!window.localStorage.getItem("token")) {
      //redirect to login
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

    loadBio()
    loadProfilePic()
  }, []);
        
    //   })
    loadBio()
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
                  this.props.history.push("/");
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
                  Welcome Back <span className="text-success">Username</span>
                </h1>
              </Card.Title>

              <Container>
                <Row>
                  <Col className="d-flex justify-content-center col-12">
                    <div className="profilepic text-center">
                    {url
                    .filter((name) => name.includes("lady"))
                    .map((urlData) => (
                    <Image className="profilehompic" src={urlData}></Image> 
                    ))}
                    </div>
                  </Col>
                  <Col className="mt-n5">
                    <div className="col-12 text-center">
                      <Card.Text                
                        className="cardText text-center col-lg-10"
                        //onChange={setBio}
                        >{userBio}</Card.Text>
                      <div className="mt-3">
                        <Button
                          className="shareVsBtn"
                          variant="success"
                          type="submit"
                          href="/sharewall"
                        >
                          Shared Verse
                        </Button>
                      </div>
                      <div className="mt-3">
                        <Button
                          className="postSubBtn mb-3"
                          variant="success"
                          type="submit"
                          href="/postverse"
                        >
                          Post a Verse
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
}


export default Home;