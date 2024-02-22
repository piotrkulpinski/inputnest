import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "./src/router"

export * from "./src/trpc"
export * from "./src/router"

/**
 * Enum containing all api procedurec
 */
export type RouterProcedures = keyof AppRouter["_def"]["procedures"]

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
