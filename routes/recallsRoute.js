import express from 'express';
import paginate from '../middleware/paginate.js';
import getRecalls from '../controllers/recallsController.js';

const router = express.Router();

router.get('/', paginate, getRecalls);

export default router;
