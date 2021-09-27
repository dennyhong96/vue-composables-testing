import { ref, computed, readonly } from "vue";
import cloneDeep from "lodash.clonedeep";

export type PlayerTypes = "o" | "x" | "_";

export type Board = PlayerTypes[][];

const useTicTacToe = () => {
  const boards = ref<Board[]>([
    [
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ],
  ]);

  const currentMove = ref(0);
  const currentCounter = ref<PlayerTypes>("o");

  const currentBoard = computed<Board>(() => {
    return boards.value[currentMove.value];
  });

  const makeMove = ({ col, row }: { col: number; row: number }) => {
    if (currentBoard.value[row][col] !== "_") return;

    const newBoard = [...cloneDeep(currentBoard.value)];

    newBoard[row][col] = currentCounter.value;

    boards.value = [
      ...cloneDeep(boards.value).slice(0, currentMove.value + 1),
      newBoard,
    ];

    currentMove.value++;

    if (currentCounter.value === "o") return (currentCounter.value = "x");
    return (currentCounter.value = "o");
  };

  const undo = () => {
    if (!boards.value[currentMove.value - 1]) return;
    currentMove.value--;
  };

  const redo = () => {
    if (!boards.value[currentMove.value + 1]) return;
    currentMove.value++;
  };

  return {
    boards: readonly(boards),
    currentBoard,

    makeMove,
    undo,
    redo,
  };
};

export default useTicTacToe;
