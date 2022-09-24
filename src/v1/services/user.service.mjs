import db from '../models/index.js';
import bcrypt from 'bcrypt';
import { SessionService } from './index.mjs';

export class UserService {
  constructor() {
    this.userModel = db.User;
    this.sessionService = new SessionService();
  }

  async createUser(userData) {
    const { email, name, password, confirmPassword } = userData;
    if (password !== confirmPassword) throw new Error('Wrong confirmation password!');
    const hash = await bcrypt.hash(password, 10);
    await this.userModel.create({ email, name, password: hash });
    return this.sessionService.signIn(email, password);
  }

  static async findByEmail(email) {
    return db.User.scope('withPassword').findOne({
      where: {
        email
      }
    });
  }
}