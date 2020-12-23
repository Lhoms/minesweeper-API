const Cell = require('./Cell');

// 8x8    10 mines (default)
// 16x16  40 mines
// 16x30  99 mines
// custom?

class Board {
  constructor(id, user, height, width, mines) {
    // info
    this.id = id;
    this.user = user;
    this.height = height;
    this.width = width;
    this.mines = mines;
    this.finished = false;
    this.win = false;
    this.creationDate = new Date();
    this.endDate = null;

    this.rows = [];
    // fill (i = y axis) (j = x axis)
    for (let i = 0; i < height; i += 1) {
      this.rows[i] = [];
      for (let j = 0; j < width; j += 1) {
        this.rows[i][j] = new Cell(j, i, 0, false);
      }
    }
  }

  winGame() {
    this.win = true;
  }

  finish() {
    this.finished = true;
    this.endDate = new Date();
  }
}

module.exports = Board;
