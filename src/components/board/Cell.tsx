import React from "react";
import Button from "react-bootstrap/Button";

import "./Cell.css";

interface CellProps {
  letter: string;
  word: string;
  index: number;
}

const Cell: React.FC<CellProps> = (props) => {
  const getVariant = () => {
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
    <Button className="cell" variant={getVariant()} disabled>
      {props.letter}
    </Button>
  );
};

export default Cell;
