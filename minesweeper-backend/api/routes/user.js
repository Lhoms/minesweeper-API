const express = require('express');
const {
  getUser,
  getAllUsers,
  newUser,
  deleteUser,
} = require('../controller/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/:id', newUser);
router.delete('/:id', deleteUser);
module.exports = router;
