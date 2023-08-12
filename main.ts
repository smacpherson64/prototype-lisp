import * as path from "std/path/mod.ts";
import * as http from "./modules/http-server.ts";
import * as webview from "./modules/webview.ts";
import json from "./data.json" assert { type: "json" };

const _file = path.resolve(Deno.cwd(), "main.ts");
const filePath = path.toFileUrl(_file);

// let counter = 0;

// webview.bind("press", (a, b, c) => {
//   console.log(a, b, c);

//   return { times: counter++ };
// });

console.log("Welcome!");

const httpWorker = new Worker(
  new URL("./workers/http-server.ts", filePath).href,
  { type: "module" },
);
// const GUIWorker = new Worker(
//   new URL("./modules/http-server.js", Deno.cwd()).href,
//   { type: "module" },
// );

httpWorker.postMessage(
  JSON.stringify({ from: "main", action: ["$request-init"] }),
);

// const webviewService = webview.init({
//   log: (...args) => console.log("...args", ...args),
// });
// console.log("Starting GUI");
// webviewService.navigate("http://localhost:8000/index.html");
// webviewService.run();
