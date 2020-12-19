const ErrorHandler = require('../model/error/ErrorHandler');
const boardService = require('../service/boardService');
const {difficultyEnum} = require('../model/difficultyEnum');

module.exports.getById = (req, res) => {
  const { id } = req.params;
  try {
    const board = boardService.getById(id);
    // send or json?
    res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.newBoard = (req, res) => {
  try {
    const type = difficultyEnum.get(req.params.difficulty);
    const { height, width, mines } = type;
    const board = boardService.getNewBoard(height, width, mines);
    res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.revealCell = (req, res) => {
  const { id, x, y } = req.params;
  try {
    const board = boardService.reveal(id, Number(x), Number(y));
    res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.flagCell = (req, res) => {
  const { id, x, y } = req.params;
  try {
    const board = boardService.flagCell(id, Number(x), Number(y));
    res.json(board);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};


