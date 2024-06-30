import './App.css';
import { useState } from "react";

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
};

function Board ({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    const nextSquares = squares.slice();

    if(nextSquares[i] || calculateWinner(squares)) {
      return;
    };

    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner " + winner; 
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const squaresBoard = squares.map((currentSquare, index) => {
    return <div key={index}>
      <Square value={squares[index]} onSquareClick={() => handleClick(index)}/>
      </div>
  });

  return <>
    <div className="status">{status}</div>
    <div>{squaresBoard}</div>
  </>
};

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]==squares[c]) {
      return squares[a];
    };
  };

  return null;
};

export default function Game () {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay (nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  function jumpToMove (nextMove) {
    setCurrentMove(nextMove);
  };

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to start game";
    };
    return (
      <li key={move}>
      <button onClick={() => jumpToMove(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
      <ol>{moves}</ol>
        </div>
    </div>
  );
};