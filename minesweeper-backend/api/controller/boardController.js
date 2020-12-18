const boardService = require('../service/boardService');

module.exports.getById = (req, res) => {
  const { id } = req.params;
  try {
    const board = boardService.getById(id);
    res.send(board);
  } catch (e) {
    // delegate handling
    res.status(404).send({ error: `Board id ${id} not found!` });
  }
};

module.exports.newBoard = (req, res) => {
  const { height, width, mines } = req.body;
  const board = boardService.getNewBoard(height, width, mines);
  res.send(board);
};

module.exports.revealCell = (req, res) => {
  const { id, x, y } = req.params;
  try {
    const board = boardService.reveal(id, Number(x), Number(y));
    res.send(board);
  } catch (e) {
    // delegate handling
    res.status(404).send({ error: `Board id ${id} not found!` });
  }
};
