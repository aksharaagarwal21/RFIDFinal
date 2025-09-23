import mongoose from 'mongoose';

const scanEventSchema = new mongoose.Schema(
  {
    tagUid: { type: String, required: true, index: true },
    readerId: { type: String, required: true },
    location: { type: String, required: true },
    purpose: { type: String, enum: ['attendance', 'access_gate', 'hostel', 'mess', 'exam', 'library', 'other'], default: 'other' },
    signalStrength: { type: Number },
    processed: { type: Boolean, default: false },
    meta: { type: Object }
  },
  { timestamps: true, versionKey: false }
);

scanEventSchema.index({ createdAt: -1 });

export const ScanEvent = mongoose.models.ScanEvent || mongoose.model('ScanEvent', scanEventSchema);
