import Router from 'express';
import { UserController } from '../controllers/index.mjs';

const userController = new UserController();
const router = Router();

router.post('/', userController.createUser.bind(userController));

export default router;