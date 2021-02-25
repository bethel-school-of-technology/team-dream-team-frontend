import React from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import "./login.css";

class Home extends React.Component {

  componentDidMount() {
    if (!window.localStorage.getItem("token")) {
      //redirect to Login
      console.log("redirect to login");
      this.props.history.push("/login");
    }

    if (window.localStorage.getItem("token")) {
      axios.defaults.headers.common[
        "Authorization"
      ] = window.localStorage.getItem("token");
      axios
        .post("http://localhost:5000/login")
        .then(res => {
          console.log();
          if (!res.data.status) {
            //window.location.href = window.location.toString() + "/home";
            console.log("redirct to login");
            this.props.history.push("/home");
          }
        })
        .catch(res => console.log(res));
    }
  }

  render() {
    return (
      <div className="Home">
        <Container className="mt-5 ml-auto mr-auto">
        <h1>Home</h1>
        <h1>You are logged in</h1>
        <button
          onClick={e => {
            window.localStorage.removeItem("token");
            this.props.history.push("/login");
          }}
        >
          Logout
        </button>
        </Container>
      </div>
          );
  }
}

export default Home;
