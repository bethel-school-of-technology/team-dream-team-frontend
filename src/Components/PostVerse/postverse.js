import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import './postverse.css';
import Form from "react-bootstrap/Form"

class PostVerse extends React.Component {
    imageSelectHandler = event => {
        console.log(event.target.files[0]);
    }

    render() {
     return (
       <div className="ReplaceMe">
         <Container className="mt-5 ml-auto mr-auto">
           <h1 className="text-center">
           Post to 
             <span className="text-success"> ShareVerse</span>
           </h1>
           <Form
            className="shadow p-3 mb-5 bg-white rounded"
            id="post-form"
        //     onSubmit={this.handleSubmit.bind(this)}
        //     method="POST"
          >
            
            <Form.Group controlId="formBasicVerse">
              <Form.Label><h5>Verse:</h5></Form.Label>
              <Form.Control
                type="textarea"
                height="Auto"
                required
                
              />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <div >
                <Form.Label></Form.Label>
                <Form.Control
                 className="from-control"
                  name="password"               
                />
              </div>
            </Form.Group>
            <div classname="imageupload">
                <input type="file" onChange={this.imageUploadHandler}/>
            </div>
            </Form>
          </Container>
       </div>
     );
   }
 }
 
 export default PostVerse;
 