import { Router } from 'express';
import { createUser, getUserById, getUserByUsername } from '../controllers/userController.js';

const userRouter = Router();

// Define the route to create a user
userRouter.post('/register', createUser);
userRouter.get('/username/:username', getUserByUsername);
userRouter.get('/id/:id', getUserById);

export default userRouter;