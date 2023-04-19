import "./style.css";

import emscripten from "../func/emscripten/scheduler.js";
import * as javascript from "../func/scheduler.js";

window.addEventListener("load", async () => await emscripten());
