import { assertEquals } from "@std/assert";
import reducer, { defaultState } from "./mod.js";

Deno.test.only = function only(name, fn) {
  return Deno.test({
    fn,
    name,
    only: true,
  });
};

Deno.test("returns default state", () => {
  const actions = [];
  const state = defaultState;
  const result = actions.reduce(reducer, state);
  const expectedResult = defaultState;

  assertEquals(result, expectedResult);
});

Deno.test("does nothing for invalid actions", () => {
  const actions = [["toaster", 1, 2, 3]];
  const state = defaultState;
  const result = actions.reduce(reducer, state);
  const expectedResult = defaultState;

  assertEquals(result, expectedResult);
});

Deno.test("associates a prop on state", () => {
  const actions = [["$assoc", "a", 1]];
  const state = defaultState;
  const result = actions.reduce(reducer, state);
  const expectedResult = { a: 1 };

  assertEquals(result, expectedResult);
});

Deno.test("associates a path on state", () => {
  const actions = [["$assocPath", ["a", "b", "c"], 42]];
  const state = defaultState;
  const result = actions.reduce(reducer, state);
  const expectedResult = { a: { b: { c: 42 } } };

  assertEquals(result, expectedResult);
});

Deno.test("disassociates a prop on state", () => {
  const actions = [["$dissoc", "a"]];
  const state = { a: 1 };
  const result = actions.reduce(reducer, state);
  const expectedResult = defaultState;

  assertEquals(result, expectedResult);
});

Deno.test("disassociates a path on state", () => {
  const actions = [["$dissocPath", ["a", "b", "c"]]];
  const state = { a: { b: { c: 42 } } };
  const result = actions.reduce(reducer, state);
  const expectedResult = { a: { b: {} } };

  assertEquals(result, expectedResult);
});

Deno.test("using set on a lensProp", () => {
  const actions = [["$set", ["$lensPath", ["x", 0]], 1]];
  const state = defaultState;
  const result = actions.reduce(reducer, state);
  const expectedResult = { x: [1] };

  assertEquals(result, expectedResult);
});

Deno.test("using over on a lensProp", () => {
  const actions = [["$over", ["$lensPath", ["x", 0]], "$inc"]];
  const state = { x: [1] };
  const result = actions.reduce(reducer, state);
  const expectedResult = { x: [2] };

  assertEquals(result, expectedResult);
});

Deno.test("using over on a lensProp", () => {
  const actions = [["$over", ["$lensProp", "x"], ["$aperture", 2]]];
  const state = { x: [1, 2, 3, 4, 5] };
  const result = actions.reduce(reducer, state);
  const expectedResult = {
    x: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  };

  assertEquals(result, expectedResult);
});

Deno.test("using multiple actions", () => {
  const actions = [
    ["$assoc", "y", 5],
    ["$assocPath", ["a", "b", "c"], 5],
    ["$over", ["$lensPath", ["a", "b", "c"]], "$inc"],
  ];
  const state = defaultState;
  const result = actions.reduce(reducer, state);
  const expectedResult = {
    y: 5,
    a: { b: { c: 6 } },
  };

  assertEquals(result, expectedResult);
});

Deno.test("dates", () => {
  const actions = [
    ["$assoc", "y", new Date(0).toISOString()],
    ["$modify", "y", ["$Date.addDays", 5]],
  ];
  const state = defaultState;
  const result = actions.reduce(reducer, state);
  const expectedResult = {
    y: "1970-01-06T00:00:00.000Z",
  };

  assertEquals(result, expectedResult);
});
