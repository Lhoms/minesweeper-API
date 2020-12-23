const userService = require('../api/service/userService');
const NotExistingUser = require('../api/model/error/NotExistingUser');

describe('User Creation', () => {
  test('create new user "lhoms".', async () => {
    const newUser = await userService.newUser('lhoms');
    await userService.validateUser('lhoms');
    expect(newUser).toBeDefined();
  });
});

describe('User Validation', () => {
  test('validate existing user', async () => {
    const newUser = await userService.newUser('lhoms');
    await userService.validateUser('lhoms');
    expect(newUser).toBeDefined();
  });

  test('validate non existing user', async () => {
    const user = 'wrong username';
    await expect(userService.validateUser(user)).rejects.toThrow(NotExistingUser);
  });
});
