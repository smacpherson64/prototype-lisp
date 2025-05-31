import { resolve } from "@std/path";
import { assertEquals } from "@std/assert";
import reducer from "./mod.js";

const only = [];

const examplesDir = resolve(".", "examples");

function readJSONSync(path) {
  return JSON.parse(Deno.readTextFileSync(path));
}

Deno.readDirSync("./examples").forEach((dirEntry) => {
  const name = dirEntry.name;

  Deno.test(name.replace(/-/g, " "), () => {
    const testDir = resolve(examplesDir, name);

    const actions = readJSONSync(resolve(testDir, "actions.json"));
    const state = readJSONSync(resolve(testDir, "state.json"));
    const output = readJSONSync(resolve(testDir, "output.json"));

    const result = actions.reduce(reducer, state);
    assertEquals(result, output);
  });
});
