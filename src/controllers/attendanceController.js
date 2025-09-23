import Joi from 'joi';
import mongoose from 'mongoose';
import { Attendance } from '../models/Attendance.js';
import { User } from '../models/User.js';

const listSchema = Joi.object({
  studentId: Joi.string().optional(),
  courseCode: Joi.string().optional(),
  from: Joi.date().optional(),
  to: Joi.date().optional()
});

export async function listAttendance(req, res, next) {
  try {
    const { value, error } = listSchema.validate(req.query);
    if (error) return res.status(400).json({ message: error.message });

    const query = {};
    if (value.studentId) query.studentId = new mongoose.Types.ObjectId(value.studentId);
    if (value.courseCode) query.courseCode = value.courseCode;
    if (value.from || value.to) query.date = {};
    if (value.from) query.date.$gte = new Date(value.from);
    if (value.to) query.date.$lte = new Date(value.to);

    const items = await Attendance.find(query).sort({ date: -1 }).limit(500);
    res.json({ items });
  } catch (err) {
    next(err);
  }
}

const markSchema = Joi.object({
  studentId: Joi.string().required(),
  courseCode: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.string().valid('present', 'absent').required()
});

export async function markAttendance(req, res, next) {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can mark attendance' });
    }

    const { value, error } = markSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const student = await User.findById(value.studentId);
    if (!student || student.role !== 'student') {
      return res.status(400).json({ message: 'Invalid student' });
    }

    const doc = await Attendance.findOneAndUpdate(
      { studentId: value.studentId, courseCode: value.courseCode, date: value.date },
      { $set: { status: value.status, markedBy: req.user.id } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ item: doc });
  } catch (err) {
    next(err);
  }
}

const statsSchema = Joi.object({
  studentId: Joi.string().required(),
  courseCode: Joi.string().required()
});

export async function attendanceStats(req, res, next) {
  try {
    const { value, error } = statsSchema.validate(req.query);
    if (error) return res.status(400).json({ message: error.message });

    const pipeline = [
      { $match: { studentId: new mongoose.Types.ObjectId(value.studentId), courseCode: value.courseCode } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ];

    const results = await Attendance.aggregate(pipeline);
    const present = results.find(r => r._id === 'present')?.count || 0;
    const absent = results.find(r => r._id === 'absent')?.count || 0;
    const total = present + absent;
    const percentage = total ? Math.round((present / total) * 100) : 0;

    res.json({ present, absent, total, percentage });
  } catch (err) {
    next(err);
  }
}
