import Joi from 'joi';
import { Exam, ExamTicket } from '../models/Exam.js';
import { Tag } from '../models/Tag.js';

const examSchema = Joi.object({ name: Joi.string().required(), code: Joi.string().required(), date: Joi.date().required(), room: Joi.string().required() });

export async function createExam(req, res, next) {
  try {
    const { value, error } = examSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const exam = await Exam.create(value);
    res.status(201).json({ exam });
  } catch (err) { next(err); }
}

const ticketSchema = Joi.object({ examId: Joi.string().required(), studentId: Joi.string().required(), valid: Joi.boolean().default(true) });

export async function issueTicket(req, res, next) {
  try {
    const { value, error } = ticketSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const ticket = await ExamTicket.findOneAndUpdate(
      { examId: value.examId, studentId: value.studentId },
      { $set: { valid: value.valid } },
      { upsert: true, new: true }
    );
    res.status(201).json({ ticket });
  } catch (err) { next(err); }
}

const verifySchema = Joi.object({ tagUid: Joi.string().required(), examCode: Joi.string().required() });

export async function verifyEntry(req, res, next) {
  try {
    const { value, error } = verifySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const tag = await Tag.findOne({ uid: value.tagUid, active: true });
    if (!tag) return res.json({ allowed: false, reason: 'Tag not registered' });
    const exam = await Exam.findOne({ code: value.examCode });
    if (!exam) return res.json({ allowed: false, reason: 'Exam not found' });
    const ticket = await ExamTicket.findOne({ examId: exam._id, studentId: tag.userId, valid: true });
    if (!ticket) return res.json({ allowed: false, reason: 'No valid hall ticket' });
    return res.json({ allowed: true, examId: exam._id, studentId: tag.userId });
  } catch (err) { next(err); }
}

export async function myTickets(req, res, next) {
  try {
    const studentId = req.query.studentId || req.user?.id;
    if (!studentId) return res.status(400).json({ message: 'studentId is required' });
    const tickets = await ExamTicket.find({ studentId }).populate('examId');
    const items = tickets.map(t => ({
      id: t._id,
      valid: t.valid,
      exam: t.examId ? { id: t.examId._id, name: t.examId.name, code: t.examId.code, date: t.examId.date, room: t.examId.room } : null
    }));
    res.json({ items });
  } catch (err) { next(err); }
}
