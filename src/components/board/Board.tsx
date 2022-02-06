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
      {WordData.map((row, index) => {
        return <BoardRow row={row} key={index}/>;
      })}
    </Container>
  );
}

export default Board;
