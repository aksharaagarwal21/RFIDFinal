import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { logAccess, listLogs } from '../controllers/hostelController.js';

const router = Router();

router.post('/log', authenticateToken, logAccess);
router.get('/logs', authenticateToken, listLogs);

export default router;
