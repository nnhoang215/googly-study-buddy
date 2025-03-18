import User, { type IUser } from '../models/users.js';
import type { Request, Response } from 'express';


const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, hashedPassword} = req.body as IUser;
    
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      res.status(409).send('Username already exists');
      return;
    }

    const user = new User({ username, hashedPassword});
    const result = await user.save();

    console.log(result.username, result.hashedPassword);
    res.status(201).send('User created successfully');
  } catch(error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

const getUserByUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const _user = await User.findOne({ username: req.params.username });

    
    if (_user) {
      console.log('Response: ', _user ? _user.id : 'User null');
      res.status(200).send(_user);
    } else {
      console.log(`No user found with username: ${req.params.username}`);
    }
  } catch (error) {
    console.log(error);
  }
};


const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _user = await User.findOne({ _id: req.params.id });
    
    if (_user) {
      console.log('Response: ', _user ? _user.id : 'User null');
      res.status(200).send(_user);
    } else {
      console.log(`No user found with id: ${req.params.id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, hashedPassword } = req.body as IUser;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, hashedPassword },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      console.log('Updated User: ', updatedUser);
      res.status(200).send(updatedUser);
    } else {
      console.log(`No user found with id: ${id}`);
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

export { createUser, getUserByUsername, getUserById, updateUser };
