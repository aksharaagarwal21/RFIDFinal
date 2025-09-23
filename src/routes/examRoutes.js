import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createExam, issueTicket, verifyEntry, myTickets } from '../controllers/examController.js';

const router = Router();

router.post('/', authenticateToken, createExam);
router.post('/ticket', authenticateToken, issueTicket);
router.post('/verify', authenticateToken, verifyEntry);
router.get('/my-tickets', authenticateToken, myTickets);

export default router;
