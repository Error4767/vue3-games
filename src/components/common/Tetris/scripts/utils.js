import itemEnums from "./itemEnums";

// 检测是否有重叠方块
export function hasOverlappingSquares({
  context,
  motrix,
  motrixPosition, // { row: number, column: number }
}) {
  let hasOverlapping = false;
  // some 优化，不重复执行
  motrix.some((row, rowIndex) => {
    if (hasOverlapping) {
      return true;
    }
    row.some((item, columnIndex) => {
      // 重叠检测
      if (item && !(context[motrixPosition.row + rowIndex][motrixPosition.column + columnIndex].isEmpty)) {
        hasOverlapping = true;
      }
      return hasOverlapping;
    })
  });
  return hasOverlapping;
}

// 固定方块(将motrix设置到 context中)
export function fixedSquare({
  context,
  motrix,
  motrixPosition,
}) {
  motrix.forEach((row, rowIndex) => row.forEach((item, columnIndex) => {
    try {
      item && (context[motrixPosition.row + rowIndex][motrixPosition.column + columnIndex].isEmpty = false);
    }catch(err) {
      console.log(rowIndex, columnIndex, motrix, motrixPosition, context)
      debugger;
    }
  }));
}

// 检查和消除行
export function checkAndRemove({
  context,
}) {
  const removed = [];
  context.forEach(row => {
    // 如果满了，添加删除列表
    if (row.every(item => !item.isEmpty)) {
      removed.push(row);
    }
  });
  // 遍历删除对应的
  removed.forEach(removeRow => {
    const index = context.findIndex(row => row === removeRow);
    context.splice(index, 1);
    // 消除之后添加一行到顶部
    const newEmptyRow = removeRow.map(() => ({ isEmpty: true }));
    context.unshift(newEmptyRow);
  });
  return removed;
}

// 矩阵是否溢出
export function motrixIsOverflow({
  context,
  motrix,
  motrixPosition,
}) {
  return (
    // 横向溢出检测
    motrixPosition.row + motrix.length >= context.length
    // ||
    // // 纵向溢出检测，似乎不需要
    // motrixPosition.column + motrix[0].length >= context[0].length
  );
}

// 最大列跨度
// export const MaxColumnSpan = Math.max(...itemEnums.map(({ shape }) => shape.map(row => row.length)).flat());