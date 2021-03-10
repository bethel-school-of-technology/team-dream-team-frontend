import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";

// import "./login.css";

const ComponentName = ({props}) => {   

  const [body, setBody] = useState([]);
  const [title, setTitle] = useState([]);

  const loadData = async () => {
    try {
      //   let res = await axios.get(
      let res = await axios.get(`http://localhost:5000/getinput`);

      setTitle(res.data.map((t) => t.title));
      setBody(res.data.map((b) => b.body));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData()
  }, []);

    return (
      <div className="compoentclass">
        <Container className="mt-5 ml-auto mr-auto">
          <div className="text-center">
            <Card.Title className="text-center mt-5">
            Title: {(title).map((t) => (
            <Card.Text className="text-light"> {(t)} </Card.Text>
            ))}
             Body: {(body).map((b) => (
            <Card.Text className="text-light"> {(b)} </Card.Text>
            ))}
            </Card.Title>
          </div>
         </Container>
      </div>
        );
    }      

export default ComponentName;


