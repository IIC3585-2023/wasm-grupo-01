import type { WorkerInstruction } from "./types.js";

const loadFunction = {
  "js-normal": async () => {
    const { assignJobs } = await import("../func/schedulerNormal.js");
    return assignJobs;
  },
  "js-optimus": async () => {
    const { assignJobs } = await import("../func/schedulerOptimus.js");
    return assignJobs;
  },
  "cpp-emscripten": async () => {
    const { default: emscripten } = await import("../func/emscripten/scheduler.js");
    const { _assignJobs, _write_vector } = await emscripten();
    return (bins, durations) => {
      for (const duration of durations) _write_vector(duration);
      return _assignJobs(bins, durations.length);
    };
  },
  "rust-wasm-pack": async () => {
    const { assign_jobs } = await import("../func/rust/wasm_grupo_01");
    return (bins, durations) => assign_jobs(bins, durations);
  },
  assemblyscript: async () => {
    const { assignJobs } = await import("../func/assemblyscript/dist/release");
    return assignJobs;
  },
  "go-wasm": async () => {
    await import("../func/go/wasm_exec.js");
    const go = new Go();
    const { default: init } = await import("../func/go/scheduler.wasm?init");
    const instance = await init(go.importObject);
    go.run(instance);
    return GoAssignJobs;
  },
} satisfies Record<string, () => Promise<(bins: number, durations: number[]) => number>>;

export type FunctionName = keyof typeof loadFunction;

addEventListener("message", async (event) => {
  const { bins, durations, name, iterations } = event.data as WorkerInstruction;
  const loadFn = loadFunction[name];
  if (!loadFn) throw new Error(`Invalid: ${name}`);
  console.time(`Load of ${name}`);
  const fn = await loadFn();
  console.timeEnd(`Load of ${name}`);

  try {
    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
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
