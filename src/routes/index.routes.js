import { Router } from "express";
import passengerRouter from "./passenger.routes.js";
import cityRouter from "./city.routes.js";
import flightRouter from "./flight.routes.js";
import travelRouter from "./travel.routes.js";

const router = Router();

router.use(passengerRouter);
router.use(cityRouter);
router.use(flightRouter);
router.use(travelRouter);

export default router;