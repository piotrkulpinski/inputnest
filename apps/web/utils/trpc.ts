import { AppRouter } from "@repo/api/router";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
