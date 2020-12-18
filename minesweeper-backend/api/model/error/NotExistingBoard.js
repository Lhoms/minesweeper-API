class NotExistingBoard extends Error {
  constructor(id) {
    super();
    this.message = id ? `Board id ${id} not found!` : 'Board not found!';
    this.code = 404;
  }
}

module.exports = NotExistingBoard;
