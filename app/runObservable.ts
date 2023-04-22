import { Observable } from "rxjs";
import { scan } from "rxjs/operators";

import type { WorkerMessage, WorkerResponse, WorkerInstruction } from "./types";
import RunnerWorker from "./worker?worker";

export function createRunObservable(api: WorkerInstruction) {
  const observable = new Observable<WorkerResponse>((observer) => {
    const worker = new RunnerWorker();
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
  return observable.pipe(
    scan(
      (acc, value) => {
        return {
          name: value.name,
          time: acc.time,
          result: value.result,
          iteration: acc.iteration + 1,
          average: acc.average + (value.time - acc.average) / (acc.iteration + 1),
          variance: acc.variance + (value.time - acc.average) * (value.time - acc.average),
        };
      },
      {
        name: "",
        iteration: 0,
        average: 0,
        variance: 0,
        result: 0,
        time: 0,
      } as WorkerResponse
    )
  );
}
