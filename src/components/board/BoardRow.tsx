import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Cell from "./Cell";
import "./BoardRow.css";

interface BoardRowProps {
  row: string[];
  word: string;
  totalIndex: number;
  rowIndex: number;
}

const BoardRow: React.FC<BoardRowProps> = (props) => {
  return (
    <Row>
      <Col xs={12}>
        {props.row.map((letter, index) => {
          return (
            <Cell
              letter={letter}
              key={index}
              index={index}
              word={props.word}
              totalIndex={props.totalIndex}
              rowIndex={props.rowIndex}
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default BoardRow;
