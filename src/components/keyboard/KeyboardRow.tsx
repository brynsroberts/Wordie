import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import IndividualKey from "./IndividualKey";

interface KeyboardRowProps {
  row: string[];
}

const KeyboardRow: React.FC<KeyboardRowProps> = (props) => {
  return (
    <Row className="align-items-center justify-content-center">
      <Col xs={12}>
        {props.row.map((letter, index) => {
          return <IndividualKey letter={letter} key={index} />;
        })}
      </Col>
    </Row>
  );
};

export default KeyboardRow;
