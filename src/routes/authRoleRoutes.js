import { Router } from 'express';
import { studentRegister, teacherRegister, wardenRegister, parentRegister, studentLogin, teacherLogin, wardenLogin, parentLogin } from '../controllers/sqliteAuthController.js';

const router = Router();

router.post('/student/register', studentRegister);
router.post('/teacher/register', teacherRegister);
router.post('/warden/register', wardenRegister);
router.post('/parent/register', parentRegister);

router.post('/student/login', studentLogin);
router.post('/teacher/login', teacherLogin);
router.post('/warden/login', wardenLogin);
router.post('/parent/login', parentLogin);

export default router;
