import db from "../database/database.connection.js";

export async function searchCityById(id) {
    const result = await db.query(`SELECT * FROM cities WHERE id=$1;`, [id]);
    return result;
}

export async function insertFlight(origin, destination, date) {
    const result = await db.query(`INSERT INTO flights (origin, destination, date) VALUES ($1,$2,$3) RETURNING id, origin, destination, date ;`, [origin, destination, date]);
    return result;
}