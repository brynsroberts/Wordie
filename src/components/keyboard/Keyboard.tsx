import React from "react";
import Container from "react-bootstrap/Container";

import KeyboardRow from "./KeyboardRow";
import "./Keyboard.css";

const KEYBOARD = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
];

const Keyboard: React.FC = () => {
  return (
    <Container className="keyboard">
      {KEYBOARD.map((row, index) => {
        return <KeyboardRow row={row} key={index} />;
      })}
    </Container>
  );
};

export default Keyboard;
