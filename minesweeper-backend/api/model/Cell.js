class Cell {
  constructor(x, y, nearMines = 0, hasMine = false, flagged = false) {
    this.x = x;
    this.y = y;
    this.nearMines = nearMines;
    this.hasMine = hasMine;
    this.flagged = flagged;
  }

  putMine() {
    this.hasMine = true;
  }

  increaseNearMines() {
    this.nearMines += 1;
  }
}

module.exports = Cell;
