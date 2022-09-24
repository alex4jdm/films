import Router from 'express';
import { SessionController } from '../controllers/index.mjs';

const sessionController = new SessionController();
const router = Router();

router.post('/', sessionController.signIn.bind(sessionController));

export default router;