import Joi from 'joi';
import { MessAccess } from '../models/MessAccess.js';

export async function getAccess(req, res, next) {
  try {
    const userId = req.params.userId || req.user.id;
    const doc = await MessAccess.findOne({ userId });
    res.json({ access: doc });
  } catch (err) { next(err); }
}

const toggleSchema = Joi.object({
  userId: Joi.string().required(),
  allowed: Joi.boolean().required()
});

export async function toggleAccess(req, res, next) {
  try {
    const { value, error } = toggleSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const doc = await MessAccess.findOneAndUpdate(
      { userId: value.userId },
      { $set: { allowed: value.allowed } },
      { upsert: true, new: true }
    );
    res.json({ access: doc });
  } catch (err) { next(err); }
}
