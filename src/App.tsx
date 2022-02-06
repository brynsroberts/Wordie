import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "./components/header/Header";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import "./App.css";

var randomWords = require("random-words");
console.log(randomWords({ exactly: 5, maxLength: 4 }));

const App: React.FC = () => {
  return (
    <Container className="App">
      <Row>
        <Col></Col>
        <Col xs={12} sm={10}>
          <Header />
          <Board />
          <Keyboard />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default App;
