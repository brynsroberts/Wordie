import React from "react";
import Button from "react-bootstrap/Button";
// import { IoReturnDownForwardSharp } from "react-icons/io5";
import { BsBackspace } from "react-icons/bs";

import "./IndividualKey.css";

interface KeyProps {
  letter: string;
  handleKeyboardClick: (e: any) => void;
  disableButton: boolean;
  variant: "success" | "danger" | "secondary" | "warning" | "dark";
}

const IndividualKey: React.FC<KeyProps> = (props) => {
  return (
    <Button
      className="buttonCSS"
      variant={props.variant}
      value={props.letter}
      onClick={(e) => props.handleKeyboardClick(e)}
      disabled={props.disableButton}
      size="sm"
    >
      { props.letter !== "DELETE" && props.letter}
      {props.letter === "DELETE" && <BsBackspace />}
    </Button>
  );
};

export default IndividualKey;
