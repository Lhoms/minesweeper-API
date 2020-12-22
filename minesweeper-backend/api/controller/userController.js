const ErrorHandler = require('../model/error/ErrorHandler');
const userService = require('../service/userService');

module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUser(id);
    await res.json(user);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    await res.json(users);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.newUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.newUser(id);
    await res.json(user);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUser(id);
    await res.json(user);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};
