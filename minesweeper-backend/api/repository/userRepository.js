const users = [{ id: 'lhoms' }];

module.exports.get = (id) => users.find((x) => x.id === id);

module.exports.getAll = () => users;

module.exports.save = (user) => {
  const i = users.findIndex((x) => x.id === user.id);
  if (i !== -1) {
    users[i] = user;
  } else {
    users.push(user);
  }
};
