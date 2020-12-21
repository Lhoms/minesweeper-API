const ErrorHandler = require('../model/error/ErrorHandler');
const userService = require('../service/userService');

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  try {
    const user = userService.getUser(id);
    res.json(user);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.getAllUsers = (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.newUser = (req, res) => {
  const { id } = req.params;
  try {
    const user = userService.newUser(id);
    res.json(user);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};
