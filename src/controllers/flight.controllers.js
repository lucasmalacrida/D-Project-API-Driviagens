import { searchCityById, insertFlight } from "../repositories/flight.repository.js";
import dayjs from "dayjs";

export async function postFlight(req, res) {
    const { origin, destination, date } = req.body;

    try {
        // Validations
        const originCity = await searchCityById(origin);
        if (originCity.rowCount === 0) { return res.sendStatus(404) }
        const destinationCity = await searchCityById(destination);
        if (destinationCity.rowCount === 0) { return res.sendStatus(404) }

        if (origin === destination) { return res.sendStatus(409) }

        const [day, month, year] = date.split('-');
        const dateFormatted = dayjs(`${year}-${month}-${day}`);
        const today = dayjs();
        if (!dateFormatted.isAfter(today)) { return res.sendStatus(422) }

        // Post DB
        const flight = await insertFlight(origin, destination, date);
        res.status(201).send(flight.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}