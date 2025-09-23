import Joi from 'joi';
import mongoose from 'mongoose';
import { ClassModel, Enrollment } from '../models/Class.js';
import { Attendance } from '../models/Attendance.js';

const classSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  section: Joi.string().allow(''),
  schedule: Joi.array().items(Joi.object({ day: Joi.string(), startTime: Joi.string(), endTime: Joi.string(), room: Joi.string() }))
});

export async function createClass(req, res, next) {
  try {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Only teachers' });
    const { value, error } = classSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const cls = await ClassModel.create({ ...value, teacherId: req.user.id });
    res.status(201).json({ class: cls });
  } catch (err) { next(err); }
}

export async function listMyClasses(req, res, next) {
  try {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Only teachers' });
    const items = await ClassModel.find({ teacherId: req.user.id }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) { next(err); }
}

const enrollSchema = Joi.object({
  studentId: Joi.string().required()
});

export async function enrollStudent(req, res, next) {
  try {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Only teachers' });
    const classId = req.params.classId;
    const { value, error } = enrollSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const doc = await Enrollment.create({ classId, studentId: value.studentId });
    res.status(201).json({ enrollment: doc });
  } catch (err) { next(err); }
}

export async function listClassStudents(req, res, next) {
  try {
    const classId = req.params.classId;
    const students = await Enrollment.aggregate([
      { $match: { classId: new mongoose.Types.ObjectId(classId) } },
      { $lookup: { from: 'users', localField: 'studentId', foreignField: '_id', as: 'student' } },
      { $unwind: '$student' },
      { $project: { _id: 0, id: '$student._id', name: '$student.name', email: '$student.email' } }
    ]);
    res.json({ students });
  } catch (err) { next(err); }
}

export async function classAttendanceSummary(req, res, next) {
  try {
    const classId = req.params.classId;
    const enrollments = await Enrollment.find({ classId }).select('studentId');
    const studentIds = enrollments.map(e => e.studentId);

    const stats = await Attendance.aggregate([
      { $match: { studentId: { $in: studentIds } } },
      { $group: { _id: '$studentId', present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } }, total: { $sum: 1 } } },
      { $project: { studentId: '$_id', _id: 0, present: 1, total: 1, percentage: { $cond: [{ $eq: ['$total', 0] }, 0, { $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 0] }] } } }
    ]);

    res.json({ stats });
  } catch (err) { next(err); }
}
