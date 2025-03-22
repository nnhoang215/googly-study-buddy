import mongoose from 'mongoose';
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

// Think of how to implement current user and other states

export default User;
export type { IUser };