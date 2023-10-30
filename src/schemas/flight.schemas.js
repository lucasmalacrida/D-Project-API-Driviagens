import joi from 'joi';

export const FlightSchema = joi.object({
    origin: joi.number().integer().min(1).required(),
    destination: joi.number().integer().min(1).required(),
    date: joi.string().pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/).required()
});