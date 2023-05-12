// 旋转矩阵
export const ANGEL_ENUM = {
  LEFT: "left",
  RIGHT: "right",
}

export const LEFT = ANGEL_ENUM.LEFT;
export const RIGHT = ANGEL_ENUM.RIGHT;

export function toRotateMotrix(motrix, angel = LEFT) {
  const rotatedMotriex = Array.from({ length: motrix[0].length }, () => []);
  // 遍历旋转
  for (let i = 0; i < motrix[0].length; i++) {
    // 每一行的 i 索的项目，添加进去
    motrix.forEach(row => {
      rotatedMotriex[i].unshift(row[({
        [LEFT]: i,
        [RIGHT]: row.length - i,
      })[angel]]);
    });
  }
  return rotatedMotriex;
}