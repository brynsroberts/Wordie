import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import IndividualKey from "./IndividualKey";

interface KeyboardRowProps {
  row: {
    letter: string;
    variant: "success" | "danger" | "secondary" | "warning" | "dark";
  }[];
  handleKeyboardClick: (e: any) => void;
  disableButton: boolean;
}

const KeyboardRow: React.FC<KeyboardRowProps> = (props) => {
  return (
    <Row className="align-items-center justify-content-center">
      <Col xs={12}>
        {props.row.map((key, index) => {
          return (
            <IndividualKey
              handleKeyboardClick={props.handleKeyboardClick}
              letter={key.letter}
              key={index}
              disableButton={props.disableButton}
              variant={key.variant}
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default KeyboardRow;
