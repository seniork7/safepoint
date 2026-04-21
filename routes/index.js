/**
 * ? Index route file that mountes the api routes
 */

import express from 'express';
import indexController from '../controllers/indexController.js';
import tipsRoutes from './tipsRoute.js';
import resourcesRoutes from './resourcesRoute.js';
import recallsRoutes from './recallsRoute.js';
import alertsRoutes from './alertsRoute.js';

const router = express.Router();

router.get('/', indexController);
router.use('/tips', tipsRoutes);
router.use('/resources', resourcesRoutes);
router.use('/recalls', recallsRoutes);
router.use('/alerts', alertsRoutes);

export default router;
