const express = require('express');
const {
  getById,
  newBoard,
  revealCell,
  flagCell,
} = require('./controller/boardController');

const router = express.Router();

router.get('/:id', getById);
router.post('/', newBoard);
router.post('/:difficulty', newBoard);
router.post('/:id/reveal/:x/:y', revealCell);
router.post('/:id/flag/:x/:y', flagCell);
module.exports = router;
