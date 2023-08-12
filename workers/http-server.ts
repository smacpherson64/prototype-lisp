import { handleWebSocketRequest, isWebSocketRequest } from "./web-sockets.ts";

async function handleHTTPRequest(req: Request) {
  const url = new URL(req.url);
  const filepath = `./public/${decodeURIComponent(url.pathname)}`;

  console.log("REQUEST", filepath);

  // Try opening the file
  let file;
  try {
    file = await Deno.open(filepath, { read: true });
  } catch {
    return new Response("404 Not Found", { status: 404 });
  }

  const response = new Response(file.readable);

  if (filepath.endsWith(".js")) {
    response.headers.append(
      "Content-Type",
      "application/javascript; charset=utf-8",
    );
  }

  return response;
}

function handler(req: Request) {
  if (isWebSocketRequest(req)) {
    return handleWebSocketRequest(req);
  }

  return handleHTTPRequest(req);
}

export function init(
  options: Deno.ServeOptions | Deno.ServeTlsOptions = {},
) {
  const controller = new AbortController();

  Deno.serve(
    { ...options, signal: controller.signal },
    handler,
  );

  return controller.abort.bind(controller);
}

const actions = {
  "request-init": init,
};

self.onmessage = function onMessage(message) {
  const data = JSON.parse(message.data);

  console.log("message from main received in worker:", data);

  // send buf back to main and transfer the underlying ArrayBuffer
  self.postMessage("received", message);
};
