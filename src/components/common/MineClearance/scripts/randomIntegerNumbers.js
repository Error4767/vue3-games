export default function randomIntergerNumbers(number, min=0, max=100) {
  // number是生成数量
  let nums = new Set();
  const range = max-min;
  while(nums.size < number) {
    const randomNumber = min + Math.ceil(Math.random() * range);
    nums.add(randomNumber);
  }
  return [...nums];
}
