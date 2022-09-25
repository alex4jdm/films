import Router from 'express';
import dotenv from 'dotenv';
import { expressjwt } from 'express-jwt';
import { MovieController } from '../controllers/index.mjs';

dotenv.config();
const movieController = new MovieController();
const router = Router();
const secret = process.env.AUTH_KEY;
const algorithms = ['HS256'];
const jwtOpt = { secret, algorithms };

router.post('/', expressjwt(jwtOpt), movieController.createMovie.bind(movieController));
router.delete('/:id', expressjwt(jwtOpt), movieController.deleteMovie.bind(movieController));
router.patch('/:id', expressjwt(jwtOpt), movieController.updateMovie.bind(movieController));
router.get('/:id', expressjwt(jwtOpt), movieController.getSingle.bind(movieController));
router.get('/', expressjwt(jwtOpt), movieController.getMany.bind(movieController));
router.post('/import', expressjwt(jwtOpt), movieController.importMovies.bind(movieController));

export default router;