import mongoose from 'mongoose';
import type { ObjectId } from 'mongoose';

interface ITag {
  tagName: string,
  ownerId: ObjectId,
  parentId: number,
}

const tagSchema = new mongoose.Schema<ITag>({
  tagName: { type: String, required: true},
  // TODO: figure out why this works but not just ObjectId
  ownerId: { type: mongoose.Types.ObjectId, required: true},
  parentId: mongoose.Types.ObjectId,
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag; 
export type { ITag };