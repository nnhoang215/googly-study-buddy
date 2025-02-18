import type { Request, Response } from 'express';
import type { LoginRequestBody } from '../interfaces/auth.js';
import User from '../models/users.js';

const login = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { username, hashedPassword } = req.body as LoginRequestBody;

    const user = await User.findOne({username: username});
    
    console.log(user);
    // Check if there's a User returned
    if (!user) {
      res.status(401).send('Invalid username or password');
      return;
    }

    // TODO: use Bcrypt
    const isPasswordValid = hashedPassword == user.hashedPassword;

    if (!isPasswordValid) {
      res.status(401).send('Invalid username or password');
    } else {
      // TODO: use jwt
      const token = `username: ${user.username}`;
      res.json({token});
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
};

// TODO: logout
const logout = (req: Request, res: Response) : void => {
  // TODO: clear token

  res.json({
    status: 'success',
    message: 'Logged out',
  });

  console.log('User logged out');
};
export { login, logout };