import express from 'express';
import paginate from '../middleware/paginate.js';
import getAlerts from '../controllers/alertsController.js';

const router = express.Router();

router.get('/', paginate, getAlerts);

export default router;
