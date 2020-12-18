const express = require('express');
const { getById, newBoard, revealCell } = require('./controller/boardController');

const router = express.Router();

router.get('/:id', getById);
router.post('/', newBoard);
router.post('/:id/reveal/:x/:y', revealCell);

module.exports = router;
