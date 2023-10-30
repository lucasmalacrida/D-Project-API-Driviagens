import { searchPassenger, insertPassenger } from "../repositories/passenger.repository.js";

export async function postPassenger(req, res) {
    const { firstName, lastName } = req.body;

    try {
        // Validation
        const result = await searchPassenger(firstName, lastName);
        if (result.rowCount > 0) { return res.sendStatus(409) }

        // Post DB
        const passenger = await insertPassenger(firstName, lastName);
        res.status(201).send(passenger.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}