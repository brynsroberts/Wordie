import React from "react";
import Container from "react-bootstrap/Container";

import BoardRow from "./BoardRow";
import "./Board.css";

interface BoardProps {
  word: string;
  board: {
    letter: string;
    variant: "success" | "danger" | "secondary" | "warning" | "dark";
  }[][];
  totalIndex: number;
  currentRow: number;
}

const Board: React.FC<BoardProps> = (props) => {
  return (
    <Container className={"board"}>
      {props.board.map((row, index) => {
        return (
          <BoardRow
            row={row}
            key={index}
            word={props.word}
            totalIndex={props.totalIndex}
            rowIndex={index}
            currentRow={props.currentRow}
          />
        );
      })}
    </Container>
  );
};

export default Board;
