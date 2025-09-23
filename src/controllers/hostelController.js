import Joi from 'joi';
import { HostelAccessLog } from '../models/Hostel.js';

const logSchema = Joi.object({
  userId: Joi.string().required(),
  hostelId: Joi.string().required(),
  direction: Joi.string().valid('in','out').required(),
  gate: Joi.string().allow('')
});

export async function logAccess(req, res, next) {
  try {
    const { value, error } = logSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const doc = await HostelAccessLog.create(value);
    res.status(201).json({ log: doc });
  } catch (err) { next(err); }
}

export async function listLogs(req, res, next) {
  try {
    const { hostelId, userId } = req.query;
    const query = {};
    if (hostelId) query.hostelId = hostelId;
    if (userId) query.userId = userId;
    const items = await HostelAccessLog.find(query).sort({ createdAt: -1 }).limit(500);
    res.json({ items });
  } catch (err) { next(err); }
}
