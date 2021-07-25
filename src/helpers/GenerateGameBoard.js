function generateGameBoard(height, width, bombs) {
  this.height = height;
  this.width = width;
  this.bombs = bombs;

  this.createGameTemplate = function () {
    let board = [];

    for (let i = 0; i < this.height; i++) {
      let nestedColum = [];
      for (let j = 0; j < this.width; j++) {
        nestedColum.push({
          x: j,
          y: i,
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

  this.placeBombs = function () {
    let gameboard = this.createGameTemplate(this.height, this.width);
    let bombsLeft = this.bombs;
    while (bombsLeft > 0) {
      const randomx = this.randomNumber(this.height);
      const randomy = this.randomNumber(this.width);
      if (!gameboard[randomx][randomy].isBomb) {
        gameboard[randomx][randomy].isBomb = true;
        bombsLeft--;
      }
    }
    return gameboard;
  };

  this.randomNumber = function (upperLimit) {
    return Math.floor(Math.random() * upperLimit);
  };

  this.generateValidGameSession = function (height, width, bombs) {
    const bombBoard = this.placeBombs();
    return bombBoard;
  }
}

export default generateGameBoard;
