import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

let router: ReturnType<typeof createRouter> | undefined;

export function createRouter() {
  if (!router) {
    router = createTanStackRouter({
      routeTree,
      defaultPreload: "intent",
    });
  }

  return router;
}

export function getRouter() {
  if (!router) {
    router = createRouter();
  }
  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}