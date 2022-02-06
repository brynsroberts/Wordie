import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "./components/header/Header";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import "./App.css";

const STARTER_BOARD = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const randomWords = require("random-words");
const getFirstRandomWord = () => {
  let word = "";
  while (word.length !== 5) {
    let words = randomWords({
      exactly: 1,
      max: 5,
      min: 5,
    });
    word = words[0];
  }
  return word.toUpperCase();
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
  const [word, setWord] = useState<string>("FIVER");
  const [board, setBoard] = useState<string[][]>(STARTER_BOARD);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentColumn, setCurrentColumn] = useState<number>(0);

  const updateBoardAfterInput = (letter: string) => {
    const prevBoard = board;
    prevBoard[currentRow][currentColumn] = letter;
    setBoard(prevBoard);
  };

  const updateRowAndColumn = () => {
    if (currentColumn === word.length - 1) {
      // check if word is real
      // update color of cell
    }
  };

  const handleKeyboardClick = (e: any) => {
    e.preventDefault();
    updateBoardAfterInput(e.target.value);

    setCurrentColumn(currentColumn + 1);
    if (currentColumn === word.length - 1) {
      setCurrentRow(currentRow + 1);
      setCurrentColumn(0);
    }
  };

  useEffect(() => {
    setWord((prevState) => {
      return getFirstRandomWord();
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
        <Col xs={12} md={8} lg={6}>
          <Header />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={12} md={10}>
          <Board word={word} board={board} />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={12} md={10}>
          <Keyboard handleKeyboardClick={handleKeyboardClick} />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default App;
