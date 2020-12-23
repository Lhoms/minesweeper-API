const ErrorHandler = require('../model/error/ErrorHandler');
const boardService = require('../service/boardService');
const userService = require('../service/userService');
const { getDifficulty } = require('../service/difficultyService');

module.exports.getAllBoards = async (req, res) => {
  const { user } = req.params;
  const { pageSize, pageNumber } = req.query;
  try {
    const boards = await boardService.getByUser(user, pageSize, pageNumber);
    await res.json(boards);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.getById = async (req, res) => {
  const { id, user } = req.params;
  try {
    const board = await boardService.getByIdAndUser(id, user);
    await res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.newBoard = async (req, res) => {
  try {
    const { user } = req.params;
    await userService.validateUser(user);

    const type = getDifficulty(req.query);
    const { height, width, mines } = type;
    const board = await boardService.getNewBoard(user, height, width, mines);
    await res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.revealCell = async (req, res) => {
  const {
    id,
    user,
    x,
    y,
  } = req.params;

  try {
    const board = await boardService.reveal(id, user, Number(x), Number(y));
    await res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.flagCell = async (req, res) => {
  const {
    id,
    user,
    x,
    y,
  } = req.params;

  try {
    const board = await boardService.flagCell(id, user, Number(x), Number(y));
    await res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};
