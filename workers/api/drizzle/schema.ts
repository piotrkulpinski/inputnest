import { relations } from "drizzle-orm"
import {
  varchar,
  pgTable,
  timestamp,
  json,
  primaryKey,
  pgEnum,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core"

export const roleEnum = pgEnum("role", ["owner", "manager", "contributor"])

export const users = pgTable(
  "users",

  // Schema
  {
    id: varchar("id", { length: 128 }).primaryKey(),
    email: varchar("email", { length: 256 }),
    name: varchar("name", { length: 256 }),
    imageUrl: varchar("imageUrl", { length: 256 }),
    customerId: varchar("customerId", { length: 256 }).unique(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
)

export const userRelations = relations(users, ({ many }) => ({
  companies: many(companyMembers),
}))

export const companies = pgTable(
  "companies",

  // Schema
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }),
    slug: varchar("slug", { length: 256 }).unique(),
    settings: json("settings").default({}),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },

  // Indexes
  (table) => ({
    slugIndex: uniqueIndex("slug_idx").on(table.slug),
  }),
)

export const companyRelations = relations(companies, ({ many }) => ({
  members: many(companyMembers),
}))

export const companyMembers = pgTable(
  "company_members",

  // Schema
  {
    role: roleEnum("role").default("contributor"),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    companyId: uuid("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
  },

  // Indexes
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.companyId] }),
  }),
)

// export const subscriptions = pgTable("Subscription", {
//   id: varchar("id", { length: 128 })
//     .primaryKey()
//     .$defaultFn(() => createId()),
//   status: text("status"),
//   productId: varchar("productId"),
//   currentPeriodStart: bigint("currentPeriodStart"),
//   currentPeriodEnd: bigint("currentPeriodEnd"),
//   cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").default(false),
//   companyId: varchar("companyId").unique(),
// })

// export const domains = pgTable("Domain", {
//   id: varchar("id", { length: 128 })
//     .primaryKey()
//     .$defaultFn(() => createId()),
//   name: varchar("name").unique().default(""),
//   createdAt: datetime("createdAt").defaultNow(),
//   updatedAt: datetime("updatedAt").defaultNow(),
//   companyId: varchar("companyId").unique(),
// })

// export const boards = pgTable("Board", {
//   id: varchar("id", { length: 128 })
//     .primaryKey()
//     .$defaultFn(() => createId()),
//   name: text("name"),
//   slug: varchar("slug"),
//   order: int("order").default(99),
//   isDefault: boolean("isDefault").default(false),
//   createdAt: datetime("createdAt").defaultNow(),
//   updatedAt: datetime("updatedAt").defaultNow(),
//   companyId: varchar("companyId"),
// }).addIndex(["companyId", "slug"], { unique: true })

// export const statuses = pgTable("Status", {
//   id: varchar("id", { length: 128 })
//     .primaryKey()
//     .$defaultFn(() => createId()),
//   name: text("name"),
//   color: text("color"),
//   order: int("order").default(99),
//   isDefault: boolean("isDefault").default(false),
//   createdAt: datetime("createdAt").defaultNow(),
//   updatedAt: datetime("updatedAt").defaultNow(),
//   companyId: varchar("companyId"),
// })

// export const tags = pgTable("Tag", {
//   id: varchar("id", { length: 128 })
//     .primaryKey()
//     .$defaultFn(() => createId()),
//   name: text("name"),
//   color: text("color"),
//   order: int("order").default(99),
//   createdAt: datetime("createdAt").defaultNow(),
//   updatedAt: datetime("updatedAt").defaultNow(),
//   companyId: varchar("companyId"),
// })

// export const posts = pgTable("Post", {
//   id: varchar("id", { length: 128 })
//     .primaryKey()
//     .$defaultFn(() => createId()),
//   title: text("title"),
//   content: text("content"),
//   createdAt: datetime("createdAt").defaultNow(),
//   updatedAt: datetime("updatedAt").defaultNow(),
//   authorId: varchar("authorId"),
//   companyId: varchar("companyId"),
//   boardId: varchar("boardId"),
//   statusId: varchar("statusId"),
// })

// export const comments = pgTable("Comment", {
//   id: varchar("id", { length: 128 })
//     .primaryKey()
//     .$defaultFn(() => createId()),
//   content: text("content"),
//   isPinned: boolean("isPinned").default(false),
//   isPrivate: boolean("isPrivate").default(false),
//   createdAt: datetime("createdAt").defaultNow(),
//   updatedAt: datetime("updatedAt").defaultNow(),
//   authorId: varchar("authorId"),
//   postId: varchar("postId"),
//   parentId: varchar("parentId"),
// })

// export const votes = pgTable("Vote", {
//   id: varchar("id", { length: 128 })
//     .primaryKey()
//     .$defaultFn(() => createId()),
//   createdAt: datetime("createdAt").defaultNow(),
//   updatedAt: datetime("updatedAt").defaultNow(),
//   authorId: varchar("authorId"),
//   postId: varchar("postId"),
// }).addIndex(["authorId", "postId"], { unique: true })
