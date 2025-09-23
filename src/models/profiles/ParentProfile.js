import mongoose from 'mongoose';

const parentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    childStudentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contactNumber: { type: String },
    address: { type: String }
  },
  { timestamps: true, versionKey: false }
);

export const ParentProfile = mongoose.models.ParentProfile || mongoose.model('ParentProfile', parentProfileSchema);
