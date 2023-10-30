import db from "../database/database.connection.js";

export async function searchPassengerById(id) {
    const result = await db.query(`SELECT * FROM passengers WHERE id=$1;`, [id]);
    return result;
}

export async function searchFlightById(id) {
    const result = await db.query(`SELECT * FROM flights WHERE id=$1;`, [id]);
    return result;
}

export async function insertTravel(passengerId, flightId) {
    const result = await db.query(`INSERT INTO travels ("passengerId", "flightId") VALUES ($1,$2) RETURNING id, "passengerId", "flightId" ;`, [passengerId, flightId]);
    return result;
}