import { Router } from "express";
import passengerRouter from "./passenger.routes.js";

const router = Router();

router.use(passengerRouter);

export default router;