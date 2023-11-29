import type { MenuItem } from "~/index"

export const navigationsConfig = {
  navigations: {
    help: [
      {
        title: "Docs",
        href: "/docs",
        target: "_blank",
      },
      {
        title: "Changelog",
        href: "/changelog",
        target: "_blank",
      },
      {
        title: "Request Feature",
        href: "/feedback",
        target: "_blank",
      },
    ] satisfies MenuItem[],
  },
}
