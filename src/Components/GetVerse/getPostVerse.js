import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import "./postverse.css";
import axios from "axios";

const GetPostVerse = ({ match }) => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState("");

  const loadData = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/getverse/${match.params.id}`
      );
      setTitle(res.data.data.title);

      // console.log(res.data);
      // console.log(res.data.data.title);
      // console.log(match.params.id);
      setBody(res.data.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const loadimg  = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/getimage/${match.params.id}`
      );

      console.log(res.data.data.newImage);
      setImagePreview(res.data.data.newImage);
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

      if(isMyTokenExpired) {
        console.log("redirect to login");
        history.push("/");
      }

      const myDecodedToken = decodeToken(window.localStorage.getItem("token"));
      console.log(myDecodedToken);
    }
    loadData()
    loadimg()
  });
// },[]);

  return (
    <div className="getpostverse">
      <Container className="mt-5 ml-auto mr-auto">
        <h1 className="text-center">
          ShareVerse
          <span className="text-success"> Saved Posts</span>
        </h1>

        <div>saved image</div>
        <div>
          <div className="shadow p-3 mb-5 bg-white rounded">
            <Card className="bg-dark shadow text-white">
              <Card.Img src={imagePreview} alt="Card image" />
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

export default GetPostVerse;

// class GetPostVerse extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       imagePreview:
//         "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.hdnicewallpapers.com%2FWalls%2FBig%2FMountain%2FMountains_and_River_Wallpapers.jpg&f=1&nofb=1",
//       body: "",
//       title: "",
//     };
//     this.loadData=this.loadData.bind(this)
//   }

//   async loadData() {
//       try {
//         let res = await axios.get(`http://localhost:5000/getverse/6021f5080cce3114f85c2569`)
//         this.setState({title: res.data.data.title});
//         console.log(res.data)
//         console.log(res.data.data.title);
//       }
//       catch(error){
//         console.log(error);
//       }
//   }

//   componentDidMount() {
//     if (!window.localStorage.getItem("token")) {
//       //redirect to Login
//       console.log("redirect to login");
//       this.props.history.push("/");
//     }

//     if (window.localStorage.getItem("token")) {
//       axios.defaults.headers.common[
//         "Authorization"
//       ] = window.localStorage.getItem("token");
//       axios
//         .get("http://localhost:5000")
//         .then((res) => {
//           console.log();
//           if (!res.data.status === "Login was successful" && 200) {
//             console.log("redirct to login");
//             this.props.history.push("/getverse");
//           }
//           this.loadData();
//         })
//         .catch((res) => console.log(res));
//     }
//   }

//   render() {
//     const { imagePreview } = this.state;
//     // const { body } = this.state;
//     // const { title } = this.state;
//     return (
//       <div className="getpostverse">
//         <Container className="mt-5 ml-auto mr-auto">
//           <h1 className="text-center">
//             ShareVerse
//             <span className="text-success"> Saved Posts</span>
//           </h1>

//           <div>saved image</div>
//           <div>
//             <div className="shadow p-3 mb-5 bg-white rounded">
//               <Card className="bg-dark shadow text-white">
//                 <Card.Img src={imagePreview} alt="Card image" />
//                 <Card.ImgOverlay>
//                   <Card.Title className="text-center mt-5">
//                     <h1 className="text-warning">{this.state.title}</h1>
//                   </Card.Title>
//                   {/* <Card.Title className="text-center mt-5">
//                       <h3 className="text-warning">
//                         {this.body}d
//                       </h3>
//                     </Card.Title> */}
//                 </Card.ImgOverlay>
//               </Card>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }
// }

// export default GetPostVerse;
