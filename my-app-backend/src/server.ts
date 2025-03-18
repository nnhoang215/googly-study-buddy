import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import geminiRouter from './routes/geminiRoutes.js';
import flashCardRouter from './routes/flashcardRoutes.js';
import tagRouter from './routes/tagRoutes.js';

const app = express();

// eslint-disable-next-line max-len
// const apiContent = '[{"question": "What is the main ingredient in the cookies?", "answer": "Chocolate chips"}, {"question": "What is the color of the cookies?", "answer": "Light brown"}, {"question": "What is the texture of the cookies?", "answer": "Soft and chewy"}, {"question": "Describe the shape of the cookies.", "answer": "Round and slightly thick"}, {"question": "On what surface are the cookies placed?", "answer": "A wire cooling rack"}]'

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World Nhat Hoang Nguyen!');
});

const mongoURI = config.mongoURI ?? '';
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to DB');
  } catch (error) {
    console.log('Failed to connect to DB', error);
  }
};

connectToDatabase();

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/gemini-api', geminiRouter);
app.use('/flashcards', flashCardRouter);
app.use('/tags', tagRouter);

export { app };