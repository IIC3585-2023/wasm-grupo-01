import "./style.css";

import emscripten from "../func/emscripten/scheduler.js";
import * as javascriptNormal from "../func/schedulerNormal.js";
import * as javascriptOptimus from "../func/schedulerOptimus.js";

window.addEventListener("load", async () => await emscripten());
