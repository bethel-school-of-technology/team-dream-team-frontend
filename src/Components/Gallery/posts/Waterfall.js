import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Input from "../../Reuseables/reusableInput/Input";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/waterfall.css";
import axios from "axios";
// import "./postverse.css";


const Waterfall = () => {
  const [body, setBodyInput] = useState("");
  const [title, setTitleInput] = useState("");
  const [id, setId] = useState("");
  const [url, setUrl] = useState([]);
  const [name, setName] = useState([]);

  const history = useHistory();

  function makeRequest(e) {
    e.preventDefault();
    //gets data from inputs and sends to backend
    axios({
      method: "POST",
      url: "http://localhost:5000/getinput",
      data: {
        body: body,
        title: title,
        name: name.find(name => name === "waterfall"),
        // name.find(name => name.includes("water"))
        // images: images,

      },
    }).then((response) => {
      setId(response.data.data._id);
      // setName(response.data.name);
      console.log(response.data);
      console.log('name', name)
    });
  }

  const loadImage = async () => {
    try {
      let res = await axios.get("http://localhost:5000/geturls");
      console.log(res.data)
      setUrl(res.data.map(d=>d.url)); // array of urls
      setName(res.data.map(n=>n.name)); //array of names
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
    loadImage();
  },[history]);

  return (
    <div className="waterfall">
      <Container className="mt-5 ml-auto mr-auto">
        <h1 className="text-center"> Post to
          <span className="text-success"> ShareVerse</span>
        </h1>
        <Form className="shadow p-3 mb-5 bg-white rounded">
          <Form.Group controlId="formBasicVerse">
          <Form.Label> 
              <h5>Verse Title</h5>
            </Form.Label>
            <Input setInputValue={setTitleInput} 
                   inputValue={title} 
                   inputName={'title'}
                   inputType={"text"}
          />          
            </Form.Group>

          <Form.Group controlId="formBasicVerse">
            <Form.Label>
              <h5>Verse Body:</h5>
            </Form.Label>
            <Input setInputValue={setBodyInput}  
                   inputValue={body} 
                   inputName={'body'}
                   inputType={"text"}
          />      
          </Form.Group>
          <div className="">
            <Card className="bg-dark text-white">
            {name.filter(name => name.includes('water')).map((urlName) => (
            <div>name:{urlName}</div>
            ))}
            
            {url.filter(name => name.includes('water')).map((urlData) => (
            <Card.Img name={url.name} src={urlData} alt="Card image" />
            ))}
              <Card.ImgOverlay> 
                <Card.Title className="text-center mt-5">
                  <h1>{title}</h1>
                </Card.Title>
                <Card.Title className="text-center mt-5">{body}</Card.Title>
              </Card.ImgOverlay>
            </Card>
            <div>
              <Button 
                  className=" saveImageBtn mt-3" 
                  type="submit" onClick={makeRequest}
              > Save
              </Button>

              <div>
              <Button
                className=" saveImageBtn mt-3"
                href={`http://localhost:3000/getinputwaterfall/${id}`}
              >
                View Post!
              </Button>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Waterfall;


