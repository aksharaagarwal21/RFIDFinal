import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAccess, toggleAccess } from '../controllers/messController.js';

const router = Router();

router.get('/access/:userId?', authenticateToken, getAccess);
router.post('/access/toggle', authenticateToken, toggleAccess);

export default router;
