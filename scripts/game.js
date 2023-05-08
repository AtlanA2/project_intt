// Initialize Socket.IO connection
const socket = io();

// Get DOM elements
const boardEl = document.querySelector('#board');
const messageEl = document.querySelector('#message');

// Define game variables
const ROWS = 6;
const COLUMNS = 7;
let board = [];
let turn = 'red';

// Initialize board
for (let row = 0; row < ROWS; row++) {
  board[row] = [];
  for (let col = 0; col < COLUMNS; col++) {
    board[row][col] = null;
  }
}

// Render initial board state
renderBoard();

// Add event listeners to board cells
boardEl.addEventListener('click', handleCellClick);

// Handle cell click event
function handleCellClick(event) {
  const cell = event.target;
  const col = cell.cellIndex;
  const row = findNextOpenRow(col);
  if (row !== null) {
    // Update board state
    board[row][col] = turn;

    // Render updated board state
    renderBoard();

    // Emit "dropToken" event to server
    socket.emit('dropToken', { row, col, turn });

    // Check for winner
    if (checkForWinner(row, col)) {
      messageEl.textContent = `${turn} wins!`;
      boardEl.removeEventListener('click', handleCellClick);
      return;
    }

    // Switch turn
    turn = turn === 'red' ? 'yellow' : 'red';
  }
}

// Handle "updateBoard" event from server
socket.on('updateBoard', ({ row, col, turn }) => {
  board[row][col] = turn;
  renderBoard();
});

// Find the next open row in a given column
function findNextOpenRow(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return null;
}

// Check for a winner
function checkForWinner(row, col) {
  // Check row
  let count = 0;
  for (let c = 0; c < COLUMNS; c++) {
    if (board[row][c] === turn) {
      count++;
    } else {
      count = 0;
    }
    if (count === 4) {
      return true;
    }
  }

  // Check column
  count = 0;
  for (let r = 0; r < ROWS; r++) {
    if (board[r][col] === turn) {
      count++;
    } else {
      count = 0;
    }
    if (count === 4) {
      return true;
    }
  }

  // Check diagonal (top-left to bottom-right)
  let r = row;
  let c = col;
  while (r > 0 && c > 0) {
    r--;
    c--;
  }
  count = 0;
  while (r < ROWS && c < COLUMNS) {
    if (board[r][c] === turn) {
      count++;
    } else {
      count = 0;
    }
    if (count === 4) {
      return true;
    }
    r++;
    c++;
  }

  // Check diagonal (bottom-left to top-right)
  r = row;
  c = col;
  while (r < ROWS - 1 && c > 0) {
    r++;
    c
    class Game {
        constructor() {
          this.board = new Array(7).fill(null).map(() => new Array(6).fill(0));
          this.players = ['red', 'blue'];
          this.currentPlayerIndex = 0;
          this.winner = null;
        }
      
        makeMove(columnIndex) {
          if (this.winner) {
            return;
          }
      
          const column = this.board[columnIndex];
          const rowIndex = column.lastIndexOf(0);
          if (rowIndex === -1) {
            return;
          }
      
          column[rowIndex] = this.currentPlayer;
          if (this.checkForWinner(rowIndex, columnIndex)) {
            this.winner = this.currentPlayer;
          }
          this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        }
      
        checkForWinner(rowIndex, columnIndex) {
          const player = this.currentPlayer;
          // Check for horizontal win
          let count = 0;
          for (let i = 0; i < this.board.length; i++) {
            if (this.board[i][rowIndex] === player) {
              count++;
              if (count === 4) {
                return true;
              }
            } else {
              count = 0;
            }
          }
      
          // Check for vertical win
          count = 0;
          for (let i = 0; i < this.board[columnIndex].length; i++) {
            if (this.board[columnIndex][i] === player) {
              count++;
              if (count === 4) {
                return true;
              }
            } else {
              count = 0;
            }
          }
      
          // Check for diagonal win (top-left to bottom-right)
          count = 0;
          let i = columnIndex;
          let j = rowIndex;
          while (i > 0 && j > 0) {
            i--;
            j--;
          }
          while (i < this.board.length && j < this.board[0].length) {
            if (this.board[i][j] === player) {
              count++;
              if (count === 4) {
                return true;
              }
            } else {
              count = 0;
            }
            i++;
            j++;
          }
      
          // Check for diagonal win (bottom-left to top-right)
          count = 0;
          i = columnIndex;
          j = rowIndex;
          while (i > 0 && j < this.board[0].length - 1) {
            i--;
            j++;
          }
          while (i < this.board.length && j >= 0) {
            if (this.board[i][j] === player) {
              count++;
              if (count === 4) {
                return true;
              }
            } else {
              count = 0;
            }
            i++;
            j--;
          }
      
          return false;
        }
      
        get currentPlayer() {
          return this.players[this.currentPlayerIndex];
        }
}}}