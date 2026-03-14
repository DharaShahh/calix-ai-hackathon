const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required.");
  }

  const migrationPath = path.join(
    process.cwd(),
    "supabase",
    "migrations",
    "20260314170000_seed_reference_data.sql"
  );

  const sql = fs.readFileSync(migrationPath, "utf8");
  const statements = sql
    .split(/;\s*(?:\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  await client.query("begin");

  try {
    const existing = await client.query(
      "select version from supabase_migrations.schema_migrations where version = $1",
      ["20260314170000"]
    );

    if (existing.rowCount > 0) {
      await client.query("rollback");
      console.log("Seed migration already recorded.");
      await client.end();
      return;
    }

    await client.query(sql);
    await client.query(
      "insert into supabase_migrations.schema_migrations(version, statements, name) values ($1, $2, $3)",
      ["20260314170000", statements, "seed_reference_data"]
    );
    await client.query("commit");
    console.log("Seed migration applied and recorded successfully.");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
