import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface OutcomeProps {
  gameOver: boolean;
  gameWon: boolean;
}

const Outcome: React.FC<OutcomeProps> = (props) => {
  return (
    <Row className="align-items-center justify-content-center">
      <Col xs={12}>
        {props.gameWon && <h3>Winner!</h3>}
        {props.gameOver && !props.gameWon && <h3>Game Over</h3>}
      </Col>
    </Row>
  );
};

export default Outcome;