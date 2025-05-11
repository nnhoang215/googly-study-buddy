import { Router } from 'express';
import { createFlashCards } from '../controllers/flashCardController.js';
import { getFlashCardsByTag } from '../controllers/flashCardController.js';

const flashCardRouter = Router();

// Define the route to create multiple flashcards
flashCardRouter.post('/save', createFlashCards);
flashCardRouter.post('/get', getFlashCardsByTag);

export default flashCardRouter;