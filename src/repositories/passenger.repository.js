import db from "../database/database.connection.js";

export async function searchPassenger(firstName, lastName) {
    const result = await db.query(`SELECT * FROM passengers WHERE "firstName"=$1 AND "lastName"=$2;`, [firstName, lastName]);
    return result;
}

export async function insertPassenger(firstName, lastName) {
    const result = await db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1,$2) RETURNING id, "firstName", "lastName" ;`, [firstName, lastName]);
    return result;
}