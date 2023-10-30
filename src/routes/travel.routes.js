import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { TravelSchema } from "../schemas/travel.schemas.js";
import { postTravel } from "../controllers/travel.controllers.js";

const travelRouter = Router();

travelRouter.post('/travels', validateSchema(TravelSchema), postTravel);

export default travelRouter;