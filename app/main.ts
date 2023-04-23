import { concat, map, catchError } from "rxjs";

import { createRunObservable } from "./runObservable";
import { FunctionName } from "./worker";

import "./style.css";

const functionNames: FunctionName[] = ["js-normal", "js-optimus", "cpp-emscripten", "rust-wasm-pack", "assemblyscript", "go-wasm"];

window.addEventListener("load", async () => {
  const runForm = document.getElementById("run-form")!;

  let cancelCurrent = () => {};

  runForm.addEventListener("submit", (event) => {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const bins = Number(formData.get("bins"));
    const durations = (formData.get("durations") as string).split(",").map(Number);
    const iterations = Number(formData.get("iterations"));
    const repetitions = Number(formData.get("repetitions"));

    event.preventDefault();
    cancelCurrent();

    const fns = functionNames.map((name) => ({
      element: document.getElementById(name)!,
      observable: createRunObservable({ name, bins, durations, iterations, repetitions }),
    }));

    const runSubscription = concat(
      ...fns.map(({ element, observable }) => observable.pipe(map((result) => ({ ...result, element }))))
    ).subscribe({
      complete: () => console.log("Done"),
      next: ({ element, average, result }) => {
        element.innerHTML = `Result: ${result} (Average: ${average.toFixed(5)}ms)`;
      },
    });
    cancelCurrent = () => runSubscription.unsubscribe();
  });
});
