import { Router } from 'express';
import { createTag } from '../controllers/tagController.js';

const tagRouter = Router();

// Define the route to create a tag
tagRouter.post('/save', createTag);

export default tagRouter;