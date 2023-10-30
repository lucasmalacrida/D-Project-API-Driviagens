import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { CitySchema } from "../schemas/city.schemas.js";
import { postCity } from "../controllers/city.controllers.js";

const cityRouter = Router();

cityRouter.post('/cities', validateSchema(CitySchema), postCity);

export default cityRouter;