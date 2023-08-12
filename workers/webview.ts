import { type Size, SizeHint, Webview } from "webview";

type Options = {
  debug?: boolean;
} & Size;

const defaultOptions = {
  debug: false,
  width: 350,
  height: 600,
  hint: SizeHint.FIXED,
};

export function init(
  handlersMap: {
    [key: string]: (...args: unknown[]) => void | Promise<void>;
  } = {},
  { debug = false, ...options }: Options = defaultOptions,
) {
  const webview = new Webview(debug, options);

  Object.entries(handlersMap).forEach(([key, value]) => {
    webview.bind(key, value);
  });

  // webview.run();

  return {
    navigate: webview.navigate.bind(webview),
    run: webview.run.bind(webview),
  };
}
