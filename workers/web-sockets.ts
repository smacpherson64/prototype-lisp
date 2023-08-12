const sockets = new Map<string, WebSocket>();

export function isWebSocketRequest(req: Request) {
  return !!req.headers.get("upgrade");
}

export function handleWebSocketRequest(req: Request) {
  const id = crypto.randomUUID();
  const { socket, response } = Deno.upgradeWebSocket(req);

  sockets.set(id, socket);

  socket.addEventListener("close", () => {
    sockets.delete(id);
  });

  socket.addEventListener("open", (event) => {
    console.log("NEW SOCKET!!!", id);
    dispatchEvent(
      new CustomEvent("event::socket::opened", { detail: { event, id } }),
    );
  });

  socket.addEventListener("message", (event) => {
    console.log("NEW SOCKET MESSAGE!!!", id, event.data);
    dispatchEvent(
      new CustomEvent("event::socket::message", { detail: { event, id } }),
    );
  });

  socket.addEventListener("error", (event) => {
    console.log(
      "NEW SOCKET ERROR!!!",
      id,
      "message" in event ? event.message : event,
    );
    dispatchEvent(
      new CustomEvent("event::socket::error", { detail: { event, id } }),
    );
  });

  return response;
}
