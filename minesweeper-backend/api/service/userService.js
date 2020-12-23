const NotExistingUser = require('../model/error/NotExistingUser');
const userRepository = require('../repository/userRepository');
const User = require('../model/User');

module.exports.newUser = async (id) => {
  const user = new User(id);
  await userRepository.save(user);
  return user;
};

module.exports.getUser = async (id) => {
  const user = await userRepository.get(id);
  if (!user.id) {
    throw new NotExistingUser(id);
  }
  return user;
};

module.exports.validateUser = async (id) => {
  const user = await userRepository.get(id);
  if (!user.id) {
    throw new NotExistingUser(id);
  }
};

module.exports.deleteUser = (id) => userRepository.delete(id);

module.exports.getAllUsers = () => userRepository.getAll();
