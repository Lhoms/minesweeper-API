const Board = require('../model/Board');

const insertMine = (board, mineX, mineY) => {
  board.rows[mineY][mineX].putMine();

  for (let offsetY = -1; offsetY < 2; offsetY += 1) {
    for (let offsetX = -1; offsetX < 2; offsetX += 1) {
      const x = mineX + offsetX;
      const y = mineY + offsetY;
      if (x >= 0 && y >= 0 && x < board.width && y < board.height) {
        board.rows[y][x].increaseNearMines();
      }
    }
  }
};

const putMines = (board, height, width, mines) => {
  let i = 0;
  while (i < mines) {
    const x = Math.round(Math.random() * (width - 1));
    const y = Math.round(Math.random() * (height - 1));
    if (!board.rows[y][x].hasMine) {
      i += 1;
      insertMine(board, x, y);
    }
  }
};

module.exports.getNewBoard = (height = 8, width = 8, mines = 10) => {
  // number of mines should less than number of cells
  const boardMines = mines <= height * width ? mines : height * width;
  const board = new Board(height, width, boardMines);
  putMines(board, height, width, boardMines);
  return board;
};
