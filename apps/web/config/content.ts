export const contentConfig = {
  defaultBoards: [
    { name: "Feature Requests", slug: "feature-requests", isDefault: true }, //
  ],

  defaultStatuses: [
    { name: "Open", color: "#8F98BB", order: 0, isDefault: true },
    { name: "In Review", color: "#FACC15", order: 1 },
    { name: "Planned", color: "#62BAF3", order: 2 },
    { name: "In Progress", color: "#B787F5", order: 3 },
    { name: "Completed", color: "#77DB89", order: 4 },
    { name: "Rejected", color: "#E77975", order: 5 },
  ],

  defaultTags: [
    { name: "Low Priority", color: "#77DB89", order: 0 },
    { name: "Medium Priority", color: "#70A3F3", order: 1 },
    { name: "High Priority", color: "#E77975", order: 2 },
  ],
}
