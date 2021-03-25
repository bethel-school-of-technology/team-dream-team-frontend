import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./css/sharewall.css";

const Cards = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState(""); 
  const [_id, set_id] = useState("");

  const loadPosts = async () => {
    try {
      let res = await axios.get(`http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/getall`);
      setPosts(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  function saveComment(e, _id) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://ec2-34-229-191-194.compute-1.amazonaws.com:8080/savecomment",
      data: {
        _id: _id,
        comment: comment,
      },
    })
      .then((res) => {
        loadPosts()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="compoentclass">
      <Container className="mt-5 ml-auto mr-auto">
        <div className="text-center">
          {posts.map((post) => (
            post.url && <div key={post._id}>
              <Card>
                <Card.Img className="imgCard" alt="" src={post.url} />
                <Card.ImgOverlay className="overlay">
                  <Card.Title className="d-flex justify-content-center align-items-center">
                    <Card.Text className="cardStyle text-light">
                      {post.body}
                    </Card.Text>
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
              <Card.Footer className="footer mt-3 mb-1">
                <Card.Text>{post.comment}</Card.Text>
              </Card.Footer>
              <textarea
                className="comment text-center mt-3 mb-3"
                placeholder="Write your comment her!"
                onChange={(e) => setComment(e.target.value)}
                name="comment"
                type="text"
              />
              <div className="cardButton d-flex justify-content-start mb-4">
                <Button
                  className="shareButton"
                  variant="secondary"
                  onClick={(e) => saveComment(e, post._id)
                  }
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
//changed
export default Cards;