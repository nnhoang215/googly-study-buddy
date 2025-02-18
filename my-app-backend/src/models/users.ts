import mongoose from 'mongoose';
import type { Request, Response } from 'express';

interface IUser extends mongoose.Document {
  username: string;
  hashedPassword: string;
  salt: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: String,
  hashedPassword: String,
  salt: String,
});

const User = mongoose.model<IUser>('User', userSchema);

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, hashedPassword, salt } = req.body as IUser;

    const user = new User({ username, hashedPassword, salt});
    const result = await user.save();

    console.log(result.username, result.hashedPassword, result.salt);
    res.status(201).send('User created successfully');
  } catch(error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

export default User;
export { createUser };