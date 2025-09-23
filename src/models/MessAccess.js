import mongoose from 'mongoose';

const messAccessSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    allowed: { type: Boolean, default: true },
    lastScanAt: { type: Date },
    plan: { type: String, enum: ['standard', 'veg', 'nonveg', 'special'], default: 'standard' }
  },
  { timestamps: true, versionKey: false }
);

const walletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balance: { type: Number, default: 0 }
  },
  { timestamps: true, versionKey: false }
);

export const MessAccess = mongoose.models.MessAccess || mongoose.model('MessAccess', messAccessSchema);
export const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);
