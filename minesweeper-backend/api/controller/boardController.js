const boardService = require('../service/boardService');

module.exports.newBoard = (req, res) => {
  const { height, width, mines } = req.body;
  const board = boardService.getNewBoard(height, width, mines);
  res.send(board);
};

module.exports.revealCell = (req, res) => {
  const { boardId, x, y } = req.body;
  // TODO
  res.send();
};
