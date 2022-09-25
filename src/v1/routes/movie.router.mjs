import Router from 'express';
import { MovieController } from '../controllers/index.mjs';

const movieController = new MovieController();
const router = Router();

router.post('/', movieController.createMovie.bind(movieController));

export default router;