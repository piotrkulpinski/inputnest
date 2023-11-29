import { appRouter } from "./router";
import { createContext } from "./trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "OPTIONS") {
      return handleCORSPreflight();
    }

    const response = await fetchRequestHandler({
      req: request,
      createContext,
      endpoint: "",
      router: appRouter,
      onError: ({ path, error }) => {
        console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`)
      },
    });

    return addCORSHeaders(response);
  },
};

const addCORSHeaders = (res: Response) => {
  const response = new Response(res.body, res);

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Headers", "*");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  return response;
};

const handleCORSPreflight = () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
  });
};
