import randomIntegerNumbers from './randomIntegerNumbers.js';

import isInvalid from './isInvalid.js';

function getMotrixSize(motrix) {
  return [motrix[0].length, motrix.length];//[长,宽]
}

function toMotrixPosition(v, length) {
  const row = Math.floor(v / length);
  const column = v - row * length;
  console.log(v, row, column);
  const position = [row, column];
  if (position[1] !== 0) {
    position[1]--;
  } else {
    if(v !== 0) {
      position[0]--;
      position[1] = length - 1;
    }else {
      position[0] = 0;
    }
  }
  console.log(position);
  return position;
}

export default function addRandomBoom(number, sourceMotrix) {
  // 深复制矩阵
  const motrix = JSON.parse(JSON.stringify(sourceMotrix));
  // 获取矩阵尺寸
  const motrixSize = getMotrixSize(motrix);
  // 获取长宽
  const length = motrixSize[0];
  const width = motrixSize[1];
  // 计算元素数量
  const motrixElementNumber = length * width;
  // 随机数
  const boomAreaSerials = randomIntegerNumbers(number, 0, motrixElementNumber);
  // 根据随机数设置矩阵元素(安雷)
  console.log(motrix);
  boomAreaSerials.map(v => toMotrixPosition(v, length)).forEach(position => {
    console.log(position);
    [
      [position[0] - 1, position[1] - 1],
      [position[0] - 1, position[1]],
      [position[0] - 1, position[1] + 1],
      [position[0], position[1] - 1],
      [position[0], position[1]],
      [position[0], position[1] + 1],
      [position[0] + 1, position[1] - 1],
      [position[0] + 1, position[1]],
      [position[0] + 1, position[1] + 1],
    ].forEach(position => {
      if (isInvalid(position)) {
        return;
      }
      // 如果才添加数量
      motrix[position[0]] && motrix[position[0]][position[1]] && (
        motrix[position[0]][position[1]].aroundBoomNumber ?
          motrix[position[0]][position[1]].aroundBoomNumber++ :
          motrix[position[0]][position[1]].aroundBoomNumber = 1
      );
    });
    motrix[position[0]][position[1]].boom = true;
  });
  return motrix;
}