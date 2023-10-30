import { insertCity, searchCity} from "../repositories/city.repository.js";

export async function postCity(req, res) {
    const { name } = req.body;

    try {
        // Validation
        const result = await searchCity(name);
        if (result.rowCount > 0) { return res.sendStatus(409) }

        // Post DB
        await insertCity(name);

        // Return City Data
        const city = await searchCity(name);

        res.status(201).send(city.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}