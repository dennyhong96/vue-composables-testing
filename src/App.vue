<template>
  <!-- <pre>{{ board }}</pre> -->

  <div>
    <button @click="undo">Undo</button>
    <button @click="redo">Redo</button>
  </div>

  <div class="board">
    <div class="row" v-for="(row, rowIdx) in currentBoard" :key="rowIdx">
      <div
        class="col"
        v-for="(col, colIdx) in row"
        :key="colIdx"
        @click="makeMove({ row: rowIdx, col: colIdx })"
      >
        {{ col }}
      </div>
    </div>
  </div>

  <pre>{{ boards }}</pre>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useTicTacToe from "./composables/useTicTacToe";

export default defineComponent({
  name: "App",

  setup() {
    const { currentBoard, makeMove, boards, undo, redo } = useTicTacToe();

    return {
      boards,
      currentBoard,
      makeMove,
      undo,
      redo,
    };
  },
});
</script>

<style scoped>
.row {
  display: flex;
}

.col {
  width: 50px;
  height: 50px;
  box-shadow: 0 0 0 1px #000;
  border-collapse: collapse;
  display: grid;
  place-items: center;
}
</style>
