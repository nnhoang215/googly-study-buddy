import mongoose from 'mongoose';
import type { Request, Response } from 'express';

interface IFlashCard {
  question: string,
  answer: string,
  tags: [number],
}

const flashCardSchema = new mongoose.Schema<IFlashCard>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tags: { type: [String], required: true },
});

const FlashCard = mongoose.model('FlashCard', flashCardSchema);

const createFlashCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { question , answer, tags } = req.body as IFlashCard;
    const flashCard = new FlashCard({ question, answer, tags});
    const result = await flashCard.save();

    console.log(result.question, result.answer, result.tags);
    res.status(201).send('FlashCard created successfully');
  } catch(error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

export default FlashCard;
export { createFlashCard };
