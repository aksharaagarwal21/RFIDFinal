import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { report, last, history } from '../controllers/locationController.js';

const router = Router();

router.post('/report', authenticateToken, report);
router.get('/last', authenticateToken, last);
router.get('/history', authenticateToken, history);

export default router;
