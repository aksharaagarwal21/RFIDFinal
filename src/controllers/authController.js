import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { User } from '../models/User.js';

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'teacher', 'warden', 'parent').required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'teacher', 'warden', 'parent').required()
});

export async function register(req, res, next) {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ 
      success: false, 
      message: error.message 
    });

    const existing = await User.findOne({ email: value.email });
    if (existing) return res.status(409).json({ 
      success: false, 
      message: 'Email already registered' 
    });

    const passwordHash = await User.hashPassword(value.password);

    const user = await User.create({
      name: value.name,
      email: value.email,
      passwordHash,
      role: value.role
    });

    const token = signToken(user);

    // Updated response format - this is the key fix
    res.status(201).json({
      success: true,
      token,
      role: user.role, // Add explicit role field
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      },
      message: 'Registration successful'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ 
      success: false, 
      message: error.message 
    });

    const user = await User.findOne({ email: value.email, role: value.role });
    if (!user) return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });

    const valid = await user.comparePassword(value.password);
    if (!valid) return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });

    const token = signToken(user);

    // Updated response format - matches registration
    res.json({
      success: true,
      token,
      role: user.role, // Add explicit role field
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      },
      message: 'Login successful'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('name email role');
    if (!user) return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
    
    res.json({ 
      success: true,
      user 
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data'
    });
    next(err);
  }
}

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional()
});

export async function updateProfile(req, res, next) {
  try {
    const { value, error } = updateProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ 
      success: false, 
      message: error.message 
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: value },
      { new: true, select: 'name email role' }
    );

    res.json({ 
      success: true, 
      user,
      message: 'Profile updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
    next(err);
  }
}

// Add role-specific wrapper functions for your routes
export async function studentRegister(req, res, next) {
  req.body.role = 'student';
  return register(req, res, next);
}

export async function teacherRegister(req, res, next) {
  req.body.role = 'teacher';
  return register(req, res, next);
}

export async function wardenRegister(req, res, next) {
  req.body.role = 'warden';
  return register(req, res, next);
}

export async function parentRegister(req, res, next) {
  req.body.role = 'parent';
  return register(req, res, next);
}

export async function studentLogin(req, res, next) {
  req.body.role = 'student';
  return login(req, res, next);
}

export async function teacherLogin(req, res, next) {
  req.body.role = 'teacher';
  return login(req, res, next);
}

export async function wardenLogin(req, res, next) {
  req.body.role = 'warden';
  return login(req, res, next);
}

export async function parentLogin(req, res, next) {
  req.body.role = 'parent';
  return login(req, res, next);
}
