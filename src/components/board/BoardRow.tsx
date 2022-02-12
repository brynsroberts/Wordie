import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Cell from "./Cell";
import "./BoardRow.css";

interface BoardRowProps {
  row: {
    letter: string;
    variant: "success" | "danger" | "secondary" | "warning" | "dark";
  }[];
  word: string;
  totalIndex: number;
  rowIndex: number;
  currentRow: number;
}

const BoardRow: React.FC<BoardRowProps> = (props) => {
  return (
    <Row>
      <Col xs={12}>
        {props.row.map((cell, index) => {
          return (
            <Cell
              letter={cell.letter}
              key={index}
              index={index}
              word={props.word}
              totalIndex={props.totalIndex}
              rowIndex={props.rowIndex}
              currentRow={props.currentRow}
              variant={cell.variant}
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default BoardRow;
