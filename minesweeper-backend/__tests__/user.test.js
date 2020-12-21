const userService = require('../api/service/userService');
const NotExistingUser = require('../api/model/error/NotExistingUser');

describe('User Creation', () => {
  test('create new user "lhoms".', () => {
    const newUser = userService.newUser('lhoms');
    userService.validateUser('lhoms');
    expect(newUser).toBeDefined();
  });
});

describe('User Validation', () => {
  test('validate existing user', () => {
    const newUser = userService.newUser('lhoms');
    userService.validateUser('lhoms');
    expect(newUser).toBeDefined();
  });

  test('validate non existing user', () => {
    const user = 'wrong username';
    expect(() => userService.validateUser(user)).toThrow(NotExistingUser);
  });
});
