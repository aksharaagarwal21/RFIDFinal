import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { ingest, recent } from '../controllers/scanController.js';

const router = Router();

// Gateways can use a service token or you can protect differently. For now, require auth.
router.post('/ingest', authenticateToken, ingest);
router.get('/recent', authenticateToken, recent);

export default router;
