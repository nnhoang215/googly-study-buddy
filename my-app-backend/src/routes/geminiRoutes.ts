import { Router } from 'express';
import { generateFlashCard } from '../controllers/geminiController.js';

const geminiRouter = Router();

geminiRouter.post('/generate', generateFlashCard);

export default geminiRouter;