import { drizzle } from "drizzle-orm/node-postgres"
import { Client, Pool } from "pg"

import * as schema from "../../drizzle/schema"

const client = new Client({
  connectionString: process.env.DATABASE_URL!,
})

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

export const directDb = drizzle(client, { schema })
export const db = drizzle(pool, { schema })
