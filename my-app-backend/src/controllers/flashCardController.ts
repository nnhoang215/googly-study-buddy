/* eslint-disable n/no-extraneous-import */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import FlashCard, { type IFlashCard } from '../models/flashcards.js';
import { isValidObjectId, type ObjectId } from 'mongoose';
import type { Request, Response } from 'express';
import Tag from '@src/models/tags.js';


// TODO: implement this method
const getFlashCardsByTag = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Verify that these are tags owned by the user in token
    const tags = req.body.tags as ObjectId[];
    if (!Array.isArray(tags) || !tags.every(tag => isValidObjectId(tag))) {
      res.status(400).send('Invalid tag Ids');
    }
    if (req.current_user && tags != undefined) {
      const userId = req.current_user.id;
      const userTags = await Tag.find({
        _id: { $in: tags},
        ownerId: userId,
      });
      const userTagIds = userTags.map(tag => tag._id);
      const _flashCards = await FlashCard.find({
        tags: { $in: userTagIds },
      });
      res.status(201).send(_flashCards);
    } else {
      console.log('Cannot perform bro!');
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
