import randomIntegerNumbers from './randomIntegerNumbers.js';

function getMotrixSize(motrix) {
  return [motrix[0].length,motrix.length];//[长,宽]
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
  boomAreaSerials.map(v=> {
    const row = Math.floor(v / width);
    return [row, v - row * width];
  }).forEach(position=> {
    motrix[position[0]][position[1]].boom = true;
  });
  return motrix;
}