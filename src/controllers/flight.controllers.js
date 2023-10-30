import { searchCityById, insertFlight, selectFlights } from "../repositories/flight.repository.js";
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

export async function getFlights(req, res) {
    const { origin, destination } = req.query;

    try {
        // Get DB
        const flights = await selectFlights(origin, destination);
        const flightsArray = flights.rows;
        const sortedArray = flightsArray.sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('-');
            const dateA = dayjs(`${yearA}-${monthA}-${dayA}`);
            const [dayB, monthB, yearB] = b.date.split('-');
            const dateB = dayjs(`${yearB}-${monthB}-${dayB}`);
            return dateA.isBefore(dateB) ? -1 : 1
        });
        res.send(sortedArray);
    } catch (err) {
        res.status(500).send(err.message);
    }
}