import mongoose from 'mongoose';
import type { Request, Response } from 'express';

// WHY?
interface IUser extends mongoose.Document {
  username: string;
  hashedPassword: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: String,
  hashedPassword: String,
});

const User = mongoose.model<IUser>('User', userSchema);

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

export default User;
export { createUser };