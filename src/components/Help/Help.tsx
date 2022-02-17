import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface OutcomeProps {
  show: boolean;
  onHide: () => void;
}

const Help: React.FC<OutcomeProps> = (props) => {
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Wordie!  A WORDLE clone with unlimited words!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Guess the WORDIE in six tries. Each guess must be a valid
        word. Hit the enter button to submit. After each guess, the color of the
        tiles will change to show how close your guess was to the word.  Hit the 
        restart button in the upper right hand corner to get a new word.  Doing so 
        will reset your current streak.  Have fun!
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Start Game</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Help;
