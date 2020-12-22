const ErrorHandler = require('../model/error/ErrorHandler');
const boardService = require('../service/boardService');
const userService = require('../service/userService');
const { getDifficulty } = require('../service/difficultyService');

module.exports.getAllBoards = (req, res) => {
  const { user } = req.params;
  try {
    const boards = boardService.getByUser(user);
    res.json(boards);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.getById = (req, res) => {
  const { id, user } = req.params;
  try {
    const board = boardService.getByIdAndUser(id, user);
    res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.newBoard = (req, res) => {
  try {
    const { user } = req.params;
    userService.validateUser(user);

    const type = getDifficulty(req.query);
    const { height, width, mines } = type;
    const board = boardService.getNewBoard(user, height, width, mines);
    res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.revealCell = (req, res) => {
  const {
    id,
    user,
    x,
    y,
  } = req.params;

  try {
    const board = boardService.reveal(id, user, Number(x), Number(y));
    res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.flagCell = (req, res) => {
  const {
    id,
    user,
    x,
    y,
  } = req.params;

  try {
    const board = boardService.flagCell(id, user, Number(x), Number(y));
    res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};
