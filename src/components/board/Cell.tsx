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
}

const Cell: React.FC<CellProps> = (props) => {
  const updateVariant = () => {
    
    
    if (props.letter === props.word[props.index]) {
      return "success";
    }

    if (props.letter.length === 0) {
      return "secondary";
    }

    if (props.word.includes(props.letter)) {
      return "warning";
    }

    return "secondary";
  };

  return (
    <Button
      className="cell"
      variant={
        props.currentRow > props.rowIndex ? updateVariant() : "secondary"
      }
      disabled
    >
      {props.letter}
    </Button>
  );
};

export default Cell;
