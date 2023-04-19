import "./style.css";

import emscripten from "../func/emscripten/scheduler.js";

async function loadWasm() {
  const init = (await import("./../func/scheduler.wasm?init")).default;
  const { exports } = await init();
  const { memory, get_string, ...stuff } = exports;
  // const result = wasm.exports.add(4, 2);
  // document.getElementById("result").innerHTML = result.toString();
  console.log(stuff);
  const pointer = get_string();
  // get string from wasm
  console.log(memory.buffer);
  console.log(memory.buffer[pointer]);
  document.getElementById("result").innerHTML = pointer;
  // document.getElementById("result").innerHTML = wasm.exports.get_string();
}

window.addEventListener("load", loadWasm);
