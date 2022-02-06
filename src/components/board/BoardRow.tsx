import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Cell from "./Cell";
import "./BoardRow.css";

interface BoardRowProps {
  row: string[];
}

const BoardRow: React.FC<BoardRowProps> = (props) => {
  return (
    <Row>
      <Col xs={12}>
        {props.row.map((letter) => {
          return <Cell letter={letter} variant="secondary" />;
        })}
      </Col>
    </Row>
  );
};

export default BoardRow;
