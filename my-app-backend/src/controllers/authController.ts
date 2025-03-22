import type { NextFunction, Request, Response } from 'express';
import type { LoginRequestBody } from '../interfaces/auth.js';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { username, hashedPassword } = req.body as LoginRequestBody;
    console.log('req.body:' + username);

    const user = await User.findOne({username: username});
    
    console.log(user);
    // Check if there's an User returned
    if (!user) {
      res.status(401).send('Invalid username or password');
      return;
    }

    const isPasswordValid = bcrypt.compareSync(hashedPassword, user.hashedPassword);

    if (!isPasswordValid) {
      res.status(401).send('Invalid username or password');
    } else {
      const payload = {
        username: user.username,
      };
      const token = jwt.sign(payload, config.hmacKey, {expiresIn: 60});

      res.json({token});
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
};

// TODO: logout
const logout = (req: Request, res: Response) : void => {
  // TODO: invalidate token

  res.json({
    status: 'success',
    message: 'Logged out',
  });

  console.log('User logged out');
};

// TODO: Authorization ie verify if token is valid
const authorizeToken = (req: Request, res: Response, next: NextFunction) : void => {
  // Extracting bearer token
  const authHeader = req.headers.authorization;

  // Checking if there is actually a bearer token provided
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, config.hmacKey);
      req.user = decodedToken; // Attach the decoded user info to the request object
      next();
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        res.status(401).send('Invalid token');
      } else if (e instanceof jwt.TokenExpiredError) {
        res.status(401).send('Token has expired');
      } else {
        res.status(500).send('Internal server error');
      }
    }
  } else {
    res.status(401).send('No token provided');
  }
};
export { login, logout, authorizeToken };