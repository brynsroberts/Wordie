import React from "react";
import Button from "react-bootstrap/Button";
import { FiDelete } from "react-icons/fi";

import "./IndividualKey.css";

interface KeyProps {
  letter: string;
}

const IndividualKey: React.FC<KeyProps> = (props) => {
  return (
    <Button className="buttonCSS" variant="light">
      {props.letter === "DELETE" ? <FiDelete /> : props.letter}
    </Button>
  );
};

export default IndividualKey;
