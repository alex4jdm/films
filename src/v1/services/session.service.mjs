import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class SessionService {
  constructor() { }

  generateToken(data) {
    return { 
      token: jwt.sign(data, process.env.AUTH_KEY, {
      expiresIn: process.env.EXP_DATE
    }),
      status: 1
    };
  }

  async signIn(signInData) {
    const { email, password } = signInData;
    const user = await db.User.scope('withPassword').findOne({
      where: {
        email
      }
    });

    if (!user) throw new Error('Wrong email or password!');
    
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      return this.generateToken(user.dataValues);
    } else {
      throw new Error('Wrong email or password!');
    }
  }
}