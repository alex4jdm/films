import { SessionService } from '../services/index.mjs';

export class SessionController {
  constructor() {
    this.sessionService = new SessionService();
  }

  signIn(req, res) {
    this.sessionService.signIn(req.body)
      .then(token => res.send(token))
      .catch(err => res.status(400).send(err.message));
  }
}