import React from "react";
import Container from "react-bootstrap/Container";

import BoardRow from "./BoardRow";
import "./Board.css";

const WordData = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
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
