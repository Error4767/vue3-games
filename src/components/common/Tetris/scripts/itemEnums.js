/*
shape: 形状，必须是一个方型，便于旋转
weights: 权重，随机到该项的概率
*/
export default [
  {
    shape: [
      [1],
      [1],
      [1],
      [1],
    ],
    weights: 1,
  },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    weights: 1,
  },
  {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    weights: 1,
  },
  {
    shape:  [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    weights: 1,
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    weights: 1,
  }
];