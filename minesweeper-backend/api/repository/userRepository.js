const redisClient = require('./redisClient');
const { deleteByUser } = require('./boardRepository');
const User = require('../model/User');

// Hset structure to save all users data.
const USERS_HSET = 'users';

// Helpers

const createUserFromString = (string) => Object.assign(new User(), JSON.parse(string));

// Repository methods

module.exports.get = async (id) => {
  const user = await redisClient.hgetAsync(USERS_HSET, id);
  return createUserFromString(user);
};

module.exports.delete = async (id) => {
  await redisClient.hdelAsync(USERS_HSET, id);
  await deleteByUser(id);
};

module.exports.getAll = async () => {
  const users = await redisClient.hgetAllAsync(USERS_HSET);
  return users ? Object.values(users).map(createUserFromString) : [];
};

module.exports.save = (user) => redisClient.hsetAsync(USERS_HSET, user.id, JSON.stringify(user));
