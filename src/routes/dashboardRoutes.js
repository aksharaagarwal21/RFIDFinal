import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get(
  '/student',
  authenticateToken,
  authorizeRoles('student'),
  async (req, res) => {
    res.json({
      widgets: [
        { key: 'attendance', title: 'Attendance Summary', value: 92 },
        { key: 'mess', title: 'Mess Access', status: 'Active' }
      ]
    });
  }
);

router.get(
  '/teacher',
  authenticateToken,
  authorizeRoles('teacher'),
  async (req, res) => {
    res.json({
      widgets: [
        { key: 'classes', title: 'Classes Today', value: 3 },
        { key: 'exams', title: 'Upcoming Exams', value: 1 }
      ]
    });
  }
);

router.get(
  '/warden',
  authenticateToken,
  authorizeRoles('warden'),
  async (req, res) => {
    res.json({
      widgets: [
        { key: 'hostel', title: 'Hostel Occupancy', value: 78 },
        { key: 'incidents', title: 'Incidents Today', value: 0 }
      ]
    });
  }
);

export default router;
