import Joi from 'joi';
import { LocationLog } from '../models/Location.js';

const reportSchema = Joi.object({ userId: Joi.string().required(), source: Joi.string().valid('ble','uwb','gps','wifi','manual').required(), latitude: Joi.number().optional(), longitude: Joi.number().optional(), area: Joi.string().optional(), accuracyMeters: Joi.number().optional() });

export async function report(req, res, next) {
  try {
    const { value, error } = reportSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const doc = await LocationLog.create(value);
    res.status(201).json({ location: doc });
  } catch (err) { next(err); }
}

export async function last(req, res, next) {
  try {
    const { userId } = req.query;
    const doc = await LocationLog.findOne({ userId }).sort({ createdAt: -1 });
    res.json({ location: doc });
  } catch (err) { next(err); }
}

export async function history(req, res, next) {
  try {
    const { userId, from, to } = req.query;
    const q = { userId };
    if (from || to) q.createdAt = {};
    if (from) q.createdAt.$gte = new Date(from);
    if (to) q.createdAt.$lte = new Date(to);
    const items = await LocationLog.find(q).sort({ createdAt: -1 }).limit(1000);
    res.json({ items });
  } catch (err) { next(err); }
}
