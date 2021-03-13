import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./css/sharewall.css";

const ComponentName = () => {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState("");
  const [isCommentFetched, setCommentFetched] = useState(false);

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
    })
      .then((res) => {
        setComment(res.data.comment);
        setCommentFetched(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const loadComment = async () => {
    try {
      let res = await axios.post("http://localhost:5000/postinput");
      setComment(res.data.comment._id);
      console.log(res.data.comment._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (isCommentFetched) {
      loadData();
    }
  }, [isCommentFetched]);

  return (
    <div className="compoentclass">
      <Container className="mt-5 ml-auto mr-auto">
        <div className="text-center">
          {posts.map((post, index) => (
            <div>
              <Card className="">
                {images.map((images, index) => (
                  <Card.Img alt="" src={images.newImage} />
                ))}
                <Card.Img alt="" src={post.url} />
                <Card.ImgOverlay className="overlay">
                  <div className="d-flex justify-content-center align-items-center">
                    <Card.Text className="cardStyle text-light">
                      {post.body}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
              <textarea
                  className="comment text-center mt-3 mb-3"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  name={"comment"}
                  type={"text"}
                />
              <Card.Footer className="footer mt-n3 mb-1">
                {posts.map((post, index) => (
                  <Card.Text className="cardTextC">{post.comment}</Card.Text>
                ))}
              </Card.Footer>

              <div className="cardButton d-flex justify-content-start mb-4">
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
