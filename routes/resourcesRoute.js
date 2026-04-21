import express from 'express';
import paginate from '../middleware/paginate.js';
import getResources from '../controllers/resourcesController.js';

const router = express.Router();

router.get('/', paginate, getResources);

export default router;
