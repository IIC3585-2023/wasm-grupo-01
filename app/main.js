import "./style.css";

import emscripten from "../func/emscripten/scheduler.js";
import { assignJobs as javascriptNormal } from "../func/schedulerNormal.js";
import { assignJobs as javascriptOptimus } from "../func/schedulerOptimus.js";

async function runAndDisplay(name, fn, bins, durations) {
  // console.log("Running", name, bins, durations);
  console.time(name);
  await fn(bins, durations);
  console.timeEnd(name);
}

window.addEventListener("load", async () => {
  const runForm = document.getElementById("run-form");

  const functions = {
    "js-slow": javascriptNormal,
    "js-optimus": javascriptOptimus,
    "cpp-emscripten": async (bins, durations) => {
      await emscripten();
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
