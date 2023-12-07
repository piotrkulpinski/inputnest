import { migrate } from "drizzle-orm/postgres-js/migrator"
import { directDb } from "./client"

// This will run migrations on the database, skipping the ones already applied
await migrate(directDb, { migrationsFolder: "./drizzle/migrations" })
