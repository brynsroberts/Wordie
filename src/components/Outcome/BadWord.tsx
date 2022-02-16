import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface OutcomeProps {
  realWord: boolean;
  onHide: () => void;
}

const BadWord: React.FC<OutcomeProps> = (props) => {
  return (
    <Modal
      show={!props.realWord}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Not a real word!
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide}>Back</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BadWord;
