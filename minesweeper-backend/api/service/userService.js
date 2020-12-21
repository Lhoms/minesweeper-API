const NotExistingUser = require('../model/error/NotExistingUser');
const userRepository = require('../repository/userRepository');
const User = require('../model/User');

module.exports.newUser = (id) => {
  const user = new User(id);
  userRepository.save(user);
  return user;
};

module.exports.getUser = (id) => {
  const user = userRepository.get(id);
  if (!user) {
    throw new NotExistingUser(id);
  }
  return user;
};

module.exports.validateUser = (id) => {
  const user = userRepository.get(id);
  if (!user) {
    throw new NotExistingUser(id);
  }
};

module.exports.getAllUsers = () => userRepository.getAll();
