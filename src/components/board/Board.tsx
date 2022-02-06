import React from "react";
import Container from "react-bootstrap/Container";

import BoardRow from "./BoardRow";
import "./Board.css";

const WordData = [
  ["H", "A", "P", "P", "Y"],
  ["H", "A", "P", "P", " "],
  ["H", "A", "P", " ", " "],
  ["H", "A", ".", "s", " "],
  ["H", "A", "P", "P", "Y"],
];

function Board() {
  return (
    <Container className="board">
      {WordData.map((row) => {
        return <BoardRow row={row} />;
      })}
    </Container>
  );
}

export default Board;
