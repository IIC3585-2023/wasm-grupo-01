import "./style.css";

import emscripten from "../func/emscripten/scheduler.js";
import { assignJobs as javascriptNormal } from "../func/schedulerNormal.js";
import { assignJobs as javascriptOptimus } from "../func/schedulerOptimus.js";

async function runAndDisplay(name, fn, bins, durations) {
  console.log("Running", name);
  const startTime = performance.now();
  const result = fn(bins, durations);
  const endTime = performance.now();
  console.log(result);
  const delta = endTime - startTime
  console.log(`${name}: ${delta}ms`);
  const div = document.getElementById(name);
  div.innerHTML = `Got ${result} in ${delta}ms`;
}

window.addEventListener("load", async () => {
  const runForm = document.getElementById("run-form");
  
  const { _assignJobs, _write_vector } = await emscripten();
  const functions = {
    "js-normal": (bins, durations) => {
      return javascriptNormal(bins, durations);
    },
    "js-optimus": (bins, durations) => {
      return javascriptOptimus(bins, durations);
    },
    "cpp-emscripten": (bins, durations) => {
      for (const duration of durations) {
        _write_vector(duration);
      }
      return _assignJobs(bins, durations.length);
    },
  };

  runForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { submitter, target } = event;

    const name = submitter.dataset["fn"];
    const fn = functions[name];
    if (!fn) throw new Error(`Invalid: ${submitter.dataset["fn"]}`);

    const data = new FormData(target);

    const binsStr = data.get("bins");
    const bins = parseInt(binsStr, 10);
    const durationsStr = data.get("durations");
    const durations = durationsStr.split(",").map((s) => parseInt(s, 10));

    runAndDisplay(name, fn, bins, durations);
  });
});
