import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Navi from "../../Navigation/nav";
import axios from "axios";

const GetCross = ({ match }) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState([]);
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

  const loadimg = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/geturls/${match.params.name="cross"}`
      );
      setUrl(res.data.map((d) => d.url));
      // console.log(res.data.data.title);
      // console.log(match.params.id);
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
    loadimg();
  }, []);

  return (
    <div className="getcross">
      <Container className="mt-5 ml-auto mr-auto">
        <Navi />
        <h1 className="text-center">
          ShareVerse
          <span className="text-success"> Saved Posts</span>
        </h1>

        <div>saved image</div>
        <div>
          <div className="shadow p-3 mb-5 bg-white rounded">
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
          </div>
        </div>
      </Container>
    </div>
  );
};

// test link: http://localhost:3000/getverse/6021ef044a42be4388eee4ed

export default GetCross;
