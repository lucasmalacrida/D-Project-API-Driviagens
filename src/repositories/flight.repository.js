import db from "../database/database.connection.js";

export async function searchCityById(id) {
    const result = await db.query(`SELECT * FROM cities WHERE id=$1;`, [id]);
    return result;
}

export async function insertFlight(origin, destination, date) {
    const result = await db.query(`INSERT INTO flights (origin, destination, date) VALUES ($1,$2,$3) RETURNING id, origin, destination, date ;`, [origin, destination, date]);
    return result;
}

export async function selectFlights(origin, destination) {
    let sql = `
        SELECT
            flights.id AS id,
            origin_city.name AS origin,
            destination_city.name AS destination,
            flights.date AS date
        FROM flights
        JOIN cities AS origin_city ON origin_city.id = flights.origin
        JOIN cities AS destination_city ON destination_city.id = flights.destination
        `
    const values = [];

    if (origin && destination) {
        sql += 'WHERE origin_city.name = $1 AND destination_city.name = $2;';
        values.push(origin, destination);
    } else if (origin) {
        sql += 'WHERE origin_city.name = $1;';
        values.push(origin);
    } else if (destination) {
        sql += 'WHERE destination_city.name = $1;';
        values.push(destination);
    } else {
        sql += ';';
    }

    const result = await db.query(sql, values);
    return result;
}