import Joi from 'joi';
import { Tag } from '../models/Tag.js';
import { ScanEvent } from '../models/ScanEvent.js';
import { Attendance } from '../models/Attendance.js';
import { MessAccess } from '../models/MessAccess.js';
import { Hostel, HostelAccessLog } from '../models/Hostel.js';
import { Exam, ExamTicket } from '../models/Exam.js';

const ingestSchema = Joi.object({
  tagUid: Joi.string().required(),
  readerId: Joi.string().required(),
  location: Joi.string().required(),
  purpose: Joi.string().valid('attendance','access_gate','hostel','mess','exam','library','other').required(),
  meta: Joi.object().optional()
});

export async function ingest(req, res, next) {
  try {
    const { value, error } = ingestSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const tag = await Tag.findOne({ uid: value.tagUid, active: true });
    const event = await ScanEvent.create({ ...value });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not registered', eventId: event._id });
    }

    let result = { processed: false };

    switch (value.purpose) {
      case 'attendance': {
        const { courseCode, date } = value.meta || {};
        if (!courseCode || !date) break;
        await Attendance.findOneAndUpdate(
          { studentId: tag.userId, courseCode, date },
          { $set: { status: 'present', markedBy: tag.userId } },
          { upsert: true, new: true }
        );
        result = { processed: true, type: 'attendance' };
        break;
      }
      case 'mess': {
        const access = await MessAccess.findOne({ userId: tag.userId });
        if (!access || !access.allowed) {
          result = { processed: true, type: 'mess', allowed: false };
        } else {
          access.lastScanAt = new Date();
          await access.save();
          result = { processed: true, type: 'mess', allowed: true };
        }
        break;
      }
      case 'hostel': {
        const { hostelId, direction, gate } = value.meta || {};
        if (!hostelId || !direction) break;
        const hostel = await Hostel.findById(hostelId);
        if (!hostel) break;
        await HostelAccessLog.create({ userId: tag.userId, hostelId, direction, gate });
        result = { processed: true, type: 'hostel' };
        break;
      }
      case 'exam': {
        const { examCode } = value.meta || {};
        const exam = await Exam.findOne({ code: examCode });
        if (!exam) break;
        const ticket = await ExamTicket.findOne({ examId: exam._id, studentId: tag.userId, valid: true });
        result = { processed: true, type: 'exam', allowed: !!ticket };
        break;
      }
      default:
        break;
    }

    event.processed = true;
    await event.save();

    res.json({ eventId: event._id, userId: tag.userId, ...result });
  } catch (err) {
    next(err);
  }
}

export async function recent(req, res, next) {
  try {
    const { userId, limit = 10 } = req.query;
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    const tags = await Tag.find({ userId }).select('uid');
    const uids = tags.map(t => t.uid);
    if (uids.length === 0) return res.json({ items: [] });
    const items = await ScanEvent.find({ tagUid: { $in: uids } }).sort({ createdAt: -1 }).limit(Number(limit));
    res.json({ items });
  } catch (err) { next(err); }
}
