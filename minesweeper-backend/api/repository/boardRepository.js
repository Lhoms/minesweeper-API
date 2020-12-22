const boards = [];

module.exports.getByIdAndUser = (id, user) => boards.find((x) => x.id === id && x.user === user);

// temporal
const paginate = (result, pageSize, pageNumber) => {
  if (pageSize && pageNumber) {
    const start = (pageNumber - 1) * pageSize;
    const end = pageNumber * pageSize;
    return result.slice(start, end);
  }
  return result;
};

module.exports.getByUser = (user, pageSize, pageNumber) => {
  const result = boards.filter((x) => x.user === user);
  return paginate(result, pageSize, pageNumber);
};

module.exports.save = (board) => {
  const i = boards.findIndex((x) => x.id === board.id && x.user === board.user);
  if (i !== -1) {
    boards[i] = board;
  } else {
    boards.push(board);
  }
};
