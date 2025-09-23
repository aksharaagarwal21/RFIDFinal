import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['rfid', 'nfc'], default: 'rfid' },
    active: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

export const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
