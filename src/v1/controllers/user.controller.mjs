import { UserService } from '../services/index.mjs';

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  createUser(req, res) {
    this.userService.createUser(req.body)
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message));
  }
}