import { useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { BoardModal } from "./components/BoardModal.jsx";
import { Header } from "./components/Header.jsx";
import { SquareModal } from "./components/SquareModal.jsx";

import { TURNS, WINNER_COMBOS } from "./constants.js";

function App() {
  //forma de inicializarla solo ocurre una vez
  //no se llama local todo el rato
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  //useSatete nunca dentro de un condicioneal siempre en el cuerpo
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //guardar partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  return (
    <main className="board">
      <Header resetGame={resetGame}></Header>
      <BoardModal board={board} updateBoard={updateBoard}></BoardModal>
      <SquareModal turn={turn}></SquareModal>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
