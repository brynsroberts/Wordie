import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "./components/header/Header";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import Outcome from "./components/Outcome/Outcome";
import "./App.css";

const STARTER_BOARD = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const NUMBER_OF_ROWS = 6;

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
  const [totalIndex, setTotalIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);

  const newWord = () => {
    let word = "";
    let words = randomWords({
      exactly: 1,
      max: 6,
    });
    word = words[0];
    setWord(word.toUpperCase());
    if (!gameWon) {
      setStreak(0);
    }
    setGameOver(false);
    setGameWon(false);
    setCurrentRow(0);
    setCurrentColumn(0);
    setTotalIndex(0);
  };

  const updateBoardAfterInput = (letter: string) => {
    const prevBoard = board;
    prevBoard[currentRow][currentColumn] = letter;
    setBoard(prevBoard);
  };

  const handleDelete = () => {
    if (currentColumn === 0) {
      return;
    }
    let newBoard = board;
    newBoard[currentRow][currentColumn - 1] = "";
    setBoard(newBoard);
    setTotalIndex(totalIndex - 1);
    setCurrentColumn((prevState) => prevState - 1);
  };

  const handleEnter = () => {
    if (currentColumn === word.length) {
      const guess = board[currentRow].join("");
      if (guess === word) {
        setGameOver(true);
        setGameWon(true);
        setCurrentRow(currentRow + 1);
        setStreak(streak + 1);
      } else if (currentRow === NUMBER_OF_ROWS - 1) {
        setGameOver(true);
        setCurrentRow(currentRow + 1);
        setStreak(0);
      } else {
        setCurrentRow(currentRow + 1);
        setCurrentColumn(0);
      }
    }
  };

  const handleKeyboardClick = (e: any) => {
    console.log(e.target.value);
    e.preventDefault();
    if (e.target.value === "DELETE") {
      handleDelete();
      return;
    } else if (e.target.value === "ENTER") {
      handleEnter();
      return;
    }

    if (currentRow > 5) {
      setGameOver(true);
    }
    if (currentColumn < word.length) {
      updateBoardAfterInput(e.target.value);
      setTotalIndex(totalIndex + 1);
      setCurrentColumn(currentColumn + 1);
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
          <Header newWord={newWord} streak={streak} />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={12} md={10}>
          {gameOver && (
            <Outcome gameOver={gameOver} gameWon={gameWon} word={word} />
          )}
          <Board
            word={word}
            board={board}
            totalIndex={totalIndex}
            currentRow={currentRow}
            gameOver={gameOver}
          />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={12} md={10}>
          <Keyboard
            handleKeyboardClick={handleKeyboardClick}
            disableButton={gameOver}
          />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default App;
