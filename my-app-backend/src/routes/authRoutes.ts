import { Router } from 'express';
import { login, logout, verifyToken } from '../controllers/authController.js';
import { createUser } from '../controllers/userController.js';
const authRouter = Router();

authRouter.post('/register_new', createUser);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/verify_token', verifyToken);

export default authRouter;