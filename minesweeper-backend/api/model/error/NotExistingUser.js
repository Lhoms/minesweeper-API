class NotExistingUser extends Error {
  constructor(user) {
    super();
    this.message = user ? `User ${user} not found!` : 'User not found!';
    this.code = 404;
  }
}

module.exports = NotExistingUser;
