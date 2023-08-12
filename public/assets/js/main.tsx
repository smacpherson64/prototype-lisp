import * as React from "react";

const socket = new WebSocket("ws://localhost:8000");

if (socket) {
  socket.addEventListener("open", () => {
    console.log("opened");
  });

  socket.addEventListener("message", (event) => {
    console.log("message", event);
  });
}

function useReducer(state, action) {}

export default function App() {
  return (
    <main>
      <section class="p-2">
        <form id="emotions-form">
          <header class="font-bold text-xs dark:text-gray-700 text-center block">
            How are you?
          </header>

          <ul class="flex space-x-1 text-[2.6rem]">
            <li>
              <button name="happy" title="happy">
                😀
              </button>
            </li>
            <li>
              <button name="confused" title="confused">
                😖
              </button>
            </li>
            <li>
              <button name="angry" title="angry">
                🤬
              </button>
            </li>
            <li>
              <button name="overwhelmed" title="overwhelmed">
                😵‍💫
              </button>
            </li>
            <li>
              <button name="pensive" title="pensive">
                🤔
              </button>
            </li>
            <li>
              <button name="sad" title="sad">
                😥
              </button>
            </li>
            <li>
              <button name="tired" title="tired">
                😴
              </button>
            </li>
          </ul>
        </form>
      </section>

      <section class="p-2">
        <form id="water-consumption-form">
          <header class="font-bold text-xs dark:text-gray-700 text-center block">
            Hydrated?
          </header>

          <ul class="grid gap-2 grid-cols-8 text-[2.8rem]">
            <li>
              <label>
                🚰
                <input type="radio" name="water" value="1" />
              </label>
            </li>
            <li>
              <label>
                🚰
                <input type="radio" name="water" value="2" />
              </label>
            </li>
            <li>
              <label>
                🚰
                <input type="radio" name="water" value="3" />
              </label>
            </li>
            <li>
              <label>
                🚰
                <input type="radio" name="water" value="4" />
              </label>
            </li>
            <li>
              <label>
                🚰
                <input type="radio" name="water" value="5" />
              </label>
            </li>
            <li>
              <label>
                🚰
                <input type="radio" name="water" value="6" />
              </label>
            </li>
            <li>
              <label>
                🚰
                <input type="radio" name="water" value="7" />
              </label>
            </li>
            <li>
              <label>
                🚰
                <input type="radio" name="water" value="8" />
              </label>
            </li>
          </ul>
        </form>
      </section>
    </main>
  );
}
