import { Router } from 'express';
import { createUser } from '../models/users.js';

const userRouter = Router();

// Define the route to create a user
userRouter.post('/register', createUser);

export default userRouter;