const Board = require('../model/Board');
const NotExistingBoard = require('../model/error/NotExistingBoard');
const boardRepository = require('../repository/boardRepository');

const insertMine = (board, mineX, mineY) => {
  // insert the mine in the cell
  board.rows[mineY][mineX].putMine();

  // update number of near mines
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
    if (!board.rows[y][x].isMined()) {
      i += 1;
      insertMine(board, x, y);
    }
  }
};

module.exports.getNewBoard = (height = 8, width = 8, mines = 10) => {
  // number of mines should be less than number of cells
  const boardMines = mines <= height * width ? mines : height * width;
  const board = new Board(height, width, boardMines);
  putMines(board, height, width, boardMines);
  boardRepository.save(board);
  return board;
};

module.exports.getById = (id) => {
  const board = boardRepository.getById(id);
  if (!board) {
    throw new NotExistingBoard(id);
  }
  return board;
};

const revealEmptyAdjacentMines = (board, mineX, mineY) => {
  for (let offsetY = -1; offsetY < 2; offsetY += 1) {
    for (let offsetX = -1; offsetX < 2; offsetX += 1) {
      const x = mineX + offsetX;
      const y = mineY + offsetY;

      if (x >= 0 && y >= 0 && x < board.width && y < board.height) {
        const cell = board.rows[y][x];
        if (!cell.revealed && !cell.isMined()) {
          cell.reveal();
          if (cell.noNearMines()) {
            revealEmptyAdjacentMines(board, x, y);
          }
        }
      }
    }
  }
};

const revealMines = (board) => {
  for (let i = 0; i < board.height; i += 1) {
    for (let j = 0; j < board.width; j += 1) {
      const cell = board.rows[i][j];
      if (cell.isMined()) {
        cell.reveal();
      }
    }
  }
};

const evaluateReveal = (board, x, y) => {
  const cell = board.rows[y][x];
  if (cell.isMined()) {
    // the game has finished
    board.finished = true;
    cell.explode();
    revealMines(board);
  } else if (cell.nearMines > 0) {
    cell.reveal();
  } else {
    cell.reveal();
    revealEmptyAdjacentMines(board, x, y);
  }
};

module.exports.reveal = (boardId, x, y) => {
  const board = this.getById(boardId);

  if (board.rows[y][x].revealed) {
    return board;
  }

  evaluateReveal(board, x, y);
  board.rows[y][x].revealed = true;

  boardRepository.save(board);
  return board;
};

module.exports.flagCell = (boardId, x, y, value) => {
  const board = this.getById(boardId);

  board.rows[y][x].setFlag(value);

  boardRepository.save(board);
  return board;
};

