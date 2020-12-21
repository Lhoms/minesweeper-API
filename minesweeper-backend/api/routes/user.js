const express = require('express');
const {
  getUser,
  getAllUsers,
  newUser,
} = require('../controller/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/:id', newUser);
module.exports = router;
