import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Navi from "../Navigation/nav";
import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import "./sharewall.css";
import axios from "axios";


const ShareWallComp = ({match}) => {
    const [body, setBody] = useState([]);
    const [title, setTitle] = useState([]);
    const [url, setUrl] = useState([]); //bk-ground image
    const history = useHistory();

    const loadData = async () => {
        try {
          let res = await axios.get(
            `http://localhost:5000/getinputcross/${match.params.id}`
          );
          setTitle(res.data.data.title);
    
          console.log(res.data);
          // console.log(res.data.data.title);
          // console.log(match.params.id);
          setBody(res.data.data.body);
        } catch (error) {
          console.log(error);
        }
      };

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
        loadData();
        // loadimg();
      }, []);

    return (
        <div className="sharewallcomp">
            <Container className="mt-5 ml-auto mr-auto">
                < Navi />
                <h1 className="text-center mt-3 mb-3">
                    ShareVerse
            <span className="text-success"> Wall</span>
                </h1>

                <Card className="bg-dark shadow text-white">
              {url
                .filter((name) => name.includes("cross"))
                .map((urlData) => (
                  <Card.Img key={url.name} src={urlData} alt="Card image" />
                ))}
              <Card.ImgOverlay>
                <Card.Title className="text-center mt-5">
                  <h1 className="text-warning">{title}</h1>
                </Card.Title>
                <Card.Title className="text-center mt-5">
                  <h3 className="text-warning">{body}</h3>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>

                {/* <Card>
                    <Card.Header>
                        <Container as="textarea" placeholder="SharedVerse" className="sharecont"></Container>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text as="textarea" placeholder="Comment Box" className="comment text-center">
                        </Card.Text>

                    </Card.Body>
                </Card> */}

            </Container>
        </div>

        
    );
}


export default ShareWallComp;