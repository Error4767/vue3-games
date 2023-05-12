// 创建上下文
export default function createContext({
  rows = 20,
  columns = 10,
} = {}) {
  // [rowItem[], ...]
  return Array.from(
    { length: rows },
    ()=> Array.from({ length: columns }, ()=> ({
      isEmpty: true,
    })),
  ); 
}