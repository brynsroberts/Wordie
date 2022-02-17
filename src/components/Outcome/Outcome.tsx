import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface OutcomeProps {
  gameOver: boolean;
  gameWon: boolean;
  word: string;
  realWord: boolean;
  show: boolean;
  onHide: () => void;
  streak: number;
}

const Outcome: React.FC<OutcomeProps> = (props) => {
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.gameWon && "Winner!"}
          {props.gameOver && !props.gameWon && "Game Over"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{"The word was: " + props.word}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>New Word</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Outcome;
