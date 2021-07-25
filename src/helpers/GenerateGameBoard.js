function createGameTemplate(height, width) {
  let board = [];

  for (let i = 0; i < height; i++) {
    let nestedColum = [];
    for (let j = 0; j < width; j++) {
      nestedColum.push({
        x: i,
        y: j,
        isBomb: false,
        neighbour: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      });
    }
    board.push(nestedColum);
  }
  return board;
};

function placeBombs (board, height, width, bombs) {
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
};

function randomNumber (upperLimit) {
  return Math.floor(Math.random() * upperLimit);
};


export {
  createGameTemplate,
  placeBombs,
}