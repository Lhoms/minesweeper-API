class NotExistingBoard extends Error {
  constructor(id, user) {
    super();
    this.message = (id && user) ? `Board id ${id} for user ${user} not found!` : 'Board not found!';
    this.code = 404;
  }
}

module.exports = NotExistingBoard;
