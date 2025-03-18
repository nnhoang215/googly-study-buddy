import mongoose, { type ObjectId } from 'mongoose';

interface IFlashCard {
  question: string,
  answer: string,
  tags: [ObjectId],
}

const flashCardSchema = new mongoose.Schema<IFlashCard>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tags: { type: [mongoose.Types.ObjectId], required: true },
});

const FlashCard = mongoose.model('FlashCard', flashCardSchema);

export default FlashCard;
export type { IFlashCard };