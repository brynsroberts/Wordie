import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "./components/header/Header";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import Outcome from "./components/Outcome/Outcome";
import "./App.css";
const wordExists = require("word-exists");

interface BoardType {
  letter: string;
  variant: "success" | "danger" | "secondary" | "warning";
}

const STARTER_BOARD: BoardType[][] = [
  [
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
  ],
  [
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
  ],
  [
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
  ],
  [
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
  ],
  [
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
    { letter: "", variant: "secondary" },
  ],
];

interface KeyboardType {
  letter: string;
  variant: "success" | "danger" | "secondary" | "warning" | "dark";
}

let KEYBOARD: KeyboardType[][] = [
  [
    { letter: "Q", variant: "secondary" },
    { letter: "W", variant: "secondary" },
    { letter: "E", variant: "secondary" },
    { letter: "R", variant: "secondary" },
    { letter: "T", variant: "secondary" },
    { letter: "Y", variant: "secondary" },
    { letter: "U", variant: "secondary" },
    { letter: "I", variant: "secondary" },
    { letter: "O", variant: "secondary" },
    { letter: "P", variant: "secondary" },
  ],
  [
    { letter: "A", variant: "secondary" },
    { letter: "S", variant: "secondary" },
    { letter: "D", variant: "secondary" },
    { letter: "F", variant: "secondary" },
    { letter: "G", variant: "secondary" },
    { letter: "H", variant: "secondary" },
    { letter: "J", variant: "secondary" },
    { letter: "K", variant: "secondary" },
    { letter: "L", variant: "secondary" },
  ],
  [
    { letter: "ENTER", variant: "secondary" },
    { letter: "Z", variant: "secondary" },
    { letter: "X", variant: "secondary" },
    { letter: "C", variant: "secondary" },
    { letter: "V", variant: "secondary" },
    { letter: "B", variant: "secondary" },
    { letter: "N", variant: "secondary" },
    { letter: "M", variant: "secondary" },
    { letter: "DELETE", variant: "secondary" },
  ],
];

const NUMBER_OF_ROWS = 6;

const randomWords = require("random-words");
const getRandomWord = (minLetters: number, maxLetters: number) => {
  let word = "";
  while (word.length < minLetters || word.length > maxLetters) {
    let words = randomWords({
      exactly: 1,
      max: maxLetters,
    });
    word = words[0];
  }
  return word.toUpperCase();
};

const setNewBoard = (wordLength: number) => {
  let newBoard: BoardType[][] = [];
  for (let i = 0; i < 6; i++) {
    let boardRow: BoardType[] = [];
    for (let j = 0; j < wordLength; j++) {
      boardRow.push({ letter: "", variant: "secondary" });
    }
    newBoard.push(boardRow);
  }

  return newBoard;
};

const App: React.FC = () => {
  const [word, setWord] = useState<string>("FIVER");
  const [board, setBoard] = useState<BoardType[][]>(STARTER_BOARD);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const [totalIndex, setTotalIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [realWord, setRealWord] = useState<boolean>(true);
  const [keyboard, setKeyboard] = useState<KeyboardType[][]>(KEYBOARD);

  const resetGameValuesNewWord = () => {
    setGameOver(false);
    setGameWon(false);
    setCurrentRow(0);
    setCurrentColumn(0);
    setTotalIndex(0);
    setRealWord(true);
  };

  const newWord = () => {
    setWord(getRandomWord(4, 6));
    if (!gameWon) {
      setStreak(0);
    }
    resetGameValuesNewWord();
  };

  const updateBoardAfterInput = (letter: string) => {
    const prevBoard = board;
    prevBoard[currentRow][currentColumn].letter = letter;
    setBoard(prevBoard);
  };

  const handleDelete = () => {
    if (currentColumn === 0) {
      return;
    }
    let newBoard = board;
    newBoard[currentRow][currentColumn - 1].letter = "";
    setBoard(newBoard);
    setTotalIndex(totalIndex - 1);
    setCurrentColumn((prevState) => prevState - 1);
  };

  const getCurrentGuess = () => {
    let word = "";
    for (let cell of board[currentRow]) {
      word += cell.letter;
    }
    console.log(word);
    return word;
  };

  const handleEnter = () => {
    if (currentColumn === word.length) {
      const guess = getCurrentGuess();
      if (wordExists(guess)) {
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
      } else {
        setRealWord(false);
      }
    }
  };

  const handleKeyboardClick = (e: any) => {
    e.preventDefault();
    setRealWord(true);
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
      return getRandomWord(5, 5);
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
          {(gameOver || !realWord) && (
            <Outcome
              gameOver={gameOver}
              gameWon={gameWon}
              word={word}
              realWord={realWord}
            />
          )}
          <Board
            word={word}
            board={board}
            totalIndex={totalIndex}
            currentRow={currentRow}
            style={gameOver || !realWord ? "word" : ""}
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
            keyboard={keyboard}
          />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default App;
