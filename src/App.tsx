import React, { useState } from 'react';
import Block from './components/Block';
import './App.css';

function App() {
  const [state, setState] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (board: (string | null)[]) => {
    const combos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];

    for (let [a,b,c] of combos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleBlockClick = (index: number) => {
    if (state[index] || winner) return;

    const newState = [...state];
    newState[index] = currentTurn;
    setState(newState);

    const win = checkWinner(newState);
    if (win) {
      setTimeout(() => setWinner(win), 200);
      return;
    }

    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
  };

  const restartGame = () => {
    setState(Array(9).fill(null));
    setCurrentTurn('X');
    setWinner(null);
  };

  return (
    <div className="app-container">

      {/* WINNER SCREEN */}
      {winner && (
        <div className="winner-screen">
          <h1 className="winner-text">{winner} Wins 🎉</h1>
          <button className="restart-btn" onClick={restartGame}>
            Play Again
          </button>
        </div>
      )}

      {/* GAME BOARD */}
      {!winner && (
        <div className="board">
          {[0, 3, 6].map((row) => (
            <div className="row" key={row}>
              {[0, 1, 2].map((i) => (
                <Block
                  key={row + i}
                  value={state[row + i]}
                  onClick={() => handleBlockClick(row + i)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
