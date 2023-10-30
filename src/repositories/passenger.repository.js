import db from "../database/database.connection.js";

export async function searchPassenger(firstName, lastName) {
    const result = await db.query(`SELECT * FROM passengers WHERE "firstName"=$1 AND "lastName"=$2;`, [firstName, lastName]);
    return result;
}

export async function insertPassenger(firstName, lastName) {
    const result = await db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1,$2) RETURNING id, "firstName", "lastName" ;`, [firstName, lastName]);
    return result;
}

export async function selectPassengersTravels(name) {
    let sql = `
        SELECT
            passengers."firstName" || ' ' || passengers."lastName" AS passenger,
            COUNT(travels.id) AS "travels"
        FROM passengers
        LEFT JOIN travels ON travels."passengerId" = passengers.id
        GROUP BY passengers."firstName", passengers."lastName", passengers.id
        ORDER BY "travels" DESC
        ;`;
    const values = [];

    if (name) {
        sql = `
        SELECT
            passengers."firstName" || ' ' || passengers."lastName" AS passenger,
            COUNT(travels.id) AS "travels"
        FROM passengers
        LEFT JOIN travels ON travels."passengerId" = passengers.id
        WHERE passengers."firstName" || ' ' || passengers."lastName" LIKE $1
        GROUP BY passengers."firstName", passengers."lastName", passengers.id
        ORDER BY "travels" DESC
        ;`;
        values.push(`%${name}%`)
    }

    const result = await db.query(sql, values);
    return result;
}