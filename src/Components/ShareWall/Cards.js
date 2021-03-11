import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./css/sharewall.css";

const ComponentName = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [id, setId] = useState("");

  const loadData = async () => {
    try {
      let res = await axios.get(`http://localhost:5000/getall`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  function makeRequest(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/postinput",
      data: {
        comment: comment,
      },
    }).then((res) => {
      setComment(res.data.comment);
      console.log(res.data);
    });
  }

  const loadComment = async () => {
    try {
      let res = await axios.post("http://localhost:5000/postinput");
      setComment(res.data.comment._id);
      console.log(res.data.comment._id)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="compoentclass">
      <Container className="mt-5 ml-auto mr-auto">
        <div className="text-center">
          {posts.map((post, index) => (
            <div>
              <Card className="">
                <Card.Img alt="" src={post.url} />
                <Card.ImgOverlay className="overlay">
                  <Card.Title className="text-center mt-5">
                    <Card.Text className="cardStyle text-light">
                      {post.body}
                    </Card.Text>
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
              {posts.map((post, index) => (
              <div><Card.Text>{post.comment}</Card.Text></div>
              ))}
              <textarea
              className="comment text-center mt-3 mb-3"
              onChange={e => setComment(e.target.value)}
              value={comment}
              name={"comment"}
              type={"text"}
            />
              <div className="d-flex justify-content-start mt-n3 mb-4">
                <Button
                  className="shareButton"
                  variant="secondary"
                  onClick={makeRequest}
                  onChange={loadComment}
                >
                  Comment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ComponentName;
