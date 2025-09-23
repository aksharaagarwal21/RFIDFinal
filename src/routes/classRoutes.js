import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createClass, listMyClasses, enrollStudent, listClassStudents, classAttendanceSummary } from '../controllers/classController.js';

const router = Router();

router.post('/', authenticateToken, createClass);
router.get('/mine', authenticateToken, listMyClasses);
router.post('/:classId/enroll', authenticateToken, enrollStudent);
router.get('/:classId/students', authenticateToken, listClassStudents);
router.get('/:classId/attendance/summary', authenticateToken, classAttendanceSummary);

export default router;
