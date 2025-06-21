import query from "./db";

export async function getPostgresVersion() {
  try {
    const result = await query("SELECT VERSION();", []);
    return result;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Could not get Postgres version.");
  }
}

export async function initializeDataBase() {
  try {
    const result = await query(
      `CREATE TABLE USERS(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name VARCHAR(30),
      last_name VARCHAR(30),
      email VARCHAR(80) UNIQUE NOT NULL,
      password VARCHAR(60) NOT NULL
      )`,
      []
    );
    return result;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Could not initialize database");
  }
}
