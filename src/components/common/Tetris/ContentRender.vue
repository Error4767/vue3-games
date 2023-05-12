<template>
  <table>
    <tr v-for="(row, rowIndex) in coreState.context">
      <td v-for="({ isEmpty }, columnIndex) in row" :class='getSquareClass(rowIndex, columnIndex, isEmpty)'>
      </td>
    </tr>
  </table>
</template>

<script setup>
const props = defineProps({
  coreState: {
    type: Object,
    required: true
  },
  squareSize: {
    type: String,
    default: "20px",
  },
});

const coreState = props.coreState;

const getSquareClass = (rowIndex, columnIndex, isEmpty) => {
  return (
    isEmpty ? (
      (
        rowIndex >= coreState.motrixPosition.row && rowIndex < (coreState.motrixPosition.row + coreState.motrix.length)
        &&
        columnIndex >= coreState.motrixPosition.column && columnIndex < (coreState.motrixPosition.column + coreState.motrix[0].length)
        &&
        coreState.motrix[rowIndex - coreState.motrixPosition.row][columnIndex - coreState.motrixPosition.column] === 1
      )
        ? { "square-dynamic": true } : { "square-had": true }
    ) : { "square": true }
  )
}
</script>

<style scoped>
.square {
  width: v-bind(squareSize);
  height: v-bind(squareSize);
  background-color: orange;
  border: 1px solid #000;
}
.square-had {
  width: v-bind(squareSize);
  height: v-bind(squareSize);
  background-color: #222;
  border: 1px solid #000;
}

.square-dynamic {
  width: v-bind(squareSize);
  height: v-bind(squareSize);
  background-color: cyan;
  border: 1px solid #000;
}
</style>