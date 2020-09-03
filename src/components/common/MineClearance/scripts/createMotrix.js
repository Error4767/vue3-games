function createAreaObject() {
  return {
    show: false,
    aroundBoomNumber: 0,
    signed: false
  }
}

export default function createMotrix(length = 10, width = 10) {
  let motrix = [];
  for(let i = 0; i<width; i++) {
    let arr = [];
    for(let j = 0; j<length; j++) {
      const area = createAreaObject();
      area.position = [i, j];
      arr.push(area);
    }
    motrix.push(arr);
  }
  return motrix;
}