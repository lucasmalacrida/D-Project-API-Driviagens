import { searchPassengerById, searchFlightById, insertTravel } from "../repositories/travel.repository.js";

export async function postTravel(req, res) {
    const { passengerId, flightId } = req.body;

    try {
        // Validations
        const passenger = await searchPassengerById(passengerId);
        if (passenger.rowCount === 0) { return res.sendStatus(404) }
        const flight = await searchFlightById(flightId);
        if (flight.rowCount === 0) { return res.sendStatus(404) }

        // Post DB
        const travel = await insertTravel(passengerId, flightId);
        res.status(201).send(travel.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}