const importObject = {
  console: {
    logTest: ()=> {
      console.log("logTest");
    },
    log: (...e)=> console.log(...e),
  }
};

async function run() {
  const wasm = await WebAssembly.instantiate(await (await fetch("./public/test.wasm")).arrayBuffer(), importObject);

  console.log(wasm);

  const addTwo = wasm.instance.exports.addTwo;
  // debugger;
  console.log(addTwo, addTwo(3, 67));
}

run();