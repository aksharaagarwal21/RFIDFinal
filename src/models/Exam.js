import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    room: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const examTicketSchema = new mongoose.Schema(
  {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    valid: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

examTicketSchema.index({ examId: 1, studentId: 1 }, { unique: true });

export const Exam = mongoose.models.Exam || mongoose.model('Exam', examSchema);
export const ExamTicket = mongoose.models.ExamTicket || mongoose.model('ExamTicket', examTicketSchema);
