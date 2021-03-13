import React from "react";
import Card from "react-bootstrap/Card";
import '../css/input.css';

// dynamic inputs
const Input = ({ inputType, inputValue, inputName, setInputValue }) => (
    <textarea 
    className="bioInput d-flex align-items-start"
    placeholder="Tell us a little about yourself."
    type={inputType}
    value={inputValue}
    name={inputName}
    onChange={e => setInputValue(e.target.value)}
    />
);

const BgImg = ({ bgImgValue}) => (

    <BgImg>
    <Card.Img src={bgImgValue} alt="Card image" />
    </BgImg>
) ;

export default Input;

