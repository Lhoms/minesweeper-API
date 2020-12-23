const redisClient = require('./redisClient');
const Board = require('../model/Board');
const Cell = require('../model/Cell');

// Each user has an hset for his boards. Access by board id.
const BOARDS_HSET = (user) => `${user}:boards`;

// Helpers

const paginate = (result, pageSize, pageNumber) => {
  if (pageSize && pageNumber) {
    const start = (pageNumber - 1) * pageSize;
    const end = pageNumber * pageSize;
    return result.slice(start, end);
  }
  return result;
};

const createBoardFromString = (string) => {
  const object = JSON.parse(string) || {};
  const { id, user, height, width } = object;
  const res = Object.assign(new Board(id, user, height, width), object);
  // convert each Cell object into Cell Class.
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      const { nearMines, hasMine, flagged, revealed, exploded } = res.rows[i][j];
      res.rows[i][j] = new Cell(j, i, nearMines, hasMine, flagged, revealed, exploded);
    }
  }
  return res;
};

// Repository methods

module.exports.getByIdAndUser = async (id, user) => {
  const board = await redisClient.hgetAsync(BOARDS_HSET(user), id);
  return createBoardFromString(board);
};

module.exports.getByUser = async (user, pageSize, pageNumber) => {
  const boards = await redisClient.hgetAllAsync(BOARDS_HSET(user));
  const result = boards ? Object.values(boards).map(createBoardFromString) : [];
  return paginate(result, pageSize, pageNumber);
};

module.exports.save = (board) => redisClient.hsetAsync(BOARDS_HSET(board.user), board.id, JSON.stringify(board));

module.exports.deleteByUser = (user) => redisClient.delAsync(BOARDS_HSET(user));
