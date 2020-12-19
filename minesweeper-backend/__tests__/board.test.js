const boardService = require('../api/service/boardService');
const NotExistingBoard = require('../api/model/error/NotExistingBoard');

describe('Board Creation', () => {
  test('create new default board', () => {
    const newBoard = boardService.getNewBoard(/* default config */);
    expect(newBoard).toBeDefined();
    expect(newBoard.id).toBeDefined();
  });

  test('create new custom board', () => {
    const height = 8;
    const width = 8;
    const mines = 10;

    const newBoard = boardService.getNewBoard(height, width, mines);
    expect(newBoard).toBeDefined();
    expect(newBoard.id).toBeDefined();
  });

  test('new boards should not be finished', () => {
    const newBoard = boardService.getNewBoard();
    expect(newBoard.finished).toBeFalsy();
  });

  test('quantity of mines should be less or equals than (height * width)', () => {
    const height = 8;
    const width = 8;
    const mines = 99999;

    const newBoard = boardService.getNewBoard(height, width, mines);
    expect(newBoard.mines).toEqual(height * width);
  });
});

describe('Get Board', () => {
  test('Get existing board', () => {
    const { id } = boardService.getNewBoard(/* default config */);
    const board = boardService.getById(id);
    expect(board).toBeDefined();
  });

  test('NotExistingBoard error on get no existing board', () => {
    expect(() => boardService.getById('42')).toThrow(NotExistingBoard);
  });
});

describe('Mine insertion', () => {
  test('Adjacent mines should update near mines value', () => {
    // Board without mines
    const height = 3;
    const width = 3;
    const mines = 0;
    const board = boardService.getNewBoard(height, width, mines);

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
  test('mined selected cell should reveal and explode', () => {
    // 2 x 2 board with 4 mines (all mined)
    const height = 2;
    const width = 2;
    const mines = 4;
    const {id} = boardService.getNewBoard(height, width, mines);

    boardService.reveal(id, 0, 0);
    const board = boardService.getById(id);

    // Selected one
    expect(board.rows[0][0].revealed).toEqual(true);
    expect(board.rows[0][0].exploded).toEqual(true);
  });

  test('mined no-selected cell should reveal but no explode', () => {
    // 2 x 2 board with 4 mines (all mined)
    const height = 2;
    const width = 2;
    const mines = 4;
    const {id} = boardService.getNewBoard(height, width, mines);

    boardService.reveal(id, 0, 0);
    const board = boardService.getById(id);

    // Not the selected one
    expect(board.rows[1][1].revealed).toEqual(true);
    expect(board.rows[1][1].exploded).toEqual(false);
  });
});

describe('Flag mine', () => {
  test('Selected cell (0, 0) should be flagged', () => {
    // 2 x 2 board
    const height = 2;
    const width = 2;
    const { id } = boardService.getNewBoard(height, width);

    boardService.flagCell(id, 0, 0);
    const board = boardService.getById(id);

    expect(board.rows[0][0].flagged).toEqual(true);
  });

  test('No-selected cell (0, 0) should continue un-flagged', () => {
    // 2 x 2 board
    const height = 2;
    const width = 2;
    const { id } = boardService.getNewBoard(height, width);

    boardService.flagCell(id, 0, 0);
    const board = boardService.getById(id);

    // Check other cell
    expect(board.rows[1][1].flagged).toEqual(false);
  });

  test('Flagged cell should be un-flagged', () => {
    // 3 x 3 board
    const height = 3;
    const width = 3;
    const { id } = boardService.getNewBoard(height, width);

    // Flag
    boardService.flagCell(id, 0, 0);
    // Un-flag
    boardService.flagCell(id, 0, 0);

    const board = boardService.getById(id);
    expect(board.rows[1][1].flagged).toEqual(false);
  });
});
