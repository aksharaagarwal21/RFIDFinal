import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { StudentProfile } from '../models/profiles/StudentProfile.js';
import { TeacherProfile } from '../models/profiles/TeacherProfile.js';
import { WardenProfile } from '../models/profiles/WardenProfile.js';
import { ParentProfile } from '../models/profiles/ParentProfile.js';

function signToken(user) {
  const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here-make-it-very-long-and-random';
  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });
}

const baseLoginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().min(6).required() });

export function buildRegisterHandler(role, profileSchema, createProfile) {
  return async function register(req, res, next) {
    try {
      const { error: pe, value: profile } = profileSchema.validate(req.body.profile || {});
      if (pe) return res.status(400).json({ message: pe.message });

      const { name, email, password } = req.body;
      if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' });

      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'Email already registered' });

      const passwordHash = await User.hashPassword(password);
      const user = await User.create({ name, email, passwordHash, role });
      await createProfile(user._id, profile);

      const token = signToken(user);
      res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) { next(err); }
  };
}

export function buildLoginHandler(role) {
  return async function login(req, res, next) {
    try {
      const { value, error } = baseLoginSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const user = await User.findOne({ email: value.email, role });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      const valid = await user.comparePassword(value.password);
      if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
      const token = signToken(user);
      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) { next(err); }
  };
}

// Profile schemas and creators
const studentProfileSchema = Joi.object({ registrationNumber: Joi.string().required(), department: Joi.string().allow(''), year: Joi.string().allow(''), className: Joi.string().allow(''), section: Joi.string().allow(''), hostel: Joi.string().allow(''), roomNumber: Joi.string().allow(''), personalEmail: Joi.string().allow(''), collegeEmail: Joi.string().allow(''), contactNumber: Joi.string().allow('') });
async function createStudentProfile(userId, profile) { await StudentProfile.create({ userId, ...profile }); }

const teacherProfileSchema = Joi.object({ teacherId: Joi.string().required(), department: Joi.string().allow(''), cabinNumber: Joi.string().allow(''), contactNumber: Joi.string().allow('') });
async function createTeacherProfile(userId, profile) { await TeacherProfile.create({ userId, ...profile }); }

const wardenProfileSchema = Joi.object({ hostel: Joi.string().required(), floorIncharge: Joi.string().allow(''), contactNumber: Joi.string().allow('') });
async function createWardenProfile(userId, profile) { await WardenProfile.create({ userId, ...profile }); }

const parentProfileSchema = Joi.object({ childStudentId: Joi.string().required(), contactNumber: Joi.string().allow(''), address: Joi.string().allow('') });
async function createParentProfile(userId, profile) { await ParentProfile.create({ userId, ...profile }); }

export const studentRegister = buildRegisterHandler('student', studentProfileSchema, createStudentProfile);
export const teacherRegister = buildRegisterHandler('teacher', teacherProfileSchema, createTeacherProfile);
export const wardenRegister = buildRegisterHandler('warden', wardenProfileSchema, createWardenProfile);
export const parentRegister = buildRegisterHandler('parent', parentProfileSchema, createParentProfile);

export const studentLogin = buildLoginHandler('student');
export const teacherLogin = buildLoginHandler('teacher');
export const wardenLogin = buildLoginHandler('warden');
export const parentLogin = buildLoginHandler('parent');
