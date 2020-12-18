const ErrorHandler = require('../model/error/ErrorHandler');
const boardService = require('../service/boardService');

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
    const {height, width, mines} = req.body;
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
