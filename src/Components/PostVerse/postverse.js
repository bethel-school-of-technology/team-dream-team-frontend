import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

import ImageUploading from "react-images-uploading";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./postverse.css";
import Form from "react-bootstrap/Form";
import axios from "axios";



const PostVerse = ({ match }) => {
  const [imagePreview, setImagePreview] = useState(
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.hdnicewallpapers.com%2FWalls%2FBig%2FMountain%2FMountains_and_River_Wallpapers.jpg&f=1&nofb=1"
  );
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = React.useState([]);
  const history = useHistory();
  const [id, setId] = useState("")

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    setImages(imageList);
  };

  function makeRequest(e) {
    e.preventDefault();
    //gets data from inputs and sends to backend
    axios({
      method: "POST",
      url: "http://localhost:5000/create",
      data: {
        body: body,
        title: title,
        images: images,
      },
    }).then((response) => {
      console.log(response.data);
      setId(response.data.data._id)
    });
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleBody(e) {
    setBody(e.target.value);
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

      if(isMyTokenExpired) {
        console.log("redirect to login");
        history.push("/");
      }

      const myDecodedToken = decodeToken(window.localStorage.getItem("token"));
      console.log(myDecodedToken);
    }
  });
// },[]);

  return (
    <div className="postverse">
      <Container className="mt-5 ml-auto mr-auto">
        <h1 className="text-center">
          Post to
          <span className="text-success"> ShareVerse</span>
        </h1>
        <Form className="shadow p-3 mb-5 bg-white rounded">
          <Form.Group controlId="formBasicVerse">
            <Form.Label>
              <h5>Verse Title</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleTitle}
              height="Auto"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicVerse">
            <Form.Label>
              <h5>Verse Body:</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="body"
              value={body}
              onChange={handleBody}
              height="Auto"
              required
            />
          </Form.Group>
          <ImageUploading
            value={images}
            onChange={onChange}
            dataURLKey="data_url"
          >
            {/* {({ imageList, onImageUpload, errors }) =>
              errors && imageList && onImageUpload  (
                <div>
                  {errors.acceptType && (
                    <span>Your selected file type is not allow</span>
                  )}
                  {errors.maxFileSize && (
                    <span>Selected file size exceed maxFileSize</span>
                  )}
                  {errors.resolution && (
                    <span>
                      Selected file is not match your desired resolution
                    </span>
                  )}
                </div>
              )
            } */}

        {/* {({ imageList, onImageUpload, isDragging, dragProps, errors }) => errors ( */}
            {({ imageList, onImageUpload, isDragging, dragProps,  }) =>  (
              // write your building UI
              <div className="upload__image-wrapper">
                  {/* {errors.acceptType && (
                    <span>Your selected file type is not allow</span>
                  )}
                  {errors.maxFileSize && (
                    <span>Selected file size exceed maxFileSize</span>
                  )}
                  {errors.resolution && (
                    <span>
                      Selected file is not match your desired resolution
                    </span>
                  )} */}
                <Button
                  style={isDragging ? { color: "red" } : null}
                  type="button"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>
              </div>
            )}
          </ImageUploading>

          <div className="">
            <Card className="bg-dark text-white">
              {/* <Card.Img src={imagePreview} alt="Card image" /> */}
              {images.map((image, index) => (
                <div key={index} className="image-item">
                  <Card.Img src={image.data_url} alt="" />
                </div>
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
                type="submit"
                onClick={makeRequest}
              >
                Save My Creation!
              </Button>
              <div>
                <Button
                  href={`http://localhost:3000/getverse/${id}`}
                >
                  go!
                </Button>
              </div>
            </div>
          </div>
        </Form>
        <div></div>
      </Container>
    </div>
  );
};

export default PostVerse;

//------------------------------------------------------------------

// class PostVerse extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedFile: null,
//       imagePreview:
//         "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.hdnicewallpapers.com%2FWalls%2FBig%2FMountain%2FMountains_and_River_Wallpapers.jpg&f=1&nofb=1",
//       body: this.props.body,
//       title: this.props.title,
//     };
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
//             //window.location.href = window.location.toString() + "/home";
//             console.log("redirct to login");
//             this.props.history.push("/postverse");
//           }
//         })
//         .catch((res) => console.log(res));
//     }
//   }

//   // imageSelectHandler Function-----------------------------------------
//   imageSelectHandler = (event) => {
//     const reader = new FileReader();
//     this.setState({
//       selectedFile: event.target.files[0],
//     });
//     reader.onload = () => {
//       console.log(reader);
//       // below checks if image is loaded and changes to 4 when complete
//       if (reader.readyState === 2) {
//         console.log(reader.result);
//         this.setState({ imagePreview: reader.result });
//       }
//       //need a conditional to check image size larger then 67.0 kb and throw error
//     };
//     reader.readAsDataURL(event.target.files[0]);
//   };

//   // imageUploadHandler Function-----------------------------------------
//   imageUploadHandler = (e) => {
//     const fd = new FormData();
//     fd.append("newImage", this.state.selectedFile, this.state.selectedFile.name);
//     axios
//       .post("http://localhost:5000/postverse", fd, {
//         onUploadProgress: (progressEvent) => {
//           console.log(
//             "Upload Progress: " +
//               Math.round((progressEvent.loaded / progressEvent.total) * 100) +
//               "%"
//           );
//         },
//       })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // =============================================================================
//   //handles input fields every time there is a change in value and updates the state
//   handleUserInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     this.setState({ [name]: value });
//   };

//   handleSubmit(e) {
//     e.preventDefault();
//     //gets data from inputs and sends to backend
//     axios({
//       method: "POST",
//       url: "http://localhost:5000/create",
//       data: this.state,
//     }).then((response) => {
//       console.log(response.data);
//       // on submission user is directed to success page
//       // window.location.assign("/Success");
//     });
//   }

//   render() {
//     const { imagePreview } = this.state;
//     const { body } = this.state;
//     const { title } = this.state;
//     return (
//       <div className="postverse">
//         <Container className="mt-5 ml-auto mr-auto">
//           <h1 className="text-center">
//             Post to
//             <span className="text-success"> ShareVerse</span>
//           </h1>
//           <Form
//             className="shadow p-3 mb-5 bg-white rounded"
//             id="post-form"
//             onSubmit={this.handleSubmit.bind(this)}
//             method="POST"
//           >
//             <Form.Group controlId="formBasicVerse">
//               <Form.Label>
//                 <h5>Verse Title</h5>
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={this.state.title}
//                 onChange={this.handleUserInput}
//                 height="Auto"
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicVerse">
//               <Form.Label>
//                 <h5>Verse Body:</h5>
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 name="body"
//                 value={this.state.body}
//                 onChange={this.handleUserInput}
//                 height="Auto"
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicImage">
//               <div>
//                 <Form.Control
//                   className="imageupload"
//                   type="file"
//                   onChange={this.imageSelectHandler}
//                 />
//               </div>
//               <em className="text-danger">max image size: 67.0 KB</em>
//             </Form.Group>
//             <div className="">
//               {/* <img  id="preview" className="preview" /> */}
//               <Card className="bg-dark text-white">
//                 <Card.Img src={imagePreview} alt="Card image" />
//                 <Card.ImgOverlay>
//                   <Card.Title className="text-center mt-5">
//                     <h1>{title}</h1>
//                   </Card.Title>
//                   <Card.Title className="text-center mt-5">{body}</Card.Title>
//                 </Card.ImgOverlay>
//               </Card>
//               <div>
//                 <Button
//                   className=" saveImageBtn mt-3"
//                   type="submit"
//                   onClick={this.imageUploadHandler}
//                 >
//                   Save My Creation!
//                 </Button>
//                 <div>

//                   <Button href="getverse/:id">go!</Button>
//                 </div>
//               </div>
//             </div>
//           </Form>
//           <div></div>
//         </Container>
//       </div>
//     );
//   }
// }

// export default PostVerse;
