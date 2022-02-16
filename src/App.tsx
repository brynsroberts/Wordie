import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "./components/header/Header";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import Outcome from "./components/Outcome/Outcome";
import BadWord from "./components/Outcome/BadWord";
import "./App.css";
const wordExists = require("word-exists");

interface BoardType {
  letter: string;
  variant: "success" | "danger" | "secondary" | "warning";
}

interface KeyboardType {
  letter: string;
  variant: "success" | "danger" | "secondary" | "warning" | "dark";
}

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

var handleRealKeyboardClick: any;

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

const setNewKeyboard = () => {
  const newKeyboard: KeyboardType[][] = [
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
  return newKeyboard;
};

const App: React.FC = () => {
  const [word, setWord] = useState<string>("FIVER");
  const [board, setBoard] = useState<BoardType[][]>(setNewBoard(5));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const [totalIndex, setTotalIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [realWord, setRealWord] = useState<boolean>(true);
  const [keyboard, setKeyboard] = useState<KeyboardType[][]>(setNewKeyboard());
  const [modalShow, setModalShow] = useState<boolean>(false);

  const setKeyboardVariants = (guess: string) => {
    let newState = keyboard;
    for (let i = 0; i < keyboard.length; i++) {
      for (let j = 0; j < keyboard[i].length; j++) {
        if (keyboard[i][j].letter.length < 1) {
          continue;
        }
        if (
          keyboard[i][j].variant !== "success" &&
          keyboard[i][j].variant !== "danger"
        ) {
          if (
            guess.includes(keyboard[i][j].letter) &&
            keyboard[i][j].letter !== "ENTER" &&
            keyboard[i][j].letter !== "DELETE"
          ) {
            if (word.includes(keyboard[i][j].letter)) {
              for (let k = 0; k < word.length; k++) {
                if (word[k] === keyboard[i][j].letter && word[k] === guess[k]) {
                  newState[i][j].variant = "success";
                }
              }
              if (newState[i][j].variant !== "success") {
                newState[i][j].variant = "warning";
              }
            } else {
              newState[i][j].variant = "danger";
            }
          }
        }
      }
    }
    setKeyboard(newState);
  };

  const setBoardVariants = (guess: string) => {
    let newState = board;
    let guessLetterCount: any = {};
    let wordLetterCount: any = {};
    for (let j = 0; j < board[currentRow].length; j++) {
      if (guess[j] in guessLetterCount) {
        guessLetterCount[guess[j]]++;
      } else {
        guessLetterCount[guess[j]] = 1;
      }

      if (word[j] in wordLetterCount) {
        wordLetterCount[word[j]]++;
      } else {
        wordLetterCount[word[j]] = 1;
      }

      if (word.includes(board[currentRow][j].letter)) {
        if (word[j] === board[currentRow][j].letter) {
          newState[currentRow][j].variant = "success";
          guessLetterCount[word[j]]--;
          wordLetterCount[word[j]]--;
        }
      } else {
        newState[currentRow][j].variant = "danger";
      }
    }

    // fix orange cells
    for (const letter in guessLetterCount) {
      if (guessLetterCount[letter] > 0 && wordLetterCount[letter] > 0) {
        for (let i = 0; i < board[currentRow].length; i++) {
          if (
            board[currentRow][i].letter === letter &&
            newState[currentRow][i].variant !== "success" &&
            word.includes(letter)
          ) {
            newState[currentRow][i].variant = "warning";
          }
        }
      }
    }
    setBoard(newState);
  };

  const resetGameValuesNewWord = () => {
    setGameOver(false);
    setGameWon(false);
    setCurrentRow(0);
    setCurrentColumn(0);
    setTotalIndex(0);
    setRealWord(true);
    setKeyboard(setNewKeyboard());
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
    return word;
  };

  const handleEnter = () => {
    if (currentColumn === word.length) {
      const guess = getCurrentGuess();
      if (wordExists(guess)) {
        setKeyboardVariants(guess);
        setBoardVariants(guess);
        if (guess === word) {
          setGameOver(true);
          setGameWon(true);
          setCurrentRow(currentRow + 1);
          setStreak(streak + 1);
          setModalShow(true);
        } else if (currentRow === NUMBER_OF_ROWS - 1) {
          setGameOver(true);
          setCurrentRow(currentRow + 1);
          setStreak(0);
          setModalShow(true);
        } else {
          setCurrentRow(currentRow + 1);
          setCurrentColumn(0);
        }
      } else {
        setRealWord(false);
      }
    }
  };

  handleRealKeyboardClick = (keyChar: string, keyNum: number) => {
    setRealWord(true);
    let target = "";
    target = keyChar.toUpperCase();
    if (target === "BACKSPACE") {
      handleDelete();
      return;
    } else if (target === "ENTER") {
      if (!gameOver) {
        handleEnter();
      } else {
        newWord();
      }
      return;
    }
    if (currentRow > 5) {
      setGameOver(true);
    }
    if (currentColumn < word.length && keyNum >= 65 && keyNum <= 90) {
      updateBoardAfterInput(target);
      setTotalIndex(totalIndex + 1);
      setCurrentColumn(currentColumn + 1);
    }
  };

  const handleKeyboardClick = (e: any) => {
    e.preventDefault();
    setRealWord(true);
    let target = e.target.value;

    if (target === "DELETE") {
      handleDelete();
      return;
    } else if (target === "ENTER") {
      handleEnter();
      return;
    }
    if (currentRow > 5) {
      setGameOver(true);
    }
    if (currentColumn < word.length) {
      updateBoardAfterInput(target);
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
          {gameOver && (
            <Outcome
              gameOver={gameOver}
              gameWon={gameWon}
              word={word}
              realWord={realWord}
              show={modalShow}
              onHide={() => {
                setModalShow(false);
                newWord();
              }}
              streak={streak}
            />
          )}
          {!realWord && (
            <BadWord realWord={realWord} onHide={() => setRealWord(true)} />
          )}
          <Board
            word={word}
            board={board}
            totalIndex={totalIndex}
            currentRow={currentRow}
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

document.addEventListener("keydown", (e: any) => {
  e.preventDefault();
  handleRealKeyboardClick(e.key, e.keyCode);
});
