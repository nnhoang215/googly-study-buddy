import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import geminiRouter from './routes/geminiRoutes.js';
import flashCardRouter from './routes/flashcardRoutes.js';
import tagRouter from './routes/tagRoutes.js';
import { authorizeToken } from './controllers/authController.js';
import cookieParser from 'cookie-parser';

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

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Test Endpoint
app.get('/', (req, res) => {
  res.send('Hello World Nhat Hoang Nguyen!');
});

// Open endpoints:
app.use('/auth', authRouter);

// -------------------------------------------------------------------
app.use('/api', authorizeToken);
// Protected endpoints:
app.use('/api/user', userRouter);
app.use('/api/gemini-api', geminiRouter);
app.use('/api/flashcards', flashCardRouter);
app.use('/api/tags', tagRouter);

export { app };