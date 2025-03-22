import { Router } from 'express';
import { getUserById, getUserByUsername } from '../controllers/userController.js';

const userRouter = Router();

// TODO: remove in the future
userRouter.get('/username/:username', getUserByUsername);
userRouter.get('/id/:id', getUserById);

export default userRouter;