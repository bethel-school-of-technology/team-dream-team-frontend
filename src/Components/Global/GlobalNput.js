import React from "react";
import Card from "react-bootstrap/Card";

// dynamic inputs
const Input = ({ inputType, inputValue, inputName, setInputValue }) => (
    <input 
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

