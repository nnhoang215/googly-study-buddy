import FlashCard, { type IFlashCard } from '../models/flashcards.js';
import { isValidObjectId, type ObjectId } from 'mongoose';
import type { Request, Response } from 'express';

// TODO: implement this method


const getFlashCardsByTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = req.body as ObjectId[];
    if (!Array.isArray(tags) || !tags.every(tag => isValidObjectId(tag))) {
      res.status(400).send('Invalid tag Ids');
    }
    if (req.user) {
      const owner_id = req.user.id;
      const _flashCards = await FlashCard.find({tags: { $in: tags}});
      res.status(201).send(_flashCards);
    } else {
      res.status(401).send('Missing token');
    }
    
  } catch (e) {
    console.log(e);
  }
};

// Need to pass into request a list of flashcards
const createFlashCards = async (req: Request, res: Response): Promise<void> => {
  try {
    let count = 0;
    for ( const card of req.body) {
      const { question , answer, tags } = card as IFlashCard;
      const flashCard = new FlashCard({ question, answer, tags});
      const result = await flashCard.save();
      count++;
      console.log(result.question, result.answer, result.tags);
    }

    res.status(201).send(`${count} flashcard(s) created successfully`);
  } catch(error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

const updateFlashCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400).send('Invalid flashcard Id');
      return;
    }
    const body = req.body as IFlashCard;
    const updatedFlashCard = await FlashCard.findByIdAndUpdate(id, body, { new: true });
    if (!updatedFlashCard) {
      res.status(404).send('Flashcard not found');
      return;
    }

    res.status(200).send(updatedFlashCard);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

const deleteFlashCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400).send('Invalid flashcard Id');
      return;
    }

    const deletedFlashCard = await FlashCard.findByIdAndDelete(id);
    if (!deletedFlashCard) {
      res.status(404).send('Flashcard not found');
      return;
    }

    res.status(200).send('Flashcard deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

export { getFlashCardsByTag, createFlashCards, updateFlashCard, deleteFlashCard };
