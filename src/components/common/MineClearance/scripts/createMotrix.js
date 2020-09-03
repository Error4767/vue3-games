function createAreaObject() {
  return {

  }
}

export default function createMotrix(length = 10, width = 10) {
  let motrix = [];
  for(let i = 0; i<width; i++) {
    let arr = [];
    for(let j = 0; j<length; j++) {
      arr.push(createAreaObject());
    }
    motrix.push(arr);
  }
  return motrix;
}