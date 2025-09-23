import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { listAttendance, markAttendance, attendanceStats } from '../controllers/attendanceController.js';

const router = Router();

router.get('/', authenticateToken, listAttendance);
router.post('/mark', authenticateToken, markAttendance);
router.get('/stats', authenticateToken, attendanceStats);

export default router;
