import Router from 'express';
import userRoutes from './user.router.mjs';
import sessionRoutes from './session.router.mjs';
import movieRoutes from './movie.router.mjs';

const routerV1 = Router();

routerV1.use('/users', userRoutes);
routerV1.use('/sessions', sessionRoutes);
routerV1.use('/movies', movieRoutes);

export default routerV1;