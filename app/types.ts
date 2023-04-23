export type { FunctionName } from "./worker";

export type WorkerInstruction = {
  name: string;
  bins: number;
  durations: number[];
  iterations: number;
};

export type WorkerResponse = {
  name: string;
  time: number;
  values: number[];
  iteration: number;
  result: number;
  average: number;
};

export type WorkerMessage = WorkerResponse | "ready" | "done";
