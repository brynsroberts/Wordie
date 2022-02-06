import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "./components/header/Header";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import "./App.css";

const randomWords = require("random-words");
const getRandomWord = () => {
  const words = randomWords({
    exactly: 100,
    maxLength: 5,
    minLength: 5,
  });
  return words;
};

const setNewBoard = (wordLength: number) => {
  let newBoard = [];
  for (let i = 0; i < 6; i++) {
    let boardRow = [];
    for (let j = 0; j < wordLength; j++) {
      boardRow.push("");
    }
    newBoard.push(boardRow);
  }

  return newBoard;
};

const App: React.FC = () => {
  const [word, setWord] = useState<string>("fiver");
  const [board, setBoard] = useState<string[][]>([]);

  useEffect(() => {
    const words = getRandomWord();
    const fiveLetterWords = words.filter((word: string) => word.length === 5);
    setWord((prevState) => {
      return fiveLetterWords[0];
    });
  }, []);

  useEffect(() => {
    setBoard((prevState) => {
      return setNewBoard(word.length);
    });
    console.log(word);
  }, [word]);

  return (
    <Container className="App">
      <Row>
        <Col></Col>
        <Col xs={12} sm={10}>
          <Header />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={12} sm={10}>
          <Board word={word} board={board} />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={12} sm={10}>
          <Keyboard />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default App;
