function createGameBoard(height, width, bombs) {
  let board = createGameTemplate(height, width);
  board = placeBombs(board, height, width, bombs);
  return board;
}

function createGameTemplate(height, width) {
  let board = [];

  for (let i = 0; i < height; i++) {
    let nestedColum = [];
    for (let j = 0; j < width; j++) {
      nestedColum.push({
        x: i,
        y: j,
        isBomb: false,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      });
    }
    board.push(nestedColum);
  }
  return board;
}

function placeBombs(board, height, width, bombs) {
  let bombsLeft = bombs;
  while (bombsLeft > 0) {
    const randomx = randomNumber(height);
    const randomy = randomNumber(width);
    if (!board[randomx][randomy].isBomb) {
      board[randomx][randomy].isBomb = true;
      bombsLeft--;
    }
  }
  return board;
}

function allSurroundingCells(board, x, y, height, width) {
  let surroundingCells = [];

  if (x > 0) {
    surroundingCells.push(board[x - 1][y]);
  }

  if (x < height - 1) {
    surroundingCells.push(board[x + 1][y]);
  }

  if (y > 0) {
    surroundingCells.push(board[x][y - 1]);
  }

  if (y < width - 1) {
    surroundingCells.push(board[x][y + 1]);
  }

  if (x > 0 && y > 0) {
    surroundingCells.push(board[x - 1][y - 1]);
  }

  if (x > 0 && y < width - 1) {
    surroundingCells.push(board[x - 1][y + 1]);
  }

  if (x < height - 1 && y < width - 1) {
    surroundingCells.push(board[x + 1][y + 1]);
  }

  if (x < height - 1 && y > 0) {
    surroundingCells.push(board[x + 1][y - 1]);
  }

  return surroundingCells;
}

function allSurroundingCellsWithBombs(cells) {
  return cells.filter((cell) => {
    return cell.isBomb;
  });
}

function randomNumber(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}

function copyBoardState(currentState) {
  return JSON.parse(JSON.stringify(currentState));
}

export {
  allSurroundingCells,
  allSurroundingCellsWithBombs,
  createGameBoard,
  createGameTemplate,
  copyBoardState,
  placeBombs,
};
