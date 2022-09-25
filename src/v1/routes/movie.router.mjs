import Router from 'express';
import { MovieController } from '../controllers/index.mjs';

const movieController = new MovieController();
const router = Router();

router.post('/', movieController.createMovie.bind(movieController));
router.delete('/:id', movieController.deleteMovie.bind(movieController));
router.patch('/:id', movieController.updateMovie.bind(movieController));
router.get('/:id', movieController.getSingle.bind(movieController));
router.get('/', movieController.getMany.bind(movieController));
router.post('/import', movieController.importMovies.bind(movieController));

export default router;