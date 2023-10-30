import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { FlightSchema } from "../schemas/flight.schemas.js";
import { postFlight } from "../controllers/flight.controllers.js";

const flightRouter = Router();

flightRouter.post('/flights', validateSchema(FlightSchema), postFlight);

export default flightRouter;