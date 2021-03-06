class Cell {
  constructor(x, y, nearMines = 0, hasMine = false, flagged = false, revealed = false, exploded = false) {
    this.x = x;
    this.y = y;
    this.nearMines = nearMines;
    this.hasMine = hasMine;
    this.flagged = flagged;
    this.revealed = revealed;
    this.exploded = exploded;
  }

  setFlag() {
    this.flagged = !this.flagged;
  }

  isMined() {
    return this.hasMine;
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

  isRevealed() {
    return this.revealed;
  }

  explode() {
    this.exploded = true;
  }

  increaseNearMines() {
    this.nearMines += 1;
  }
}

module.exports = Cell;
