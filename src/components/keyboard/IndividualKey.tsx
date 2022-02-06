import React from "react";
import Button from "react-bootstrap/Button";
import { FiDelete } from "react-icons/fi";

import "./IndividualKey.css";

interface KeyProps {
  letter: string;
  handleKeyboardClick: (e: any) => void;
}

const IndividualKey: React.FC<KeyProps> = (props) => {
  return (
    <Button
      className="buttonCSS"
      variant="light"
      value={props.letter}
      onClick={(e) => props.handleKeyboardClick(e)}
    >
      {props.letter === "DELETE" ? <FiDelete /> : props.letter}
    </Button>
  );
};

export default IndividualKey;
