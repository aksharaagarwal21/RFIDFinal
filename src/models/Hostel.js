import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    wardenId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true, versionKey: false }
);

const hostelAccessLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hostelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
    direction: { type: String, enum: ['in', 'out'], required: true },
    gate: { type: String }
  },
  { timestamps: true, versionKey: false }
);

export const Hostel = mongoose.models.Hostel || mongoose.model('Hostel', hostelSchema);
export const HostelAccessLog = mongoose.models.HostelAccessLog || mongoose.model('HostelAccessLog', hostelAccessLogSchema);
