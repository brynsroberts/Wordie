import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import "./Header.css";

interface HeaderProps {
  newWord: () => void;
  streak: number;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Navbar id="navbar">
      <Container>
        <Navbar.Collapse className="justify-content-left">
          <Navbar.Text>Current Streak: {props.streak}</Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text id="title">
            <b>WORDIE</b>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="outline-dark" onClick={props.newWord}>
              New Word
            </Button>{" "}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
