import { searchPassenger, insertPassenger, selectPassengersTravels } from "../repositories/passenger.repository.js";

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

export async function getPassengersTravels(req, res) {
    const { name } = req.query;

    try {
        // Get DB
        const passengers = await selectPassengersTravels(name);
        res.status(201).send(passengers.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}