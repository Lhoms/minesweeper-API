const boards = [];

module.exports.getById = (id) => boards.find((x) => x.id === id);

module.exports.save = (board) => {
  const i = boards.findIndex((x) => x.id === board.id);
  if (i !== -1) {
    boards[i] = board;
  } else {
    boards.push(board);
  }
};
