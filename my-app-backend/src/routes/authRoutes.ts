import { Router } from 'express';
import { login, logout } from '../controllers/authController.js';
import { createUser } from '../controllers/userController.js';
const authRouter = Router();

authRouter.post('/register_new', createUser);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

export default authRouter;
