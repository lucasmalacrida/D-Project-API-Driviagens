import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { FlightSchema } from "../schemas/flight.schemas.js";
import { postFlight, getFlights } from "../controllers/flight.controllers.js";

const flightRouter = Router();

flightRouter.post('/flights', validateSchema(FlightSchema), postFlight);
flightRouter.get('/flights', getFlights);

export default flightRouter;