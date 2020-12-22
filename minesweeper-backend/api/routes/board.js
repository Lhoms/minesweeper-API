const express = require('express');
const {
  getById,
  newBoard,
  revealCell,
  flagCell,
  getAllBoards,
} = require('../controller/boardController');

const router = express.Router();

router.get('/:user/board', getAllBoards);
router.get('/:user/board/:id', getById);
router.post('/:user/board/', newBoard);
router.post('/:user/board/:id/reveal/:x/:y', revealCell);
router.post('/:user/board/:id/flag/:x/:y', flagCell);
module.exports = router;
