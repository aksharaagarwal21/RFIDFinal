import db from '../../config/sqlite.js';

export class WardenProfile {
  static async create({ userId, ...profile }) {
    const stmt = db.prepare(`
      INSERT INTO warden_profiles (
        userId, hostel, floorIncharge, contactNumber
      ) VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userId,
      profile.hostel,
      profile.floorIncharge || null,
      profile.contactNumber || null
    );
    
    return { _id: result.lastInsertRowid, userId, ...profile };
  }
}
