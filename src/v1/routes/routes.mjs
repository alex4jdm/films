import Router from 'express';
import userRoutes from './user.router.mjs'

const routerV1 = Router();

routerV1.use('/users', userRoutes);

export default routerV1;