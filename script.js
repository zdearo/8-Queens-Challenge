const squares = document.querySelectorAll('.square');
const blockedSquares = [];
let easyMode = false;
let queensCounter = 0;

const easyModeBtn = document.querySelector('#easy-btn');
easyModeBtn.addEventListener('click', toggleEasyMode);

const board = createBoard();

board.forEach(function(row) {
  row.forEach(function(square) {
    square.addEventListener('click', () => {
      if (square.firstElementChild === null) {
        if (blockedSquares.includes(square)) {
          console.log('blocked');
        } else {
          addQueen(square);
          queensCounter++;
          counterUpdate();
        }
      } else {
        removeQueen(square);
        queensCounter--;
        counterUpdate();
      }
    });
  });
});

function toggleEasyMode() {
  easyMode = !easyMode;
  easyModeBtn.textContent = easyMode ? 'Easy Mode: On' : 'Easy Mode: Off';
  easyModeBtn.classList.toggle('on');
  easyModeBtn.classList.toggle('off');
  if (easyMode) {
    isBlocked();
  } else {
    clearBlockedSquares();
  }
}

function createBoard() {
  const board = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = squares[i * 8 + j];
    }
  }
  return board;
}

function counterUpdate() {
  const counter = document.querySelector('.counter');
  counter.textContent = queensCounter + '/8';
}

function addQueen(square) {
  const newQueen = document.createElement('div');
  newQueen.classList.add('queen');
  const newImg = document.createElement('img');
  newImg.src = 'img/queen.png';

  newQueen.appendChild(newImg);
  square.appendChild(newQueen);

  const [i, j] = getSquareCoordinates(square);

  for (let k = 0; k < 8; k++) {
    blockedSquares.push(board[i][k]);
    blockedSquares.push(board[k][j]);
  }

  for (let k = 1; i + k < 8 && j + k < 8; k++) {
    blockedSquares.push(board[i + k][j + k]);
  }

  for (let k = 1; i - k >= 0 && j - k >= 0; k++) {
    blockedSquares.push(board[i - k][j - k]);
  }

  for (let k = 1; i + k < 8 && j - k >= 0; k++) {
    blockedSquares.push(board[i + k][j - k]);
  }

  for (let k = 1; i - k >= 0 && j + k < 8; k++) {
    blockedSquares.push(board[i - k][j + k]);
  }

  isBlocked();
}

function removeQueen(square) {
  square.removeChild(square.firstElementChild);

  const [i, j] = getSquareCoordinates(square);

  for (let k = 0; k < 8; k++) {
    blockedSquares.splice(blockedSquares.indexOf(board[i][k]), 1);
    blockedSquares.splice(blockedSquares.indexOf(board[k][j]), 1);
  }

  for (let k = 1; i + k < 8 && j + k < 8; k++) {
    blockedSquares.splice(blockedSquares.indexOf(board[i + k][j + k]), 1);
  }

  for (let k = 1; i - k >= 0 && j - k >= 0; k++) {
    blockedSquares.splice(blockedSquares.indexOf(board[i - k][j - k]), 1);
  }

  for (let k = 1; i + k < 8 && j - k >= 0; k++) {
    blockedSquares.splice(blockedSquares.indexOf(board[i + k][j - k]), 1);
  }

  for (let k = 1; i - k >= 0 && j + k < 8; k++) {
    blockedSquares.splice(blockedSquares.indexOf(board[i - k][j + k]), 1);
  }

  isBlocked();
}

function getSquareCoordinates(square) {
  const index = Array.from(squares).indexOf(square);
  const i = Math.floor(index / 8);
  const j = index % 8;
  return [i, j];
}

function isBlocked() {
  if (easyMode) {
    board.forEach(function(row) {
      row.forEach(function(square) {
        if (blockedSquares.includes(square)) {
          square.classList.add('blocked');
        } else {
          square.classList.remove('blocked');
        }
      });
    });
  }
}

function clearBlockedSquares() {
  blockedSquares.forEach(function(square) {
    square.classList.remove('blocked');
  });
}
