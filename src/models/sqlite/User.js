import bcrypt from 'bcryptjs';
import db from '../../config/sqlite.js';

export class User {
  static async create({ name, email, passwordHash, role }) {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, passwordHash, role)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(name, email, passwordHash, role);
    return { _id: result.lastInsertRowid, name, email, role };
  }

  static async findOne({ email, role }) {
    const stmt = db.prepare(`
      SELECT * FROM users WHERE email = ? AND role = ?
    `);
    
    const user = stmt.get(email, role);
    if (!user) return null;
    
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      comparePassword: async function(password) {
        return bcrypt.compare(password, this.passwordHash);
      }
    };
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
