import db from "../database/database.connection.js";

export async function searchCity(name) {
    const result = await db.query(`SELECT * FROM cities WHERE name=$1;`, [name]);
    return result;
}

export async function insertCity(name) {
    const result = await db.query(`INSERT INTO cities (name) VALUES ($1) RETURNING id, name;`, [name]);
    return result;
}