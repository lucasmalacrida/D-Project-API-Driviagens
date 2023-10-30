import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { PassengerSchema } from "../schemas/passenger.schemas.js";
import { postPassenger } from "../controllers/passenger.controllers.js";

const passengerRouter = Router();

passengerRouter.post('/passengers', validateSchema(PassengerSchema), postPassenger);

export default passengerRouter;