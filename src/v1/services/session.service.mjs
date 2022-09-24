import { UserService } from './index.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class SessionService {
  constructor() {
    this.userService = new UserService();
  }

  async signIn(signInData) {
    const { email, password } = signInData;
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error('Wrong email or password!');
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      return { token: jwt.sign(user.dataValues, process.env.AUTH_KEY, {
        expiresIn: 86400
      })};
    } else {
      throw new Error('Wrong email or password!');
    }
  }
}