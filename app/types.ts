export type { FunctionName } from "./worker";

export type WorkerInstruction = {
  bins: number;
  durations: number[];
  name: string;
  iterations: number;
  repetitions: number;
};

export type WorkerResponse = {
  name: string;
  time: number;
  values: number[];
  iteration: number;
  result: number;
  average: number;
  variance: number;
};

export type WorkerMessage = WorkerResponse | "ready" | "done";
