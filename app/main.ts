import { concat, map, catchError } from "rxjs";

import { createRunObservable } from "./runObservable";
import { FunctionName } from "./worker";

import "./style.css";

const functionNames: FunctionName[] = ["js-normal", "js-optimus", "cpp-emscripten", "rust-wasm-pack", "assemblyscript"];

window.addEventListener("load", async () => {
  const runForm = document.getElementById("run-form")!;

  let cancelCurrent = () => {};

  runForm.addEventListener("submit", (event) => {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const bins = Number(formData.get("bins"));
    const durations = (formData.get("durations") as string).split(",").map(Number);

    event.preventDefault();
    cancelCurrent();

    console.log("Running", name);
    const fns = functionNames.map((name) => ({
      element: document.getElementById(name)!,
      observable: createRunObservable({ name, bins, durations, iterations: 1000, repetitions: 10_000 }),
    }));

    const runSubscription = concat(
      ...fns.map(({ element, observable }) => observable.pipe(map((result) => ({ ...result, element }))))
    ).subscribe({
      complete: () => console.log("Done"),
      next: ({ element, average, result }) => {
        element.innerHTML = `Result: ${result} (Average: ${average.toFixed(2)}ms)`;
      },
    });
    cancelCurrent = () => runSubscription.unsubscribe();
  });
});
