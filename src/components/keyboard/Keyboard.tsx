import React from "react";
import Container from "react-bootstrap/Container";

import KeyboardRow from "./KeyboardRow";
import "./Keyboard.css";

interface KeyboardProps {
  handleKeyboardClick: (e: any) => void;
  disableButton: boolean;
  keyboard: {
    letter: string;
    variant: "success" | "danger" | "secondary" | "warning" | "dark";
  }[][];
}

const Keyboard: React.FC<KeyboardProps> = (props) => {
  return (
    <Container className="keyboard">
      {props.keyboard.map((row, index) => {
        return (
          <KeyboardRow
            handleKeyboardClick={props.handleKeyboardClick}
            row={row}
            key={index}
            disableButton={props.disableButton}
          />
        );
      })}
    </Container>
  );
};

export default Keyboard;
