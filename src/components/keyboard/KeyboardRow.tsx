import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import IndividualKey from "./IndividualKey";

interface KeyboardRowProps {
  row: string[];
  handleKeyboardClick: (e: any) => void;
  disableButton: boolean;
}

const KeyboardRow: React.FC<KeyboardRowProps> = (props) => {
  return (
    <Row className="align-items-center justify-content-center">
      <Col xs={12}>
        {props.row.map((letter, index) => {
          return (
            <IndividualKey
              handleKeyboardClick={props.handleKeyboardClick}
              letter={letter}
              key={index}
              disableButton={props.disableButton}
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default KeyboardRow;
