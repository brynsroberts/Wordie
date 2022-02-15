import React from "react";
import Button from "react-bootstrap/Button";

import "./Cell.css";

interface CellProps {
  letter: string;
  word: string;
  index: number;
  totalIndex: number;
  rowIndex: number;
  currentRow: number;
  variant: "success" | "danger" | "secondary" | "warning" | "dark";
}

const Cell: React.FC<CellProps> = (props) => {

  return (
    <Button className="cell" variant={props.variant} disabled>
      {props.letter}
    </Button>
  );
};

export default Cell;
