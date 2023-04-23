import { Observable } from "rxjs";
import { scan } from "rxjs/operators";

import type { WorkerMessage, WorkerResponse, WorkerInstruction } from "./types";

export function createRunObservable(api: WorkerInstruction) {
  const observable = new Observable<WorkerResponse>((observer) => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
    worker.addEventListener("error", (event) => observer.error(event.error));
    worker.addEventListener("message", (event) => {
      const data: WorkerMessage = event.data;
      if (data === "ready") {
        worker.postMessage(api);
      } else if (data === "done") {
        observer.complete();
        worker.terminate();
      } else {
        observer.next(data);
      }
    });
  });
  const values = new Array(api.iterations).fill(0);
  return observable.pipe(
    scan(
      (acc, value) => {
        values[acc.iteration] = value.time;
        return {
          name: value.name,
          time: acc.time,
          values: acc.values,
          result: value.result,
          iteration: acc.iteration + 1,
          average: acc.average + (value.time - acc.average) / (acc.iteration + 1),
        };
      },
      {
        name: "",
        values,
        iteration: 0,
        average: 0,
        result: 0,
        time: 0,
      } as WorkerResponse
    )
  );
}
