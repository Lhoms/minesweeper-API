const boards = [];

module.exports.getByIdAndUser = (id, user) => boards.find((x) => x.id === id && x.user === user);

module.exports.save = (board) => {
  const i = boards.findIndex((x) => x.id === board.id && x.user === board.user);
  if (i !== -1) {
    boards[i] = board;
  } else {
    boards.push(board);
  }
};
