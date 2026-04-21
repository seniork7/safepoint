/**
 * ? This file contains a rate limiter to regulate how many
 * ? times a client can hit the api endpoints continuously
 */

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	message: { error: 'Too many requests, please try again later' },
});

export default limiter;
