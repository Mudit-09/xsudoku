import React, { useState } from 'react';

const createEmptyBoard = () =>
  Array.from({ length: 9 }, () => Array(9).fill(''));

function isValidBoard(board) {
  const isValidGroup = (values) => {
    const numbers = values.filter(Boolean);
    return numbers.every(
      (number, index) =>
        /^[1-9]$/.test(number) && numbers.indexOf(number) === index
    );
  };

  for (let i = 0; i < 9; i++) {
    if (!isValidGroup(board[i])) return false;

    const column = board.map((row) => row[i]);
    if (!isValidGroup(column)) return false;
  }

  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const box = [];
      for (let r = row; r < row + 3; r++) {
        for (let c = col; c < col + 3; c++) {
          box.push(board[r][c]);
        }
      }
      if (!isValidGroup(box)) return false;
    }
  }

  return true;
}

export default function App() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [result, setResult] = useState('');

  const updateCell = (row, col, value) => {
    if (value !== '' && !/^[1-9]$/.test(value)) return;

    setBoard((current) =>
      current.map((line, r) =>
        line.map((cell, c) => (r === row && c === col ? value : cell))
      )
    );
    setResult('');
  };

  const clearBoard = () => {
    setBoard(createEmptyBoard());
    setResult('');
  };

  return (
    <main className="container">
      <h1>Sudoku Validator</h1>
      <p>Enter numbers 1-9 and validate the board.</p>

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
              value={value}
              maxLength={1}
              inputMode="numeric"
              onChange={(event) =>
                updateCell(rowIndex, colIndex, event.target.value)
              }
            />
          ))
        )}
      </div>

      <div className="actions">
        <button onClick={() => setResult(isValidBoard(board) ? 'Valid Sudoku board!' : 'Invalid Sudoku board!')}>
          Validate
        </button>
        <button className="clear" onClick={clearBoard}>Clear</button>
      </div>

      {result && <p className="result" role="status">{result}</p>}
    </main>
  );
}
