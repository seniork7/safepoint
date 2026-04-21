import express from 'express';
import paginate from '../middleware/paginate.js';
import getTips from '../controllers/tipsController.js';

const router = express.Router();

router.get('/', paginate, getTips);

export default router;
