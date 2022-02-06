import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import "./Cell.css";

interface CellProps {
  letter: string;
}

const Cell: React.FC<CellProps> = (props) => {
  return (
    <Button className="cardCSS" variant="secondary" disabled>
      {props.letter}
    </Button>
  );
};

export default Cell;
