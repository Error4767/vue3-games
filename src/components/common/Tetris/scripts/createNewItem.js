import itemEnums from "./itemEnums.js";

const totalWeights = itemEnums.reduce((result, item)=> result + item.weights, 0);

export default function createNewItem() {
  // 随机数向上舍入
  const randomValue = Math.random() * totalWeights;
  // find 的时候权重相加，大于对应值，就使用
  let currentTotalWeights = 0;
  // 找到在对应权重范围的
  return itemEnums.find(item=> {
    // 相加
    currentTotalWeights += item.weights;
    if(currentTotalWeights >= randomValue) {
      return true;
    }
  }).shape;
}