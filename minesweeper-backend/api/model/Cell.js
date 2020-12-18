class Cell {
  constructor(x, y, nearMines = 0, hasMine = false, flagged = false) {
    this.x = x;
    this.y = y;
    this.nearMines = nearMines;
    this.hasMine = hasMine;
    this.flagged = flagged;
    this.revealed = false;
    this.exploded = false;
  }

  putMine() {
    this.hasMine = true;
  }

  noNearMines() {
    return this.nearMines === 0;
  }

  reveal() {
    this.revealed = true;
  }

  explode() {
    this.exploded = true;
  }

  increaseNearMines() {
    this.nearMines += 1;
  }
}

module.exports = Cell;
