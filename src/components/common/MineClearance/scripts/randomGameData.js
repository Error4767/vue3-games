import createMotrix from './createMotrix.js';
import addRandomBoom from './addRandomBoom.js';

export default function randomGameDatas(length, width, boomNumber) {
  const motrix = createMotrix(length, width);
  const hasBoomMotrix = addRandomBoom(boomNumber, motrix);
  return hasBoomMotrix;
}