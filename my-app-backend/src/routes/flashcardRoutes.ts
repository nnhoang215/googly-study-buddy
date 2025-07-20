import { Router } from 'express';
import { saveFlashCards, getFlashCardsByTag, generateFlashCards } from '../controllers/flashCardController.js';

const flashCardRouter = Router();

// Define the route to create multiple flashcards
flashCardRouter.post('/save', saveFlashCards);
flashCardRouter.post('/generate', generateFlashCards);
flashCardRouter.post('/get', getFlashCardsByTag);

export default flashCardRouter;