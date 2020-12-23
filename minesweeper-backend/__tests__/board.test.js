const boardService = require('../api/service/boardService');
const NotExistingBoard = require('../api/model/error/NotExistingBoard');

describe('Board Creation', () => {
  test('create new default board', async () => {
    const newBoard = await boardService.getNewBoard('user' /* default config */);
    expect(newBoard).toBeDefined();
    expect(newBoard.id).toBeDefined();
  });

  test('create new custom board', async () => {
    const height = 8;
    const width = 8;
    const mines = 10;

    const newBoard = await boardService.getNewBoard('user', height, width, mines);
    expect(newBoard).toBeDefined();
    expect(newBoard.id).toBeDefined();
  });

  test('new boards should not be finished', async () => {
    const newBoard = await boardService.getNewBoard();
    expect(newBoard.finished).toBeFalsy();
  });

  test('quantity of mines should be less or equals than (height * width)', async () => {
    const height = 8;
    const width = 8;
    const mines = 99999;

    const newBoard = await boardService.getNewBoard('user', height, width, mines);
    expect(newBoard.mines).toEqual(height * width);
  });
});

describe('Get Board', () => {
  test('Get existing board', async () => {
    const { id } = await boardService.getNewBoard('user' /* default config */);
    const board = await boardService.getByIdAndUser(id, 'user');
    expect(board).toBeDefined();
  });

  test('NotExistingBoard error on get no existing board', async () => {
    await expect(boardService.getByIdAndUser('42', 'user_2')).rejects.toThrow(NotExistingBoard);
  });
});

describe('Get All boards', () => {
  test('Get existing boards for user', async () => {
    await boardService.getNewBoard('new user' /* default config */);
    const boards = await boardService.getByUser('new user');
    expect(boards.length).toEqual(1);
  });

  test('Gets empty array when user has no boards', async () => {
    const boards = await boardService.getByUser('other user');
    expect(boards.length).toEqual(0);
  });
});

describe('Mine insertion', () => {
  test('Adjacent mines should update near mines value', async () => {
    // Board without mines
    const height = 3;
    const width = 3;
    const mines = 0;
    const board = await boardService.getNewBoard('user', height, width, mines);

    // Inserting one in the middle (1, 1)
    boardService.insertMine(board, 1, 1);

    // nearMine value in adjacent ones should be 1
    // up
    expect(board.rows[0][0].nearMines).toEqual(1);
    expect(board.rows[0][1].nearMines).toEqual(1);
    expect(board.rows[0][2].nearMines).toEqual(1);
    // sides
    expect(board.rows[1][0].nearMines).toEqual(1);
    expect(board.rows[1][2].nearMines).toEqual(1);
    // down
    expect(board.rows[2][0].nearMines).toEqual(1);
    expect(board.rows[2][1].nearMines).toEqual(1);
    expect(board.rows[2][2].nearMines).toEqual(1);
  });
});

describe('Reveal mine', () => {
  test('mined selected cell should reveal and explode', async () => {
    // 2 x 2 board with 4 mines (all mined)
    const height = 2;
    const width = 2;
    const mines = 4;
    const { id } = await boardService.getNewBoard('user', height, width, mines);

    await boardService.reveal(id, 'user', 0, 0);
    const board = await boardService.getByIdAndUser(id, 'user');

    // Selected one
    expect(board.rows[0][0].revealed).toEqual(true);
    expect(board.rows[0][0].exploded).toEqual(true);
  });

  test('mined no-selected cell should reveal but no explode', async () => {
    // 2 x 2 board with 4 mines (all mined)
    const height = 2;
    const width = 2;
    const mines = 4;
    const { id } = await boardService.getNewBoard('user', height, width, mines);

    await boardService.reveal(id, 'user', 0, 0);
    const board = await boardService.getByIdAndUser(id, 'user');

    // Not the selected one
    expect(board.rows[1][1].revealed).toEqual(true);
    expect(board.rows[1][1].exploded).toEqual(false);
  });
});

describe('Flag mine', () => {
  test('Selected cell (0, 0) should be flagged', async () => {
    // 2 x 2 board
    const height = 2;
    const width = 2;
    const { id } = await boardService.getNewBoard('user', height, width);

    await boardService.flagCell(id, 'user', 0, 0);
    const board = await boardService.getByIdAndUser(id, 'user');

    expect(board.rows[0][0].flagged).toEqual(true);
  });

  test('No-selected cell (0, 0) should continue un-flagged', async () => {
    // 2 x 2 board
    const height = 2;
    const width = 2;
    const { id } = await boardService.getNewBoard('user', height, width);

    await boardService.flagCell(id, 'user', 0, 0);
    const board = await boardService.getByIdAndUser(id, 'user');

    // Check other cell
    expect(board.rows[1][1].flagged).toEqual(false);
  });

  test('Flagged cell should be un-flagged', async () => {
    // 3 x 3 board
    const height = 3;
    const width = 3;
    const { id } = await boardService.getNewBoard('user', height, width);

    // Flag
    await boardService.flagCell(id, 'user', 0, 0);
    // Un-flag
    await boardService.flagCell(id, 'user', 0, 0);

    const board = await boardService.getByIdAndUser(id, 'user');
    expect(board.rows[1][0].flagged).toEqual(false);
  });
});
