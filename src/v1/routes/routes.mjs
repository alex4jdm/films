import Router from 'express';
import userRoutes from './user.router.mjs';
import sessionRoutes from './session.router.mjs';

const routerV1 = Router();

routerV1.use('/users', userRoutes);
routerV1.use('/sessions', sessionRoutes);

export default routerV1;