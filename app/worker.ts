import emscripten from "../func/emscripten/scheduler.js";
import { assign_jobs as rust } from "../func/rust/wasm_grupo_01";
import { assignJobs as javascriptNormal } from "../func/schedulerNormal.js";
import { assignJobs as javascriptOptimus } from "../func/schedulerOptimus.js";
import { assignJobs as assemblyscript } from "../func/assemblyscript/dist/release";

const { _assignJobs, _write_vector } = await emscripten();

const functions = {
  "js-normal": (bins, durations) => javascriptNormal(bins, durations),
  "js-optimus": (bins, durations) => javascriptOptimus(bins, durations),
  "cpp-emscripten": (bins, durations) => {
    for (const duration of durations) _write_vector(duration);
    return _assignJobs(bins, durations.length);
  },
  "rust-wasm-pack": (bins, durations) => rust(bins, durations), // @ts-ignore
  assemblyscript: assemblyscript,
} satisfies Record<string, (bins: number, durations: number[]) => number>;

export type FunctionName = keyof typeof functions;

addEventListener("message", (event) => {
  const { bins, durations, name, iterations, repetitions } = event.data;
  const fn = functions[name];
  if (!fn) throw new Error(`Invalid: ${name}`);

  try {
    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      for (let j = 1; j < repetitions; j++) fn(bins, durations);
      const result = fn(bins, durations);
      const time = performance.now() - startTime;
      postMessage({ name, time, result });
    }
  } catch (error) {
    console.error(error);
  } finally {
    postMessage("done");
  }
});

postMessage("ready");
