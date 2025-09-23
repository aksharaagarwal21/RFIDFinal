import mongoose from 'mongoose';

const locationLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, enum: ['ble', 'uwb', 'gps', 'wifi', 'manual'], default: 'ble' },
    latitude: { type: Number },
    longitude: { type: Number },
    area: { type: String },
    accuracyMeters: { type: Number }
  },
  { timestamps: true, versionKey: false }
);

locationLogSchema.index({ userId: 1, createdAt: -1 });

export const LocationLog = mongoose.models.LocationLog || mongoose.model('LocationLog', locationLogSchema);
