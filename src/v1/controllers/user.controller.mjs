export class UserController {
  constructor() {  }

  createUser(req, res) {
    console.log(req.body);
    res.status(200).send();
  }
}