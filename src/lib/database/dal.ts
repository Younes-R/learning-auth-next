import { User } from "../definitions";
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
    throw new Error("Could not initialize database.");
  }
}

export async function createUser(user: User) {
  try {
    const result = await query(
      `INSERT INTO users (first_name, last_name, user_type, email, password) VALUES (
      $1, $2, $3, $4, $5
      )`,
      [user.firstName, user.lastName, user.userType, user.email, user.password]
    );
    return result;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Could not create user.");
  }
}

export async function isUserExistsWith(email: string) {
  try {
    const result = await query("SELECT 1 FROM users WHERE email = $1", [email]);
    return result.length > 0;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Could not search about user.");
  }
}

export async function template() {
  try {
    const result = await query("", []);
  } catch (err: any) {
    console.error(err.message);
    throw new Error("");
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await query(
      `SELECT first_name, last_name, user_type, email, password 
      FROM users WHERE email = $1`,
      [email]
    );
    return result[0];
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Could not search about user.");
  }
}
