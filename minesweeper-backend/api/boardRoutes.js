const express = require('express');
const { newBoard, revealCell } = require('./controller/boardController');

const router = express.Router();

router.post('/', newBoard);
router.post('/reveal', revealCell);

module.exports = router;
