import useTicTacToe, { Board } from "@/composables/useTicTacToe";

const INITIAL_BOARD = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];

describe("useTicTacToe", () => {
  test("currentBoard", () => {
    const { currentBoard } = useTicTacToe();

    expect(currentBoard.value).toEqual(INITIAL_BOARD);
  });

  test("makeMove", async () => {
    const expected: Board = [
      ["o", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];

    const { boards, currentBoard, makeMove } = useTicTacToe();

    makeMove({ col: 0, row: 0 });
    expect(currentBoard.value).toEqual(expected);
    expect(boards.value).toHaveLength(2);
    expect(boards.value[0]).toEqual(INITIAL_BOARD);
    expect(boards.value[1]).toEqual(expected);

    const newExpected: Board = [
      ["o", "_", "_"],
      ["_", "x", "_"],
      ["_", "_", "_"],
    ];
    makeMove({ col: 1, row: 1 });
    expect(currentBoard.value).toEqual(newExpected);
  });

  test("makeMove shouldn't overwrite an existing move", async () => {
    const expected: Board = [
      ["o", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];

    const { boards, currentBoard, makeMove } = useTicTacToe();

    makeMove({ col: 0, row: 0 });
    expect(currentBoard.value).toEqual(expected);

    makeMove({ col: 0, row: 0 });
    expect(currentBoard.value).toEqual(expected);

    expect(boards.value).toHaveLength(2);
    expect(boards.value[0]).toEqual(INITIAL_BOARD);
    expect(boards.value[1]).toEqual(expected);
  });

  test("should undo", async () => {
    const expected: Board = [
      ["o", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];

    const { currentBoard, makeMove, undo } = useTicTacToe();

    makeMove({ col: 0, row: 0 });
    expect(currentBoard.value).toEqual(expected);

    undo();
    expect(currentBoard.value).toEqual(INITIAL_BOARD);

    // Should not undo past first move
    undo();
    expect(currentBoard.value).toEqual(INITIAL_BOARD);
  });

  test("should redo", async () => {
    const expected: Board = [
      ["o", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];

    const { currentBoard, makeMove, undo, redo } = useTicTacToe();

    makeMove({ col: 0, row: 0 });
    expect(currentBoard.value).toEqual(expected);

    undo();
    expect(currentBoard.value).toEqual(INITIAL_BOARD);

    redo();
    expect(currentBoard.value).toEqual(expected);

    // Should not redo past last move
    redo();
    expect(currentBoard.value).toEqual(expected);
  });

  test("Should overwrite old redo history when a new move is made", () => {
    const expected: Board = [
      ["x", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];

    const { boards, currentBoard, makeMove, undo } = useTicTacToe();

    makeMove({ col: 1, row: 1 });

    undo();
    expect(currentBoard.value).toEqual(INITIAL_BOARD);

    makeMove({ col: 0, row: 0 });
    expect(currentBoard.value).toEqual(expected);

    expect(boards.value[boards.value.length - 1]).toEqual(expected);
  });
});
