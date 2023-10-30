import { Router } from "express";
import { postPassenger } from "../controllers/passenger.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { PassengerSchema } from "../schemas/passenger.schemas.js";

const passengerRouter = Router();

passengerRouter.post('/passengers', validateSchema(PassengerSchema), postPassenger);

export default passengerRouter;